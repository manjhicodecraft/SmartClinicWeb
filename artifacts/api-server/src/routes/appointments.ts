import { Router } from "express";
import { db, appointmentsTable, doctorsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateAppointmentBody, GetAvailableSlotsQueryParams } from "@workspace/api-zod";

const router = Router();

const ALL_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM",
];

router.get("/appointments", async (req, res) => {
  try {
    const appointments = await db.select().from(appointmentsTable).orderBy(appointmentsTable.createdAt);
    res.json(appointments);
  } catch (err) {
    req.log.error({ err }, "Failed to list appointments");
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

router.get("/appointments/slots", async (req, res) => {
  const parsed = GetAvailableSlotsQueryParams.safeParse({
    doctorId: req.query.doctorId ? Number(req.query.doctorId) : undefined,
    date: req.query.date,
  });
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid query params" });
  }

  try {
    const { doctorId, date } = parsed.data;
    if (!doctorId || !date) {
      return res.json(ALL_SLOTS);
    }
    const booked = await db
      .select({ timeSlot: appointmentsTable.timeSlot })
      .from(appointmentsTable)
      .where(eq(appointmentsTable.doctorId, doctorId));
    const bookedSet = new Set(booked.map((b) => b.timeSlot));
    const available = ALL_SLOTS.filter((s) => !bookedSet.has(s));
    res.json(available);
  } catch (err) {
    req.log.error({ err }, "Failed to get slots");
    res.status(500).json({ error: "Failed to fetch slots" });
  }
});

router.post("/appointments", async (req, res) => {
  const parsed = CreateAppointmentBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid appointment data", details: parsed.error });
  }

  try {
    const { doctorId, ...rest } = parsed.data;
    const [doctor] = await db.select().from(doctorsTable).where(eq(doctorsTable.id, doctorId));
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const [appointment] = await db
      .insert(appointmentsTable)
      .values({ ...rest, doctorId, doctorName: doctor.name, status: "confirmed" })
      .returning();
    res.status(201).json(appointment);
  } catch (err) {
    req.log.error({ err }, "Failed to create appointment");
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

export default router;
