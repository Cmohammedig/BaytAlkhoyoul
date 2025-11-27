// server.js (SendGrid)
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import sgMail from "@sendgrid/mail";
import { body, validationResult } from "express-validator";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "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";
const SENDGRID_FROM = process.env.SENDGRID_FROM || "mohammedchboubaig@gmail.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "responsable@tondomaine.ma";

sgMail.setApiKey(SENDGRID_API_KEY);

app.use(
  rateLimit({
    windowMs: 60_000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

const reservationValidators = [
  body("prenom").trim().isLength({ min: 1 }),
  body("nom").trim().isLength({ min: 1 }),
  body("personnes").isInt({ min: 1 }),
  body("email").isEmail(),
  body("telephone").trim().isLength({ min: 6 }),
  body("date").isISO8601(),
  body("message").optional().trim(),
];

app.post("/api/reservation", reservationValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: "Validation failed", details: errors.array() });

  const { prenom, nom, personnes, email, telephone, date, message } = req.body;

  const adminHtml = `
    <h2>Nouvelle demande de réservation</h2>
    <p><strong>Nom:</strong> ${prenom} ${nom}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Téléphone:</strong> ${telephone}</p>
    <p><strong>Nombre de personnes:</strong> ${personnes}</p>
    <p><strong>Date souhaitée:</strong> ${date}</p>
    <p><strong>Message:</strong> ${message || "—"}</p>
  `;

  const clientHtml = `
    <h2>Bonjour ${prenom},</h2>
    <p>Votre demande de réservation a bien été enregistrée.</p>
    <p>Un membre de notre équipe vous contactera bientôt.</p>
    <p>Merci pour votre confiance 🤎</p>
    <br />
    <p>— L'équipe Bayt Al Khouyoul</p>
  `;

  try {
    await sgMail.send({
      to: ADMIN_EMAIL,
      from: SENDGRID_FROM,
      subject: `🧾 Nouvelle réservation - ${prenom} ${nom}`,
      html: adminHtml,
    });

    await sgMail.send({
      to: email,
      from: SENDGRID_FROM,
      subject: "Votre réservation a bien été reçue ✅",
      html: clientHtml,
    });

    return res.status(200).json({ message: "Emails envoyés via SendGrid" });
  } catch (err) {
    console.error("SendGrid error:", err?.response?.body || err);
    return res.status(500).json({ error: "Error sending emails" });
  }
});

app.get("/", (req, res) => res.send("✅ Serveur Bayt Al Khouyoul (SendGrid) fonctionne !"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur actif sur http://localhost:${PORT}`));
