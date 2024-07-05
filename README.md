# Real-Time Chat App

This project is a real-time group chat application built using Next.js and Appwrite. Users can register, log in, and participate in group chats in real-time.

## Features

- User Registration and Login
- Real-time group chat
- User-friendly interface
- Secure authentication and database management using Appwrite

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Appwrite](https://appwrite.io/)



## Getting Started

### Prerequisites

- Node.js
- PNPM
-  Appwrite Cloud

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/srijankarki07/Chat-App-using-Appwrite.git
    cd real-time-chat-app
    ```

2. **Install dependencies:**
    ```bash
    pnpm install
    ```

3. **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add your Appwrite credentials:
    ```env
    NEXT_PUBLIC_APPWRITE_ENDPOINT=https://[YOUR APPWRITE ENDPOINT]
    NEXT_PUBLIC_APPWRITE_PROJECT=[YOUR PROJECT ID]
    NEXT_PUBLIC_APPWRITE_DATABASE_ID=[YOUR DATABASE ID]
    NEXT_PUBLIC_APPWRITE_COLLECTION_ID=[YOUR COLLECTION ID]
    NEXT_PUBLIC_APPWRITE_REALTIME_CHANNEL=[YOUR REALTIME CHANNEL ID]
    ```

4. **Start the development server:**
    ```bash
    pnpm run dev
     ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Register an Account:**
    - Navigate to the registration page.
    - Fill in the required details and submit.

2. **Log In:**
    - Navigate to the login page.
    - Enter your credentials and submit.

3. **Join the Chat:**
    - After logging in, navigate to the chat page.
    - Start chatting in the group chat room.
4. **Delete the message:**
    - User are able to delete their sent chat/messages.



## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch with a descriptive name (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgements

- [Appwrite](https://appwrite.io/) for providing the backend services.
- [Next.js](https://nextjs.org/) for the robust framework.

