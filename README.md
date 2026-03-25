# 🗳 Online Voting System (React + Spring Boot + MySQL)

## 📌 Project Overview

The **Online Voting System** is a full-stack web application that allows users to securely cast their votes online.
It provides an **admin dashboard** to manage elections and candidates, while ensuring **one vote per user**, transparency, and real-time results.

---

## 🚀 Features

### 👤 User Features

* User Registration & Login
* View Candidates
* Cast Vote (Only once)
* View Live Results

### 🛠 Admin Features

* Create & Manage Elections
* Add Candidates
* View Total Voters & Results
* Dashboard with statistics

---

## 🧠 Tech Stack

| Layer    | Technology                     |
| -------- | ------------------------------ |
| Frontend | React.js                       |
| Backend  | Spring Boot (Java)             |
| Database | MySQL                          |
| API      | REST APIs                      |
| Tools    | VS Code, IntelliJ, Git, GitHub |

---

## 📂 Project Structure

```
online-voting-system
│
├── backend
│   ├── controller
│   ├── model
│   ├── repository
│   └── resources
│
└── frontend
    ├── components
    ├── pages
    └── src
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/lokhesh2003/online-voting-system.git
cd online-voting-system
```

---

### 2️⃣ Backend Setup (Spring Boot)

```
cd backend
mvn spring-boot:run
```

Runs on:

```
http://localhost:8080
```

---

### 3️⃣ Frontend Setup (React)

```
cd frontend
npm install
npm start
```

Runs on:

```
http://localhost:3000
```

---

### 4️⃣ Database Setup (MySQL)

Create database:

```
CREATE DATABASE voting_system;
```

Update in `application.properties`:

```
spring.datasource.username=root
spring.datasource.password=your_password
```

---

## 🔐 Key Functionalities

* ✔ One Vote Per User (Prevents duplicate voting)
* ✔ Secure Login System
* ✔ Real-time Vote Counting
* ✔ Admin Control Panel

---

## 📸 Screenshots

> Add your project screenshots here (Dashboard, Voting Page, Results, etc.)

---

## 🎯 Future Enhancements

* JWT Authentication
* Password Encryption (BCrypt)
* Email Verification
* Live Charts (Chart.js)
* Deployment (AWS / Netlify / Render)

---

## 🙌 Author

**Lokesh Reddy**
GitHub: https://github.com/lokhesh2003

---

## ⭐ Conclusion

This project demonstrates a **secure, scalable, and real-world voting system** using modern web technologies.
It highlights important concepts like **authentication, database management, REST APIs, and UI design**.

---

💡 *If you like this project, give it a ⭐ on GitHub!*
