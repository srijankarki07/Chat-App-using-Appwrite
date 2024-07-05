import { Account, Client, Databases } from "appwrite";

export const PROJECT_ID = "66614f8b000856c184d1";

export const DATABASE_ID = "6661509600256429e58d";

export const COLLECTION_ID_MESSAGES = "666150a30003bcdd1105";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);

export const account = new Account(client);

export default client;
