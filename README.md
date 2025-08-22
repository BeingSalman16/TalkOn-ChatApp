# 💬 TalkOn ChatApp - Full Stack Realtime Chat App

A production-ready full-stack TalkOn ChatApp built with **React js** and **Node.js (Express + MongoDB)**. It includes powerful real-time features using **Socket.IO**, secure **authentication via mobile (Twilio)** and **email OTP (Nodemailer)**, plus rich chat functionalities like media sharing, reactions, themes, and more.

---


## 📁 Project Structure
TalkOn ChatApp/
├── frontend/ # Frontend code - React js
├── backend/ # Backend code - Express + MongoDB
├── .gitignore # Git ignore file
└── README.md # This file

---


---

## 🚀 Key Features

### 🔐 Authentication
- 🔢 Login with **mobile OTP** using **Twilio**
- 📧 Login with **email OTP** using **Nodemailer**
- 🔒 JWT-based secure authentication

### 💬 Chat System
- 🟢 **Online status** indicator
- ✍️ **Typing status**
- ⏱ **Last seen** support
- 🕓 **Last message preview**
- 💬 **Real-time messaging** with Socket.IO
- 📷 **Send images** (via **Cloudinary**)
- 📋 **Copy, delete, react, and reply to messages**
- ❤️ React to messages with emojis
- 🧹 Delete for self or for everyone

### 🧑‍🎨 User Experience
- ⚙️ **Settings page** with profile management
- 👤 **Profile** editing (image, username, status)
- 🎨 **Dark/light theme toggle**
- 📱 Fully **mobile responsive** design
- 🔊 Notification & sound support (optional)

---

## 🧪 Tech Stack

| Layer     | Technology                             |
|-----------|----------------------------------------|
| Frontend  | React, Next.js, Tailwind CSS           |
| Backend   | Node.js, Express, MongoDB              |
| Realtime  | Socket.IO                              |
| Auth      | Twilio (mobile OTP), Nodemailer (email OTP), JWT |
| Media     | Cloudinary (image upload)              |
| UI State  | Zustand / Redux / Context API (your choice) |
| Storage   | Firebase (optional), MongoDB GridFS (if used) |

---

## ⚙️ Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Twilio account (for phone verification)
- Email SMTP credentials (e.g., Gmail)
- Cloudinary account (for image hosting)

---

## 🔧 Setup Guide

### 1. build the Project

```bash
git clone url
cd TalkOn ChatApp


cd backend
npm install


PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Twilio
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_twilio_number

# Nodemailer
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_email_password_or_app_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


# run server 
npm run dev


3. Frontend Setup

cd ../frontend
npm install

Create a .env file inside frontend/:

REACT_APP_API_URL=http://localhost:8000

npm start
