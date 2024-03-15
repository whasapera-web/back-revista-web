const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const db = require("../database/models");
const jwt = require("jsonwebtoken");

const userController = {
    userLog: async (req, res) => {
        try {
            const resultValidation = validationResult(req);
            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.mapped(),
                    msg: "Errores de formulario",
                });
            }

            const user = await db.User.findOne({
                where: { email: req.body.email },
            });

            if (!user) {
                return res.status(401).json({
                    status: 401,
                    error: "Credenciales inválidas"
                });
            }

            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    status: 401,
                    error: "Credenciales inválidas"
                });
            }

            const token = jwt.sign({ email: user.email, rol: user.rol }, "the-secret-in-code");

            res.status(200).json({
                status: 200,
                data: token,
                msg: "Inicio de sesión completo",
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: "Error interno del servidor al intentar iniciar sesión",
            });
        }
    },
    userReg: async (req, res) => {
        try {
            const resultValidation = validationResult(req);

            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    msg: "Errores en el formulario",
                });
            }

            const existingUser = await db.User.findOne({
                where: { email: req.body.email },
            });
            if (existingUser) {
                return res.status(400).json({
                    status: 400,
                    errors: { email: { msg: "Este correo ya está registrado" } },
                });
            }

            const newUser = {
                email: req.body.email,
                rol: "admin",
                password: bcrypt.hashSync(req.body.password, 10),
            };

            await db.User.create(newUser);

            res.status(201).json({
                status: 201,
                msg: "Usuario creado exitosamente",
            });
        } catch (error) {
            console.log(err)
            return res.status(500).json({
                status: 500,
                error: 'Error interno del servidor al crear un nuevo usuario',
            });
        }
    }
};

module.exports = userController;
