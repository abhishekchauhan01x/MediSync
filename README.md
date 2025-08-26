# MediSync

## Local development setup

Follow these steps to run the backend, frontend, and admin locally while keeping production details commented and safe.

### 1) Environment variables

Create the following `.env` files (or add to your existing ones). Keep the production values commented.

Backend (`backend/.env`):

```
# Local defaults
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
JWT_SECRET=your_jwt_secret

# Allow extra CORS origins (comma-separated)
# CORS_EXTRA_ORIGINS=https://medi-sync-dusky.vercel.app,https://medisync-admin-mu.vercel.app

# Production (keep commented)
# PORT=8080
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net
# CLOUDINARY_NAME=prod_cloud
# CLOUDINARY_API_KEY=prod_key
# CLOUDINARY_SECRET_KEY=prod_secret
# JWT_SECRET=prod_jwt_secret
```

Frontend (`frontend/.env`):

```
# Local backend
VITE_BACKEND_URL=http://localhost:3000

# Production (keep commented)
# VITE_BACKEND_URL=https://medisync-q4dk.onrender.com
```

Admin (`admin/.env`):

```
# Local backend
VITE_BACKEND_URL=http://localhost:3000

# Production (keep commented)
# VITE_BACKEND_URL=https://medisync-q4dk.onrender.com
```

### 2) Install dependencies

Run these in three terminals or sequentially:

```
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

### 3) Start services

```
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev

# Terminal 3
cd admin && npm run dev
```

Frontend runs on `http://localhost:5173`, Admin on `http://localhost:5174` (or the port shown), Backend on `http://localhost:3000`.

### Notes

- CORS: Backend allows local origins and supports extra origins via `CORS_EXTRA_ORIGINS`.
- Production origins are present but commented in code and examples for reference.
🩺 **MediSync** – Your trusted platform for booking appointments with top doctors and managing healthcare efficiently.

---

## 🚀 Live Demo

- **User Portal:** [https://medi-sync-dusky.vercel.app/](https://medi-sync-dusky.vercel.app/)
- **Admin Portal:** [https://medisync-admin-mu.vercel.app/](https://medisync-admin-mu.vercel.app/)

---

## ✨ Features

- 👨‍⚕️ Book appointments with trusted doctors
- 👤 Manage your profile and appointments
- 🗂️ Admin dashboard for managing doctors, patients, and appointments
- 📱 Responsive design for all devices
- 🔒 Secure authentication and authorization
- ☁️ Cloud image uploads for doctor and user profiles
- 📊 Dashboard analytics for admin

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- React Router
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Token) for authentication
- Bcrypt for password hashing
- Multer & Cloudinary for image uploads

**Admin Panel:**
- React.js (Vite)
- Tailwind CSS
- Axios

**Deployment:**
- Vercel (Frontend & Admin)
- Render (Backend)

**Other:**
- RESTful API architecture
- Environment variables for sensitive config
- Modern, mobile-first UI/UX

---

## 📂 Project Structure

- `/frontend` – User-facing React app
- `/admin` – Admin dashboard React app
- `/backend` – Node.js/Express API

---

## 🛠️ Getting Started

1. Clone the repo
2. Install dependencies in each folder (`frontend`, `admin`, `backend`)
3. Start backend and frontend/admin apps as needed

---

## 📢 Useful Links

- **User Portal:** [https://medi-sync-dusky.vercel.app/](https://medi-sync-dusky.vercel.app/)
- **Admin Portal:** [https://medisync-admin-mu.vercel.app/](https://medisync-admin-mu.vercel.app/)

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo, create a feature branch, and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

Enjoy using MediSync! 🩺✨
