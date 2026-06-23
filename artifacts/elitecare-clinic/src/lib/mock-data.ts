import type { ClinicStats, Doctor, Testimonial } from "@workspace/api-client-react";

export const fallbackDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Aisha Mehra",
    specialty: "Cardiology",
    qualification: "MD, DM Cardiology",
    experience: "14 yrs",
    rating: 4.9,
    patientsCount: 3200,
    image: null,
    availabilityStatus: "available",
    nextAvailableTime: null,
  },
  {
    id: 2,
    name: "Dr. Rohan Kapoor",
    specialty: "Orthopedics",
    qualification: "MS Orthopedics",
    experience: "11 yrs",
    rating: 4.8,
    patientsCount: 2800,
    image: null,
    availabilityStatus: "next_slot",
    nextAvailableTime: "4:30 PM",
  },
  {
    id: 3,
    name: "Dr. Neha Sharma",
    specialty: "Dermatology",
    qualification: "MD Dermatology",
    experience: "10 yrs",
    rating: 4.9,
    patientsCount: 2400,
    image: null,
    availabilityStatus: "available",
    nextAvailableTime: null,
  },
  {
    id: 4,
    name: "Dr. Arjun Singh",
    specialty: "Neurology",
    qualification: "DM Neurology",
    experience: "16 yrs",
    rating: 4.7,
    patientsCount: 3500,
    image: null,
    availabilityStatus: "next_slot",
    nextAvailableTime: "Tomorrow",
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    patientName: "Priya Verma",
    rating: 5,
    review: "The doctors explained everything clearly and the appointment process was smooth.",
    treatment: "Cardiology Consultation",
    date: "2026-05-12",
    avatarUrl: null,
  },
  {
    id: 2,
    patientName: "Aman Gupta",
    rating: 5,
    review: "Clean clinic, polite staff, and quick follow-up after my visit.",
    treatment: "Orthopedic Care",
    date: "2026-05-20",
    avatarUrl: null,
  },
  {
    id: 3,
    patientName: "Sara Khan",
    rating: 5,
    review: "Online consultation saved time and felt just as personal as an in-clinic visit.",
    treatment: "Dermatology",
    date: "2026-06-02",
    avatarUrl: null,
  },
];

export const fallbackClinicStats: ClinicStats = {
  happyPatients: 20000,
  yearsExperience: 15,
  successRate: 98,
  emergencySupport: "24x7",
  doctorsCount: 12,
};

export const fallbackSlots = ["09:30 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];
