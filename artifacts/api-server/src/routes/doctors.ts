import { Router } from "express";
import { db, doctorsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { GetDoctorParams } from "@workspace/api-zod";

const router = Router();

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await db.select().from(doctorsTable).orderBy(doctorsTable.id);
    res.json(doctors);
  } catch (err) {
    req.log.error({ err }, "Failed to list doctors");
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

router.get("/doctors/:id", async (req, res) => {
  const parsed = GetDoctorParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid doctor id" });
  }
  try {
    const [doctor] = await db.select().from(doctorsTable).where(eq(doctorsTable.id, parsed.data.id));
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    req.log.error({ err }, "Failed to get doctor");
    res.status(500).json({ error: "Failed to fetch doctor" });
  }
});

export default router;
