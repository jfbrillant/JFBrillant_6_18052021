const { check, validationResult } = require("express-validator");

const parse = (req, res, next) => {
  if (req.body.sauce) {
      req.body = JSON.parse(req.body.sauce);
  }
  next();
}

const userValidationRules = () => {
  return [
    check("email", "L'email n'est pas valide").isEmail().normalizeEmail(),
    check(
      "password",
      "Le mot de passe doit contenir au moins 8 caractères et uniquement des chiffres et des lettres"
    )
      .isAlphanumeric()
      .isLength({ min: 8 }),
  ];
};

const sauceValidationRules = () => {
  return [
    check(
      "name",
      "Name must contain only letters or numbers and have more than 3 characters"
    )
      .isAlpha()
      .isLength({ min: 3 }),
    check("manufacturer")
      .isAlphanumeric()
      .withMessage("Manufacturer must contain only letters or numbers")
      .isLength({ min: 3 })
      .withMessage("Manufacturer must have more than 3 characters"),
    check("description")
      .isAlphanumeric()
      .withMessage("Description must contain only letters or numbers")
      .isLength({ min: 3 })
      .withMessage("Description must have more than 3 characters"),
    check("mainPepper")
      .isAlphanumeric()
      .withMessage(
        "Main Pepper Ingredient must contain only letters or numbers"
      )
      .isLength({ min: 3 })
      .withMessage("Main Pepper Ingredient must have more than 3 characters"),
  ];
};

const validate = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  parse,
  userValidationRules,
  sauceValidationRules,
  validate,
};
