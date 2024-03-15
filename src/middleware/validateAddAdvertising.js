const { body } = require("express-validator");

const validateAddAdvertising = [
    // Validación de la imagen
    body("image").custom((value, { req }) => {
        if (!req.file || !req.file.filename) {
            throw new Error("La imagen es requerida");
        }
        return true;
    }),

    // Validación del category_id
    body("category_id").notEmpty().withMessage("El category_id es requerido"),
];

module.exports = validateAddAdvertising;
