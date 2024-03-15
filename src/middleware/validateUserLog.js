const { body } = require("express-validator");

const validateUserLog = [
    // Validación del correo electrónico
    body("email").isEmail().withMessage("El correo electrónico es inválido"),

    // Validación de la contraseña
    body("password").notEmpty().withMessage("La contraseña es requerida"),
];

const validateUserReg = [
    // Validación del correo electrónico
    body("email").isEmail().withMessage("El correo electrónico es inválido"),

    // Validación de la contraseña
    body("password").notEmpty().withMessage("La contraseña es requerida"),
];

module.exports = { validateUserLog, validateUserReg };
