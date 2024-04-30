import { Request, Response } from 'express';
import { HelloService } from '../services/hello.service';

export class HelloController {
    static sayHello(req: Request, res: Response) {
        const message = HelloService.getMessage();
        res.json({ message });
    }
}
