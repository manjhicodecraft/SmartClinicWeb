import { Router } from "express";
import { db, testimonialsTable, doctorsTable } from "@workspace/db";
import { SendChatMessageBody } from "@workspace/api-zod";

const router = Router();

router.get("/clinic/stats", async (req, res) => {
  try {
    const [doctorsCount] = await db
      .select({ count: doctorsTable.id })
      .from(doctorsTable);
    res.json({
      happyPatients: 20000,
      yearsExperience: 15,
      successRate: 98,
      emergencySupport: "24x7",
      doctorsCount: doctorsCount?.count ?? 12,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get clinic stats");
    res.json({
      happyPatients: 20000,
      yearsExperience: 15,
      successRate: 98,
      emergencySupport: "24x7",
      doctorsCount: 12,
    });
  }
});

router.get("/clinic/testimonials", async (req, res) => {
  try {
    const testimonials = await db.select().from(testimonialsTable).orderBy(testimonialsTable.id);
    res.json(testimonials);
  } catch (err) {
    req.log.error({ err }, "Failed to list testimonials");
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

const AI_RESPONSES: Record<string, { reply: string; suggestedActions: string[] }> = {
  default: {
    reply: "Hello! I am EliteCare AI. I can help you book appointments, find doctors, or provide clinic information. How may I assist you today?",
    suggestedActions: ["Book Appointment", "Find a Doctor", "Clinic Timings", "Emergency Contact"],
  },
  book: {
    reply: "I can help you book an appointment! Please scroll to the Appointment section or click 'Book Appointment'. Our doctors are available Monday to Saturday, 9 AM to 6 PM. Would you like to know more about our doctors?",
    suggestedActions: ["View Doctors", "Clinic Timings", "Online Consultation"],
  },
  doctor: {
    reply: "We have specialist doctors in Cardiology, Orthopedics, Dermatology, Neurology, Pediatrics, and more. All our doctors are highly experienced with 10+ years of practice. Shall I help you find the right specialist?",
    suggestedActions: ["Book Appointment", "View Specialists", "Emergency Contact"],
  },
  timing: {
    reply: "EliteCare Clinic is open Monday to Saturday, 9:00 AM to 7:00 PM. Our Emergency Department is available 24 hours a day, 7 days a week. Online consultations are also available anytime.",
    suggestedActions: ["Book Appointment", "Emergency Contact", "Online Consultation"],
  },
  emergency: {
    reply: "For medical emergencies, please call our 24x7 Emergency helpline immediately: +91 98765 43210. Our emergency team is always ready to assist you. Do NOT delay — call now if it is urgent.",
    suggestedActions: ["Call Emergency", "Book Appointment", "Online Consultation"],
  },
};

function getAIResponse(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes("book") || lower.includes("appointment") || lower.includes("schedule")) {
    return AI_RESPONSES.book;
  }
  if (lower.includes("doctor") || lower.includes("specialist") || lower.includes("physician")) {
    return AI_RESPONSES.doctor;
  }
  if (lower.includes("time") || lower.includes("hour") || lower.includes("open") || lower.includes("timing")) {
    return AI_RESPONSES.timing;
  }
  if (lower.includes("emergency") || lower.includes("urgent") || lower.includes("critical")) {
    return AI_RESPONSES.emergency;
  }
  return AI_RESPONSES.default;
}

router.post("/chat/message", async (req, res) => {
  const parsed = SendChatMessageBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid message" });
  }

  const { message, sessionId } = parsed.data;
  const sessionIdOut = sessionId ?? `session_${Date.now()}`;

  // Simulate a short delay for realism
  await new Promise((resolve) => setTimeout(resolve, 800));

  const response = getAIResponse(message);
  res.json({
    reply: response.reply,
    sessionId: sessionIdOut,
    suggestedActions: response.suggestedActions,
  });
});

export default router;
