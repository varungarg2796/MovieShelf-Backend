import express from 'express';
import { HelloController } from '../controllers/hello.controller';

const router = express.Router();

router.get('/ping', HelloController.sayHello);

export default router;
