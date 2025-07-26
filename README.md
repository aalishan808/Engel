# 🛍️ Product Management Dashboard

A full-featured **Product Management Dashboard** built using **Next.js 15**, **TypeScript**, **Firebase (Firestore + Storage)**, **PrimeReact**, **Zod**, and **React Hook Form**. It supports full CRUD operations with image uploads, filters, search, pagination, and a responsive UI with top navbar and sidebar.

---

## 📌 Features

- ✅ Add, Edit, Delete Products
- 🔍 Search and Filter Products
- 🔄 Real-time Firestore updates
- 🖼️ Upload product images (Firebase Storage)
- 🎨 Responsive UI with PrimeReact components
- ✅ Form validation using Zod + React Hook Form
- 📦 Optimized project structure and clean code
- 🔐 Firebase Auth (optional extension)

---

## 🚀 Tech Stack

| Tech              | Purpose                          |
|-------------------|----------------------------------|
| Next.js 15        | App Framework (App Router)       |
| TypeScript        | Type Safety                      |
| Firebase          | Firestore (DB) + Storage (Images)|
| PrimeReact        | UI Components                    |
| React Hook Form   | Form Management                  |
| Zod               | Schema Validation                |
| Tailwind CSS      | Styling (optional alongside PrimeReact) |

---

## 📁 Project Structure

src/
├── app/ # Next.js App Router pages
├── components/ # Reusable components (e.g. Navbar, Sidebar, Modals)
├── firebase/ # Firebase config and helpers
├── hooks/ # Custom hooks
├── lib/ # Schema + helper logic (e.g. productSchema)
├── types/ # Global types
├── utils/ # Utility functions
└── styles/ # Global styles

yaml
Copy
Edit

---

## 🛠️ How to Setup Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
Install Dependencies

bash
Copy
Edit
npm install
Setup Firebase

Create a Firebase project at https://console.firebase.google.com

Enable Firestore Database

Enable Firebase Storage

(Optional) Enable Authentication

Get your Firebase config from Project Settings → General → Web SDK

Create .env.local File

env
Copy
Edit
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
Run the Development Server

bash
Copy
Edit
npm run dev
Open in Browser

arduino
Copy
Edit
http://localhost:3000
🧠 Approach & Development Steps
1. Project Setup
Initialized a Next.js 15 project with TypeScript.

Installed and configured Firebase SDK for Firestore and Storage.

2. Firebase Integration
Configured firebase.ts with initializeApp, Firestore, and Storage.

Used Firestore for storing product documents.

Used Storage for uploading and retrieving product images.

3. Product Schema & Forms
Created productSchema.ts using zod to enforce validation rules.

Integrated schema with react-hook-form for form handling in Add/Edit product modal.

4. CRUD Operations
Add/Edit/Delete functions created using Firestore SDK (addDoc, updateDoc, deleteDoc).

Used real-time updates via onSnapshot.

5. Image Upload
Integrated Firebase Storage using uploadBytesResumable.

Stored public image URLs in Firestore along with other product fields.

6. UI Development
Built with PrimeReact DataTable for product listing (with pagination, filtering, sorting).

Added a responsive Sidebar and Top Navbar layout.

Created reusable Modal components for forms.

7. Optimization & Finalization
Cleaned up code structure, added reusable hooks and helper functions.

Made the UI responsive and visually clean.

