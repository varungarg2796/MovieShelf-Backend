import express from 'express';
import { HelloController } from '../controllers/hello.controller';

const router = express.Router();

router.get('/hello', HelloController.sayHello);

export default router;
