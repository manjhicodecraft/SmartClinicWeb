import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ChevronRight, ChevronLeft, Calendar, Clock, User, FileText } from "lucide-react";
import { useListDoctors, useGetAvailableSlots, useCreateAppointment } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fallbackDoctors, fallbackSlots } from "@/lib/mock-data";

interface AppointmentModalProps {
  open: boolean;
  onClose: () => void;
}

const STEPS = ["Doctor", "Schedule", "Your Info", "Confirm"];

export function AppointmentModal({ open, onClose }: AppointmentModalProps) {
  const [step, setStep] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [consultationType, setConsultationType] = useState<"in_person" | "online">("in_person");
  const [success, setSuccess] = useState(false);

  const { data: doctors, isLoading: loadingDoctors } = useListDoctors();
  const slotParams = { doctorId: selectedDoctor ?? undefined, date: date || undefined };
  const { data: slots, isLoading: loadingSlots } = useGetAvailableSlots(
    slotParams,
    { query: { queryKey: ["/api/appointments/slots", slotParams], enabled: !!selectedDoctor && !!date } }
  );
  const doctorList = Array.isArray(doctors) && doctors.length > 0 ? doctors : fallbackDoctors;
  const slotList = Array.isArray(slots) && slots.length > 0 ? slots : fallbackSlots;
  const mutation = useCreateAppointment();

  const doctor = doctorList.find((d) => d.id === selectedDoctor);

  const canNext = () => {
    if (step === 0) return !!selectedDoctor;
    if (step === 1) return !!date && !!slot;
    if (step === 2) return !!name && !!email && !!phone;
    return true;
  };

  const handleSubmit = () => {
    if (!selectedDoctor) return;
    mutation.mutate(
      {
        data: {
          patientName: name,
          patientEmail: email,
          patientPhone: phone,
          doctorId: selectedDoctor,
          date,
          timeSlot: slot,
          reason,
          consultationType,
        },
      },
      {
        onSuccess: () => setSuccess(true),
      }
    );
  };

  const reset = () => {
    setStep(0); setSelectedDoctor(null); setDate(""); setSlot("");
    setName(""); setEmail(""); setPhone(""); setReason("");
    setConsultationType("in_person"); setSuccess(false);
    onClose();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) reset(); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="w-full max-w-2xl glass-card rounded-3xl overflow-hidden shadow-2xl border border-primary/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-sky-600 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-white font-display font-bold text-xl">Book Appointment</h2>
                {!success && <p className="text-white/70 text-sm mt-0.5">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>}
              </div>
              <button onClick={reset} className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Progress */}
            {!success && (
              <div className="flex gap-0 h-1">
                {STEPS.map((_, i) => (
                  <div key={i} className={`flex-1 transition-all duration-500 ${i <= step ? "bg-primary" : "bg-white/10"}`} />
                ))}
              </div>
            )}

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {success ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
                    <Check className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-2">Appointment Confirmed!</h3>
                  <p className="text-muted-foreground mb-2">
                    Your appointment with <span className="text-primary font-semibold">{doctor?.name}</span> is confirmed.
                  </p>
                  <p className="text-muted-foreground text-sm mb-6">
                    {date} at {slot}. A confirmation will be sent to {email}.
                  </p>
                  <Button onClick={reset} className="rounded-xl bg-primary hover:bg-primary/90 text-white px-8">Done</Button>
                </motion.div>
              ) : (
                <>
                  {/* Step 0: Choose Doctor */}
                  {step === 0 && (
                    <div className="space-y-3">
                      <p className="text-muted-foreground text-sm mb-4">Select your preferred specialist</p>
                      {loadingDoctors ? (
                        <div className="grid grid-cols-2 gap-3">
                          {[1,2,3,4].map((i) => <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />)}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {doctorList.map((d) => (
                            <button
                              key={d.id}
                              onClick={() => setSelectedDoctor(d.id)}
                              className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                                selectedDoctor === d.id
                                  ? "border-primary bg-primary/10"
                                  : "border-white/10 bg-white/5 hover:border-white/20"
                              }`}
                            >
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-sky-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {d.name.split(" ").map((n) => n[0]).join("").slice(0,2)}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-sm truncate">{d.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{d.specialty}</p>
                              </div>
                              {selectedDoctor === d.id && <Check className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 1: Date & Slot */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <div>
                        <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2 mb-2">
                          <Calendar className="w-3.5 h-3.5" /> Select Date
                        </label>
                        <Input
                          type="date"
                          value={date}
                          min={today}
                          onChange={(e) => { setDate(e.target.value); setSlot(""); }}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      {date && (
                        <div>
                          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2 mb-3">
                            <Clock className="w-3.5 h-3.5" /> Available Slots
                          </label>
                          {loadingSlots ? (
                            <div className="flex flex-wrap gap-2">
                              {[1,2,3,4,5,6].map((i) => <div key={i} className="h-9 w-24 rounded-lg bg-white/5 animate-pulse" />)}
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {slotList.map((s) => (
                                <button
                                  key={s}
                                  onClick={() => setSlot(s)}
                                  className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                                    slot === s
                                      ? "bg-primary border-primary text-white"
                                      : "bg-white/5 border-white/10 text-muted-foreground hover:border-primary/50"
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                              {slotList.length === 0 && (
                                <p className="text-sm text-muted-foreground">No slots available for this date. Please try another date.</p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 2: Patient Info */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm mb-2">Please enter your details</p>
                      <div>
                        <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2 mb-2">
                          <User className="w-3.5 h-3.5" /> Full Name
                        </label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="bg-white/5 border-white/10" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2 block">Email</label>
                          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="bg-white/5 border-white/10" />
                        </div>
                        <div>
                          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2 block">Phone</label>
                          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className="bg-white/5 border-white/10" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Confirm */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2 mb-2">
                          <FileText className="w-3.5 h-3.5" /> Reason for Visit
                        </label>
                        <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Briefly describe your symptoms or reason..." className="bg-white/5 border-white/10 min-h-[80px]" />
                      </div>
                      <div>
                        <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3 block">Consultation Type</label>
                        <div className="grid grid-cols-2 gap-3">
                          {(["in_person", "online"] as const).map((type) => (
                            <button
                              key={type}
                              onClick={() => setConsultationType(type)}
                              className={`p-4 rounded-xl border text-sm font-medium transition-all ${
                                consultationType === type
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20"
                              }`}
                            >
                              {type === "in_person" ? "In-Person Visit" : "Online Consultation"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="bg-white/5 rounded-xl p-4 space-y-2 text-sm mt-4 border border-white/10">
                        <p><span className="text-muted-foreground">Doctor:</span> <span className="text-foreground font-medium">{doctor?.name}</span></p>
                        <p><span className="text-muted-foreground">Date:</span> <span className="text-foreground font-medium">{date}</span></p>
                        <p><span className="text-muted-foreground">Time:</span> <span className="text-foreground font-medium">{slot}</span></p>
                        <p><span className="text-muted-foreground">Patient:</span> <span className="text-foreground font-medium">{name}</span></p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            {!success && (
              <div className="p-6 border-t border-white/10 flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={step === 0}
                  className="gap-2 rounded-xl"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                {step < STEPS.length - 1 ? (
                  <Button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canNext()}
                    className="gap-2 rounded-xl bg-primary hover:bg-primary/90 text-white"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={mutation.isPending || !reason}
                    className="gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {mutation.isPending ? "Booking..." : "Confirm Appointment"}
                    <Check className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
