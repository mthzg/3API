import express from "express";

import { Restaurant } from "../../schema/Restaurants.js";
import { isAdmin } from "../../middlewares/authentication-middleware.js";
import { isValidID } from "../../middlewares/params-middleware.js";

const router = express.Router();
//app.use("/restaurants", restaurantsRouter);
router.get("/", async (req, res) => {
  const { sort, page = 1, limit = 10 } = req.query;

  const sortOptions = {};
  if (sort === "name") sortOptions.name = 1;
  if (sort === "address") sortOptions.address = 1;

  const restaurants = await Restaurant.find().sort(sortOptions).skip((page - 1) * Number(limit)).limit(Number(limit));

  res.status(200).json(restaurants);
});

router.get("/:id", isValidID, async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant inexistant !" });
  }

  res.status(200).json(restaurant);
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json({ message: "Restaurant créé avec succès", restaurant });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", isAdmin, isValidID, async (req, res) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant inexistant !" });
  }

  res.status(200).json({ message: "Restaurant mis à jour", restaurant });
});

router.delete("/:id", isAdmin, isValidID, async (req, res) => {
  const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant inexistant !" });
  }

  res.status(200).json({ message: "Restaurant supprimé", restaurant });
});

export default router;
