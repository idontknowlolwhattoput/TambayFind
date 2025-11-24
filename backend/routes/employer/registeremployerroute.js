import express from 'express';
import { RegisterEmployerController } from '../../controller/employer/registeremployercontroller.js';
const router = express.Router();

router.post('/register-employer', RegisterEmployerController);

export default router;