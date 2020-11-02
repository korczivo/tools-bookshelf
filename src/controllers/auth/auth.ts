import express from 'express';
import {
    createUserService,
    updateUserService
} from "../../services/auth";

const authController = express.Router();

authController.post('/auth/register', async (req, res) => {
    await createUserService(req.body)
    await updateUserService(req.body)
});

export { authController };
