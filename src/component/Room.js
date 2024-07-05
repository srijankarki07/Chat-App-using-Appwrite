"use client";
import React, { useState, useEffect } from "react";
import client, {
  COLLECTION_ID_MESSAGES,
  DATABASE_ID,
  databases,
} from "@/appWriteConfig";
import { ID, Query, Permission, Role } from "appwrite";
import { CiTrash } from "react-icons/ci";
import Header from "./Header";
import { useAuth } from "@/utils/AuthContext";

export default function Room() {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getMessages();

      const unsubscribe = client.subscribe(
        `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
        (response) => {
          console.log(response, "REALTIME");

          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.create"
            )
          ) {
            console.log("Message created");
            setMessages((prevState) => [response.payload, ...prevState]);
          }

          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.delete"
            )
          ) {
            console.log("Message Deleted");
            alert("Message Deleted");
            setMessages((prevState) =>
              prevState.filter(
                (message) => message.$id !== response.payload.$id
              )
            );
          }

          {
            getMessages();
          }
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User is not authenticated");
      alert("User is not authenticated");

      return;
    }

    const permissions = [Permission.write(Role.user(user.$id))];

    const payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    };

    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
      permissions
    );

    console.log(response, "RESPONSE");
    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc("$createdAt"), Query.limit(100)]
    );
    console.log(response.documents);
    setMessages(response.documents);
  };

  const deleteMessage = async (id) => {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, id);
  };

  return (
    <main className="container">
      <Header />
      <div className="room--container">
        <form id="message--form" onSubmit={handleSubmit}>
          <div>
            <textarea
              required
              maxLength="250"
              placeholder="Say something..."
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
            ></textarea>
          </div>

          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="send" />
          </div>
        </form>

        <div>
          {messages.map((message) => (
            <div key={message.$id} className={"message--wrapper"}>
              <div className="message--header">
                <p>
                  {message?.username ? (
                    <span> {message?.username}</span>
                  ) : (
                    "Anonymous user"
                  )}

                  <small className="message-timestamp">
                    {new Date(message.$createdAt).toLocaleString()}
                  </small>
                </p>

                {message.$permissions.includes(
                  `delete(\"user:${user?.$id}\")`
                ) && (
                  <CiTrash
                    className="delete--btn"
                    onClick={() => {
                      deleteMessage(message.$id);
                    }}
                  />
                )}
              </div>

              <div
                className={
                  "message--body" +
                  (message.user_id === user?.$id ? " message--body--owner" : "")
                }
              >
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
