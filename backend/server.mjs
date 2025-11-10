import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

// === CONFIG TRANSPORT EMAIL ===
// ⚠️ بدل المعلومات ديالك هنا
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohammedchboubaig@gmail.com", // بريد المسؤول
    pass: "vfyi iqcw wrem syup", // App password Gmail
  },
});

// === Route POST pour recevoir les réservations ===
app.post("/api/reservation", async (req, res) => {
  const data = req.body;
  const { prenom, nom, personnes, email, telephone, date, message } = data;

  try {
    await transporter.sendMail({
      from: `"Site Bayt Al Khouyoul" <${email}>`,
      to: "responsable@tondomaine.ma", // 📩 بريد الشخص المسؤول
      subject: `🧾 Nouvelle réservation - ${prenom} ${nom}`,
      html: `
        <h2>Nouvelle demande de réservation</h2>
        <p><strong>Nom:</strong> ${prenom} ${nom}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${telephone}</p>
        <p><strong>Nombre de personnes:</strong> ${personnes}</p>
        <p><strong>Date souhaitée:</strong> ${date}</p>
        <p><strong>Message:</strong> ${message || "—"}</p>
      `,
    });

    // Email vers le client
    await transporter.sendMail({
      from: `"Bayt Al Khouyoul" <tonemail@gmail.com>`,
      to: email,
      subject: "Votre réservation a bien été reçue ✅",
      html: `
        <h2>Bonjour ${prenom},</h2>
        <p>Votre demande de réservation a bien été enregistrée.</p>
        <p>Un membre de notre équipe vous contactera par téléphone pour confirmer les détails.</p>
        <p>Merci pour votre confiance 🤎</p>
        <br/>
        <p>– L'équipe Bayt Al Khouyoul</p>
      `,
    });

    res.status(200).json({ message: "Emails envoyés avec succès" });
  } catch (err) {
    console.error("Erreur envoi email:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// === Lancer le serveur ===
// === Lancer le serveur ===
// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Serveur actif sur http://localhost:${PORT}`));

app.get("/", (req, res) => {
  res.send("✅ Le serveur Bayt Al Khouyoul fonctionne parfaitement !");
});

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Serveur actif sur http://localhost:${PORT}`));

app.get("/", (req, res) => {
  res.send("✅ Le serveur Bayt Al Khouyoul fonctionne parfaitement !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur actif sur port ${PORT}`));
