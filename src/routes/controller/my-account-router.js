import express from "express";
import bcrypt from "bcrypt";

import { User } from "../../schema/User.js";
import { isCurrentUser } from "../../middlewares/authentication-middleware.js";

const router = express.Router();
const rounds = 10;

router.get("/", isCurrentUser, async (req, res) => {
  try {
    const user = await User.findById(req.session.userID).select("-password");
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable." });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/", isCurrentUser, async (req, res) => {
  try {
    const userId = req.session.userID;
    const { email, username, password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable." });

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(409).json({ message: "Email déjà utilisé." });
      user.email = email;
    }

    if (username) user.username = username;

    if (password) {
      user.password = await bcrypt.hash(password, rounds);
    }

    await user.save();

    const userSafe = user.toObject();
    delete userSafe.password;

    res.status(200).json({ message: "Compte mis à jour avec succès.", user: userSafe });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/", isCurrentUser, async (req, res) => {
  try {
    const userId = req.session.userID;
    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).json({ message: "Utilisateur introuvable." });

    req.session.destroy();

    res.status(200).json({ message: "Compte supprimé avec succès.", user: { email: user.email, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
