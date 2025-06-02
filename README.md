
# 🐝 BeeTrail Field Logger

BeeTrail is a backend system for managing beehives and crop data in agricultural fields. It supports role-based access control (Beekeeper/Admin), geo-filtered crop search, CSV exports, JWT-based authentication, offline support via sync token, and a simple admin dashboard. Swagger UI is included for easy API testing and documentation.

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Token)
- **Documentation**: Swagger UI
- **Frontend (Admin Dashboard)**: Plain HTML/CSS + JS
- **Data Export**: CSV via `json2csv`

---

## 🌐 API Endpoints

| Feature            | Endpoint                          | Method | Auth Required | Description                            |
|-------------------|-----------------------------------|--------|----------------|----------------------------------------|
| Register           | `/api/auth/register`             | POST   | ❌             | Register new user                      |
| Login              | `/api/auth/login`                | POST   | ❌             | Get token using email & password       |
| Add Hive           | `/api/hives`                     | POST   | ✅             | Add a new hive                         |
| Get All Hives      | `/api/hives`                     | GET    | ✅             | Fetch all hives                        |
| Export Hives CSV   | `/api/hives/export`              | GET    | ✅             | Download hive data as CSV              |
| Add Crop           | `/api/crops`                     | POST   | ✅             | Add a new crop                         |
| Get Nearby Crops   | `/api/crops/nearby`              | GET    | ✅             | Fetch crops based on geolocation       |
| Get Sync Token     | `/api/sync-token`                | GET    | ✅             | Used for offline data syncing          |
| Admin Dashboard    | `/admin`                         | GET    | ❌             | Basic frontend dashboard with stats    |
| Swagger Docs       | `/api-docs`                      | GET    | ❌             | API docs with Swagger UI               |

---

## 🔐 Authentication

All protected routes require a **Bearer Token**.

### Sample Login Request:

**Endpoint**: `POST /api/auth/login`  
**Body:**

** Local Development Setup**
1. Clone this repository  https://github.com/Anubhav429/HumbleBee-_Assignment/tree/main



2. Install dependencies
npm install

3. Create .env file
Create a .env file in the root with the following content:
env
Copy code

PORT=4000
MONGO_URI=mongodb://localhost:27017/CreditBee
JWT_SECRET=CreditBeee

4. Run the server
npm run dev
http://localhost:4000


