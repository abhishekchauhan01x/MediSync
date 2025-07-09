MediSync

A full-stack medical appointment booking platform with separate panels for users, doctors, and admins. Built with React (frontend), Node.js/Express (backend), and MongoDB.

---

## Features

- **User Panel:**  
  - Browse doctors by specialty  
  - Book and manage appointments  
  - View and edit profile

- **Doctor Panel:**  
  - Manage appointments  
  - View patient details  
  - Update profile

- **Admin Panel:**  
  - Manage doctors and patients  
  - View all appointments  
  - Dashboard analytics

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, **Axios** (for HTTP requests)
- **Backend:** Node.js, Express.js, MongoDB, **Bcrypt** (for password encryption)
- **Authentication:** JWT
- **File Uploads:** Multer, Cloudinary
- **Styling:** Tailwind CSS

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abhishekchauhan01x/medisync.git
   cd mediync
   ```

2. **Install dependencies:**

   - For backend:
     ```bash
     cd backend
     npm install
     # Installs bcrypt among other dependencies
     ```

   - For frontend:
     ```bash
     cd ../frontend
     npm install
     # Installs axios among other dependencies
     ```

   - For admin panel
     ```bash
     cd ../admin
     npm install
     ```

3. **Set up environment variables:**

   - Create a `.env` file in `backend/` with:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```

4. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

5. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

   - For admin panel (if separate):
     ```bash
     cd ../admin
     npm run dev
     ```

---

## Folder Structure

```
mediync/
  backend/      # Express API, MongoDB models, routes, controllers
  frontend/     # React user-facing app
  admin/        # React admin dashboard (if separate)
```

---

## Customization

- **Change primary color:**  
  Update the color in `frontend/src/index.css` as needed.

---

## Contributing

We welcome contributions to this project!

**For any changes or new features, please follow these steps:**

1. **Fork the repository** (if you’re not a collaborator).
2. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feature/medisync
   ```
3. **Make your changes** and commit them with clear messages.
4. **Push your branch** to your forked repository:
   ```bash
   git push origin feature/medisync
   ```
5. **Open a Pull Request** to the `main` branch of this repository, describing your changes.

**Please do not commit directly to the `main` branch.**  
All changes should be made in separate branches and merged via Pull Requests after review.

---

## License

[MIT](LICENSE)

---

## Contact

For questions or support, open an issue or contact abhishekchauhan01x@gmail.com

---

## Additional Libraries

- **Axios:** Used in the frontend for making HTTP requests to the backend (GET, POST, etc.).
- **Bcrypt:** Used in the backend for hashing and verifying user passwords securely.
