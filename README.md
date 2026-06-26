# 🏦 Customer Credit Lending API

![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-Framework-black?logo=express\&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue?logo=mysql\&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-ORM-52B0E7?logo=sequelize\&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-API%20Testing-orange?logo=postman\&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**Customer Credit Lending API** is a RESTful backend application developed using **Node.js**, **Express.js**, **MySQL**, and **Sequelize ORM**. The application enables customer registration, credit score management, credit gap tracking, loan offer generation, offer unlocking based on CIBIL score, and EMI calculation through secure REST APIs.

---

# ✨ Features

* 👤 Customer Registration
* 📱 Mobile & PAN Validation
* 📈 Update Customer CIBIL Score
* 📊 Credit Profile Generation
* 🔍 Credit Gap Management
* ✅ Resolve Credit Gaps
* 💰 Loan Offer Management
* 🔓 Offer Unlocking Based on Credit Score
* 🧮 EMI Calculation
* ⚡ RESTful API Architecture
* 🗄️ MySQL Database Integration
* 🧪 API Testing using Postman

---

# 🛠️ Tech Stack

* **Backend:** Node.js
* **Framework:** Express.js
* **Database:** MySQL
* **ORM:** Sequelize
* **API Testing:** Postman
* **Environment Variables:** dotenv

---

# 📁 Folder Structure

```text
softlend-backend/
│
├── config/
├── controllers/
├── middleware/
├── migrations/
├── models/
├── routes/
├── utils/
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

# ⚙️ Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/Subas-Upadhyaya/customer-credit-lending-api.git
```

## 2. Navigate to Project

```bash
cd customer-credit-lending-api/softlend-backend
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create a `.env` file inside the project root.

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=softlend
DB_USER=root
DB_PASSWORD=your_password
```

## 5. Start Development Server

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:3000
```

---

# 🗄️ Database

Database Name

```sql
softlend
```

---

# 🚀 API Endpoints

## Customer APIs

```http
POST   /customers
POST   /customers/:id/credit-score
GET    /customers/:id/credit-profile
```

## Credit Gap APIs

```http
POST   /customers/:id/credit-gaps
PATCH  /credit-gaps/:id/resolve
```

## Offer APIs

```http
POST   /customers/:id/offers
GET    /customers/:id/offers
GET    /offers/:id/emi
```

---

# 📬 Sample API Requests

## Create Customer

```json
{
  "name": "Ravi Kumar",
  "mobile": "9876543210",
  "pan": "ABCDE1234F"
}
```

## Update Credit Score

```json
{
  "cibil_score": 680
}
```

## Add Credit Gap

```json
{
  "factor": "NO_CREDIT_HISTORY",
  "current_value": "0",
  "ideal_value": "1+ credit accounts",
  "impact": "HIGH",
  "estimated_score_gain": 50,
  "action_description": "Open a credit card or small loan and repay on time"
}
```

---

# 📸 API Testing

The following APIs were successfully tested using **Postman**.

* ✅ Create Customer
* ✅ Update Credit Score
* ✅ Get Credit Profile
* ✅ Add Credit Gap
* ✅ Resolve Credit Gap
* ✅ Create Loan Offer
* ✅ Get Customer Offers
* ✅ Calculate EMI

> *(You can later add screenshots inside a `ScreenShot/` folder if required.)*

---

# ✔️ Validations

* Mobile Number Validation (10 digits)
* PAN Number Validation
* Duplicate Mobile Number Check
* Customer Existence Validation
* Credit Gap Validation
* Credit Score Based Offer Unlocking

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Subas Upadhyaya**

GitHub: https://github.com/Subas-Upadhyaya
