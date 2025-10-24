import express from "express";

import { Menu } from "../../schema/Menu.js";
import { isAdmin } from "../../middlewares/authentication-middleware.js";
import { isValidID } from "../../middlewares/params-middleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { sort, page = 1, limit = 10 } = req.query;

  const sortOptions = {};
  if (sort === "price") sortOptions.price = 1;
  if (sort === "category") sortOptions.category = 1;

  const menus = await Menu.find().sort(sortOptions).skip((page - 1) * limit).limit(Number(limit));
  res.status(200).json(menus);
});

router.get("/:id", isValidID, async (req, res) => {
  const menu = await Menu.findById(req.params.id);

  if (!menu) {
    return res.status(404).json({ message: "Menu inexistant !" });
  }

  res.status(200).json(menu);
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).json({ message: "Menu créé avec succès", menu });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", isAdmin, isValidID, async (req, res) => {
  const menu = await Menu.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!menu) {
    return res.status(404).json({ message: "Menu inexistant !" });
  }

  res.status(200).json({ message: "Menu mis à jour", menu });
});


router.delete("/:id", isAdmin, isValidID, async (req, res) => {
  const menu = await Menu.findByIdAndDelete(req.params.id);

  if (!menu) {
    return res.status(404).json({ message: "Menu inexistant !" });
  }

  res.status(200).json({ message: "Menu supprimé", menu });
});

export default router;
