const db = require("../database/models");
const { validationResult } = require("express-validator");

const advertisingController = {
    addAdvertising: async (req, res) => {
        try {
            console.log(req.body)
            const resultValidation = validationResult(req);
            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.array(),
                    msg: "Error al registrar publicidad",
                });
            }

            let image = "";

            if (req.file && req.file.filename) {
                image = req.file.filename;
            } else {
                return res.status(400).json({
                    status: 400,
                    errors: [{ msg: "Error, imagen no existe" }],
                    msg: "Error de imagen",
                });
            }

            const newAdvertising = {
                img: image,
                category_id: req.body.category_id,
            };

            await db.Advertising.create(newAdvertising);

            res.status(201).json({
                status: 201,
                msg: "Publicidad creada exitosamente",
            });
        } catch (error) {
            console.error("Error al agregar publicidad:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    obtainAdvertising: async (req, res) => {
        try {
            console.log(req.params);
            const categoryId = req.params.id;
            const advertising = await db.Advertising.findAll({ where: { category_id: categoryId } });
            console.log(advertising);
            res.status(200).json({ message: "Publicidad obtenida exitosamente", data: advertising });
        } catch (error) {
            console.error("Error al obtener publicidad:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    allAdvertising: async (req,res) => {
        try {
            const allAdvertising = await db.Advertising.findAll();
            res.status(200).json({ message: "Publicidades obtenida exitosamente", data: allAdvertising});
        } catch (error) {
            console.error("Error al obtener publicidad:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    deleteAdvertising: async (req, res) => {
        try {
            await db.Advertising.destroy({
                where: { id: req.params.id }
            });
            return res.status(200).json({
                status: 200,
                msg: "Éxito al eliminar",
            })
        } catch (error) {
            console.error("Error al eliminar publicidad:", error);
            return res.status(500).json({
                status: 500,
                msg: "Error interno del servidor"
            });
        }
    },

    addCategory: async (req, res) => {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ msg: "El nombre de la categoría es requerido" });
            }

            const existingCategory = await db.Category.findOne({ where: { name: name } });
            if (existingCategory) {
                return res.status(400).json({ msg: "La categoría ya existe" });
            }

            await db.Category.create({ name: name });

            console.log("Categoría agregada:", name);
            return res.status(201).json({ message: "Categoría agregada exitosamente" });
        } catch (error) {
            console.error("Error al agregar categoría:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    allCategory: async (req, res) => {
        try {
            const categories = await db.Category.findAll();
            if (!categories || categories.length === 0) {
                return res.status(404).json({
                    status: 404,
                    msg: "No hay categorías",
                });
            }
            return res.status(200).json({
                status: 200,
                data: categories,
                msg: "Éxito al solicitar categorías",
            });
        } catch (error) {
            console.error("Error al obtener categorías:", error);
            return res.status(500).json({
                status: 500,
                msg: "Error al obtener categorías",
            });
        }
    }
};

module.exports = advertisingController;
