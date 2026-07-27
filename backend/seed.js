/**
 * BookMedico - Database Seed Script
 * ----------------------------------
 * Populates MongoDB with sample data so the app can be explored end to end
 * right after cloning: patients, doctors, an admin, appointments, medicines
 * and prescriptions.
 *
 * Usage:
 *   cd backend
 *   npm run seed        # seeds the database
 *   npm run seed:fresh  # wipes existing collections first, then seeds
 */

import "./loadEnv.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";

import User from "./models/user.js";
import Doctor from "./models/doctor.js";
import Appointment from "./models/appointment.js";
import Medicine from "./models/medicine.js";
import Prescription from "./models/prescription.js";

const FRESH = process.argv.includes("--fresh");
const DEFAULT_PASSWORD = "Password@123";

const run = async () => {
  await connectDB();

  if (FRESH) {
    console.log("Clearing existing collections...");
    await Promise.all([
      User.deleteMany({}),
      Doctor.deleteMany({}),
      Appointment.deleteMany({}),
      Medicine.deleteMany({}),
      Prescription.deleteMany({}),
    ]);
  }

  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  // ---------------------------------------------------------------------
  // Users: 1 admin, 3 doctors, 3 patients
  // ---------------------------------------------------------------------
  console.log("Seeding users...");

  const admin = await User.create({
    name: "Admin User",
    email: "admin@bookmedico.com",
    phone: "9000000001",
    password: hashedPassword,
    role: "admin",
    city: "Kolkata",
    state: "West Bengal",
    gender: "Not Selected",
  });

  const doctorUsers = await User.create([
    {
      name: "Dr. Argha Maity",
      email: "argha.maity@bookmedico.com",
      phone: "9000000002",
      password: hashedPassword,
      role: "doctor",
      city: "Kolkata",
      state: "West Bengal",
      gender: "Male",
    },
    {
      name: "Dr. Sneha Chatterjee",
      email: "sneha.chatterjee@bookmedico.com",
      phone: "9000000003",
      password: hashedPassword,
      role: "doctor",
      city: "Bengaluru",
      state: "Karnataka",
      gender: "Female",
    },
    {
      name: "Dr. Rohan Verma",
      email: "rohan.verma@bookmedico.com",
      phone: "9000000004",
      password: hashedPassword,
      role: "doctor",
      city: "Mumbai",
      state: "Maharashtra",
      gender: "Male",
    },
  ]);

  const patientUsers = await User.create([
    {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "9000000005",
      password: hashedPassword,
      role: "patient",
      city: "Kolkata",
      state: "West Bengal",
      gender: "Female",
      address: { line1: "12 Park Street", line2: "Near City Mall" },
    },
    {
      name: "Amit Das",
      email: "amit.das@example.com",
      phone: "9000000006",
      password: hashedPassword,
      role: "patient",
      city: "Howrah",
      state: "West Bengal",
      gender: "Male",
      address: { line1: "45 Station Road", line2: "" },
    },
    {
      name: "Neha Kapoor",
      email: "neha.kapoor@example.com",
      phone: "9000000007",
      password: hashedPassword,
      role: "patient",
      city: "Delhi",
      state: "Delhi",
      gender: "Female",
      address: { line1: "7 Connaught Place", line2: "" },
    },
  ]);

  // ---------------------------------------------------------------------
  // Doctor profiles
  // ---------------------------------------------------------------------
  console.log("Seeding doctor profiles...");

  const doctors = await Doctor.create([
    {
      userId: doctorUsers[0]._id,
      name: doctorUsers[0].name,
      phone: doctorUsers[0].phone,
      specialty: "Neurologist",
      degree: "MBBS, MD (Neurology)",
      experience: 8,
      hospital: "BookMedico City Hospital",
      location: "Kolkata, West Bengal",
      fees: 700,
      availability: [
        { day: "Monday", slots: ["10:00 AM", "10:30 AM", "11:00 AM"] },
        { day: "Wednesday", slots: ["04:00 PM", "04:30 PM", "05:00 PM"] },
      ],
      isActive: true,
    },
    {
      userId: doctorUsers[1]._id,
      name: doctorUsers[1].name,
      phone: doctorUsers[1].phone,
      specialty: "Pediatrician",
      degree: "MBBS, DCH",
      experience: 5,
      hospital: "BookMedico Children's Clinic",
      location: "Bengaluru, Karnataka",
      fees: 500,
      availability: [
        { day: "Tuesday", slots: ["09:00 AM", "09:30 AM", "10:00 AM"] },
        { day: "Thursday", slots: ["02:00 PM", "02:30 PM", "03:00 PM"] },
      ],
      isActive: true,
    },
    {
      userId: doctorUsers[2]._id,
      name: doctorUsers[2].name,
      phone: doctorUsers[2].phone,
      specialty: "General Physician",
      degree: "MBBS",
      experience: 10,
      hospital: "BookMedico Wellness Center",
      location: "Mumbai, Maharashtra",
      fees: 400,
      availability: [
        { day: "Monday", slots: ["11:00 AM", "11:30 AM", "12:00 PM"] },
        { day: "Friday", slots: ["05:00 PM", "05:30 PM", "06:00 PM"] },
      ],
      isActive: true,
    },
  ]);

  // ---------------------------------------------------------------------
  // Medicine inventory
  // ---------------------------------------------------------------------
  console.log("Seeding medicine inventory...");

  await Medicine.create([
    {
      name: "Paracetamol 500mg",
      category: "Tablets",
      stock: 120,
      price: 2.5,
      expiryDate: new Date("2027-06-30"),
      addedBy: admin._id,
    },
    {
      name: "Amoxicillin 250mg",
      category: "Tablets",
      stock: 8,
      price: 6,
      expiryDate: new Date("2026-12-31"),
      addedBy: admin._id,
    },
    {
      name: "Cough Syrup",
      category: "Syrups",
      stock: 40,
      price: 55,
      expiryDate: new Date("2027-03-15"),
      addedBy: admin._id,
    },
    {
      name: "Vitamin D3 Injection",
      category: "Injections",
      stock: 15,
      price: 120,
      expiryDate: new Date("2027-01-20"),
      addedBy: admin._id,
    },
    {
      name: "Multivitamin Capsules",
      category: "Supplements",
      stock: 60,
      price: 18,
      expiryDate: new Date("2027-08-10"),
      addedBy: admin._id,
    },
  ]);

  // ---------------------------------------------------------------------
  // Appointments
  // ---------------------------------------------------------------------
  console.log("Seeding appointments...");

  const appointments = await Appointment.create([
    {
      patientId: patientUsers[0]._id,
      doctorId: doctors[0]._id,
      slotDate: "2026-08-03",
      slotTime: "10:00 AM",
      status: "confirmed",
      amount: doctors[0].fees,
      paymentStatus: "Paid",
    },
    {
      patientId: patientUsers[1]._id,
      doctorId: doctors[1]._id,
      slotDate: "2026-08-05",
      slotTime: "09:30 AM",
      status: "pending",
      amount: doctors[1].fees,
      paymentStatus: "Pending",
    },
    {
      patientId: patientUsers[2]._id,
      doctorId: doctors[2]._id,
      slotDate: "2026-07-20",
      slotTime: "11:00 AM",
      status: "completed",
      amount: doctors[2].fees,
      paymentStatus: "Paid",
    },
  ]);

  // ---------------------------------------------------------------------
  // A prescription for the completed appointment
  // ---------------------------------------------------------------------
  console.log("Seeding prescriptions...");

  await Prescription.create({
    appointmentId: appointments[2]._id,
    doctorId: doctorUsers[2]._id,
    patientId: patientUsers[2]._id,
    diagnosis: "Seasonal flu with mild fever",
    medicines: [
      { name: "Paracetamol 500mg", dosage: "1 tablet twice a day", duration: "5 days" },
      { name: "Cough Syrup", dosage: "10ml at night", duration: "5 days" },
    ],
    advice: "Stay hydrated, take rest, and follow up if fever persists beyond 3 days.",
    type: "doctor",
  });

  console.log("\nSeed data created successfully!\n");
  console.log("Sample login credentials (all use the same password):");
  console.log(`  Password: ${DEFAULT_PASSWORD}\n`);
  console.log("  Admin   -> admin@bookmedico.com");
  console.log("  Doctor  -> argha.maity@bookmedico.com");
  console.log("  Doctor  -> sneha.chatterjee@bookmedico.com");
  console.log("  Doctor  -> rohan.verma@bookmedico.com");
  console.log("  Patient -> priya.sharma@example.com");
  console.log("  Patient -> amit.das@example.com");
  console.log("  Patient -> neha.kapoor@example.com\n");

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
