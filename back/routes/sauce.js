const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  parse,
  sauceValidationRules,
  validate
} = require("../middleware/validator");
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauce");

router.get("/", auth, sauceCtrl.getAllSauces);
router.post(
  "/",
  auth,
  multer,
  parse,
  sauceValidationRules(),
  validate,
  sauceCtrl.createSauce
);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put(
  "/:id",
  auth,
  multer,
  sauceValidationRules(),
  validate,
  sauceCtrl.modifySauce
);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;
