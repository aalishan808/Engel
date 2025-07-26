# 🛠️ Project Setup Guide

This document will guide you through setting up the **Product Management Dashboard** project on your local machine.


## ✅ Prerequisites

Make sure the following tools are installed:

- [Node.js (v18+ recommended)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

---

## ⚙️ Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/product-dashboard.git
cd product-dashboard
2. Install Dependencies
bash
Copy
Edit
npm install
This will install all required packages listed in package.json.

3. Set Up Firebase Project
Go to Firebase Console

Create a new project

Enable the following:

Firestore Database

Firebase Storage

Go to Project Settings > General > Your apps

Select Web App and register one

Copy the Firebase config values

4. Create .env File
Create a file named .env in the project root.

Use the following template:

env
Copy
Edit
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
💡 If .env.example is available, you can copy it:

bash
Copy
Edit
cp .env.example .env
5. Run the Project
Start the development server:

bash
Copy
Edit
npm run dev
Then open:

arduino
Copy
Edit
http://localhost:3000
You should now see the dashboard UI with an empty product list.

📤 Firebase Setup Tips
🔒 Firestore Rules (for testing)
plaintext
Copy
Edit
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
🖼️ Firebase Storage Rules (for testing)
plaintext
Copy
Edit
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
⚠️ For production, always restrict your rules!

📦 Build for Production
bash
Copy
Edit
npm run build
npm start
❓Troubleshooting
✅ Firebase config must be correct in .env

✅ Your Firestore and Storage must be initialized

✅ You must run npm install before npm run dev

