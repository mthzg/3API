import express from "express";
import bcrypt from "bcrypt";

import { User } from "../../schema/User.js";
import { isAdmin, isAdminOrEmployee } from "../../middlewares/authentication-middleware.js";
import { isValidID, userExists } from "../../middlewares/params-middleware.js";

const router = express.Router();
//app.use("/users", usersRouter);


router.get("/", isAdmin, async (request, response) => {
  const users = await User.find();
  response.status(200).json(users);
});

router.get("/:id", isAdmin, isValidID, userExists, async (request, response) => {
  const user = await User.findById(request.params.id);
  response.status(200).json(user);
});

router.put("/:id", isAdmin, isValidID, userExists, async (req, res) => {
  try {
    const id = req.params.id;
    const { email, username, password, role } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email déjà utilisé" });
      }
      user.email = email;
    }

    if (username) user.username = username;

    if (role) user.role = role;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    const userSafe = user.toObject();
    delete userSafe.password;

    res.status(200).json({
      message: `Utilisateur ${id} mis à jour avec succès`,
      user: userSafe
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }

});


router.delete("/:id", isAdmin, isValidID, userExists, async (request, response) => {
  const id = request.params.id;
  const user = await User.findByIdAndDelete(id);

  response.status(200).json({ message: `L'utilisateur ${id} a été supprimé avec succès !`, user });
});

export default router;