# Voting Application

### 📌 Project Summary – **Voting Application**

**Online Voting Application** | *Node.js, Express, MongoDB, JWT, Mongoose, Nodemailer, Twilio, Puppeteer*

- Built a **secure online voting platform** with **role-based access control** using JWT authentication.
- Designed and integrated **Mongoose schemas** for Users, Candidates, and Votes with relational references for tracking votes.
- Developed and secured **RESTful APIs** for user registration, login, candidate management, and voting operations.
- Implemented **vote validation** to prevent duplicate voting and ensure accurate **real-time vote count tracking**.
- Added **reset password module** with secure authentication flow.
- Integrated **email service (Nodemailer)** to send voters a **thank-you email** with an attached **PDF voting certificate** (generated using Puppeteer).
- Developed **SMS notification service** using **Twilio** to send welcome messages upon voter sign-in.
- Implemented **server-side pagination** for efficient data handling of candidates and votes.
- Ensured **data security** with password hashing, JWT tokens, and middleware-based route protection.

# 🗳️ Voting Application

A secure **online voting platform** built with Node.js, Express, MongoDB, and modern authentication & notification technologies.

---

## 🚀 Project Summary

This application provides a secure and efficient platform for conducting online voting. It supports **role-based access control**, real-time vote tracking, email/SMS notifications, and administrative functionalities for managing candidates and votes.

**Technologies Used:**  
- **Backend:** Node.js, Express  
- **Database:** MongoDB, Mongoose  
- **Authentication & Security:** JWT, bcrypt, middleware-based route protection  
- **Notifications:** Nodemailer (email with PDF certificate), Twilio (SMS)  
- **PDF Generation:** Puppeteer  
- **Other Features:** Server-side pagination, cron jobs for automated tasks

---

## 🌟 Features

- **User Management**:  
  - Register and login users securely using JWT  
  - Password reset with secure token flow  

- **Voting System**:  
  - Vote for candidates  
  - Duplicate vote prevention  
  - Real-time vote count  

- **Admin Features**:  
  - Add, update, delete candidates  
  - View all votes with pagination  

- **Notifications**:  
  - Welcome SMS via Twilio  
  - Voting confirmation email with PDF certificate  

- **Cron Jobs**:  
  - Automated tasks for notifications and reports  

- **Security Measures**:  
  - Password hashing with bcrypt  
  - JWT authentication  
  - Middleware-based role access control  

---


