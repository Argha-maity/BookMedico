# BookMedico 🩺

A full-stack MERN health-tech platform that connects **Patients**, **Doctors**, and **Pharmacy Admins** in a single clinical workflow — from appointment booking and AI-assisted prescription digitization to pharmacy inventory management.

> This repository is a corrected, runnable version of the original BookMedico project. See [What Was Fixed](#-what-was-fixed) for a full list of the bugs found and resolved.

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Seeding Sample Data](#seeding-sample-data)
- [API Overview](#api-overview)
- [What Was Fixed](#-what-was-fixed)
- [License](#license)

---

## Overview

BookMedico (MediConnect) is a centralized medical management system designed to bridge the gap between patients, doctors, and pharmacy store owners. It covers the entire clinical workflow: real-time doctor availability, appointment scheduling, digital prescription generation, OCR/AI-based extraction of medicines from uploaded prescriptions, and pharmacy inventory tracking.

## Core Features

**For Patients**
- Health vault to store digital prescriptions and uploaded lab reports (PDF/image, with OCR text extraction)
- Real-time doctor availability check and instant appointment booking
- View appointment history and prescriptions

**For Doctors**
- Digital prescription pad — diagnose, prescribe medicines (with dosage/duration), and add advice
- Live queue management with appointment status updates (Pending, Confirmed, Cancelled, Completed)
- Access to a patient's document vault before consultation

**For Admins (Pharmacy/Store Owners)**
- Inventory management — track stock, categories (Tablets, Syrups, Injections, Supplements), and expiry dates
- Low-stock indicators
- Platform-wide visibility into users, doctors, and appointments

## Tech Stack

| Layer          | Technology                                                 |
|----------------|-------------------------------------------------------------|
| Frontend       | React 19, Vite, Tailwind CSS, Lucide Icons, Axios          |
| Backend        | Node.js, Express                                           |
| Database       | MongoDB with Mongoose ODM                                   |
| Auth           | JWT with role-based access control (patient / doctor / admin) |
| File Uploads   | Multer                                                     |
| OCR            | Tesseract.js (images), pdf-parse (PDFs)                    |
| AI Extraction  | Google Gemini (`@google/generative-ai`)                    |

## Project Structure

```
BookMedico/
├── backend/
│   ├── config/          # DB connection, JWT secret, multer upload config
│   ├── controllers/     # Route handlers (business logic)
│   ├── middlewares/     # Auth (JWT) & role-based access control
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── utils/           # OCR & AI-parsing helpers
│   ├── seed.js          # Sample data seeder
│   └── index.js         # App entry point
└── frontend/
    └── src/
        ├── components/   # Reusable UI components
        ├── pages/        # Route-level pages & role dashboards
        └── services/     # Axios API clients
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- (Optional) A [Google Gemini API key](https://ai.google.dev/) if you want AI-based medicine extraction from uploaded prescriptions

### 1. Clone & install

```bash
git clone <this-repo-url>
cd BookMedico

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment variables

Copy the example env file and fill in your own values (see [Environment Variables](#environment-variables) below):

```bash
cd backend
cp .env.development.example .env.development
```

### 3. Run the backend

```bash
cd backend
npm run dev        # starts with NODE_ENV=development
```

The API will be available at `http://localhost:8000` (or whatever `PORT` you set).

### 4. Run the frontend

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173` by default (Vite's dev server).

### 5. (Recommended) Seed sample data

```bash
cd backend
npm run seed
```

See [Seeding Sample Data](#seeding-sample-data) for login credentials.

## Environment Variables

Create `backend/.env.development` (or `.env.production` when deploying) based on `.env.development.example`:

| Variable         | Description                                                        |
|------------------|----------------------------------------------------------------------|
| `MONGO_URI`      | MongoDB connection string                                          |
| `PORT`           | Port the Express server listens on (defaults to `8000`)            |
| `JWT_SECRET`     | Secret used to sign/verify JWTs — use a long random string          |
| `GEMINI_API_KEY` | Google Gemini API key for AI medicine extraction (optional)         |

## Seeding Sample Data

Running `npm run seed` (or `npm run seed:fresh` to wipe existing data first) inside `backend/` populates the database with:

- 1 admin account
- 3 doctor accounts (with full doctor profiles, specialties, and availability)
- 3 patient accounts
- Sample medicine inventory (including a low-stock item to demonstrate alerts)
- Sample appointments in `pending`, `confirmed`, and `completed` states
- A sample prescription linked to the completed appointment

**All seeded accounts use the password:** `Password@123`

| Role    | Email                              |
|---------|--------------------------------------|
| Admin   | admin@bookmedico.com                |
| Doctor  | argha.maity@bookmedico.com          |
| Doctor  | sneha.chatterjee@bookmedico.com     |
| Doctor  | rohan.verma@bookmedico.com          |
| Patient | priya.sharma@example.com            |
| Patient | amit.das@example.com                |
| Patient | neha.kapoor@example.com             |

## API Overview

All endpoints are prefixed with `/api`.

| Method | Endpoint                       | Access                 | Description                              |
|--------|---------------------------------|------------------------|-------------------------------------------|
| POST   | `/users/signup`                 | Public                 | Register a new user (patient/doctor)      |
| POST   | `/users/login`                  | Public                 | Log in and receive a JWT                  |
| GET    | `/users/profile`                | Authenticated          | Get the logged-in user's profile          |
| PUT    | `/users/profile`                | Authenticated          | Update the logged-in user's profile       |
| GET    | `/users/allUsers`               | Admin                  | List all users                            |
| GET    | `/doctors`                      | Public                 | List all active doctors                   |
| GET    | `/doctors/:id`                  | Public                 | Get a single doctor's profile             |
| POST   | `/doctors`                      | Admin                  | Add a new doctor                          |
| POST   | `/appointments/book`            | Authenticated          | Book an appointment                       |
| GET    | `/appointments/my`               | Authenticated          | Get the current patient's appointments    |
| GET    | `/appointments/doctor`          | Authenticated (doctor) | Get the current doctor's appointments     |
| GET    | `/appointments/all`             | Admin                  | List all appointments                     |
| PATCH  | `/appointments/status/:id`      | Authenticated          | Update an appointment's status            |
| POST   | `/prescriptions/add`            | Authenticated (doctor) | Create a prescription for an appointment  |
| GET    | `/prescriptions/my`              | Authenticated          | Get the current patient's prescriptions   |
| POST   | `/prescriptions/upload`         | Authenticated          | Upload a prescription file for OCR/AI extraction |
| POST   | `/inventory/update`             | Admin                  | Add/update medicine stock                 |
| GET    | `/inventory/all`                | Authenticated          | List all medicines                        |
| DELETE | `/inventory/:id`                | Admin                  | Remove a medicine                         |

---

## 🐛 What Was Fixed

The original repository failed to run at all, and had several data-integrity bugs downstream. Here's everything that was found and corrected:

1. **App-breaking dependency bug (root cause of the app not starting).**
   `backend/package.json` listed `"express.js": "^1.0.0"` instead of the real **`express`** package. `express.js` is an unrelated, unmaintained npm package — since `index.js` does `import express from "express"`, `npm install && npm start` failed immediately with a module-not-found error. Fixed to `"express": "^4.21.2"`.

2. **Doctor signup crashed with a 500 error.**
   In `controllers/user.js`, signing up with `role: "doctor"` created a `Doctor` document with `availability: {}` — but the schema defines `availability` as an **array**. Mongoose couldn't cast an object to an array, so every doctor signup failed. Fixed to default to `[]`.

3. **Appointment status enum mismatch caused silent data corruption.**
   The `Appointment` schema only allowed capitalized statuses (`'Pending'`, `'Confirmed'`, …), while every controller and the entire frontend read/wrote **lowercase** statuses (`'pending'`, `'confirmed'`, …). Because `findByIdAndUpdate` doesn't run validators by default, writes silently succeeded with values outside the declared enum, and every appointment's default status (`'Pending'`) never matched anything the UI or backend logic checked for. Standardized the schema to lowercase values to match the rest of the codebase.

4. **Doctor specialty never displayed.**
   `controllers/appointment.js` populated `doctorId` with the field `"speciality"` (misspelled), but the `Doctor` schema field is `specialty`. Mongoose silently ignores unknown `select` fields, so a doctor's specialty was **always missing** from appointment data returned to the frontend, which showed a hardcoded fallback ("General") instead. Fixed the populate calls, and aligned the matching frontend typos (`Profile.jsx`, `PatientDashboard.jsx`) to use `specialty` consistently.

5. **Doctor profile page was always blank.**
   The frontend `Profile.jsx` page reads `user.specialty`, `user.degree`, and `user.experience` directly off the logged-in user object — but those fields live on the separate `Doctor` document, not `User`, and `degree` didn't exist anywhere in the schema at all. `getProfile`/`updateProfile` now merge in the doctor's `specialty`, `degree`, `experience`, `hospital`, and `fees` for doctor accounts, and a `degree` field was added to the `Doctor` schema.

6. **Appointment amount was hardcoded, ignoring the doctor's actual fee.**
   `bookAppointment` always charged a flat `500` regardless of the selected doctor's configured `fees`. It now looks up the doctor and uses their actual fee (falling back to `500` only if unset), and also validates that the doctor exists before booking.

7. **Prescription file uploads crashed on a fresh clone.**
   `config/upload.js` pointed Multer's disk storage at `uploads/prescriptions` without ever creating that folder, so the very first upload failed with an `ENOENT` error. The upload config now creates the directory automatically if it doesn't exist.

### Also added
- `backend/seed.js` — a full sample-data seeder (see [Seeding Sample Data](#seeding-sample-data))
- `.env.development.example` / `.env.production.example` for easy environment setup
- This README

## License

ISC — see individual package metadata. Original project by [Argha Maity](https://github.com/Argha-maity).
