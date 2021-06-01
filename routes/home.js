import express from "express";
const router = express.Router();
import homeController from "../controllers/home";

router.get("/", homeController.getIndex);

module.exports = router;
