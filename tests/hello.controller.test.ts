// tests/hello.controller.test.ts
import { Request, Response } from 'express';
import { HelloController } from '../src/controllers/hello.controller';

describe('HelloController', () => {
    it('should return "Hello, World!" message', () => {
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
            json: jest.fn()
        };
        HelloController.sayHello(req as Request, res as Response);
        expect(res.json).toHaveBeenCalledWith({ message: 'Hello, World!' });
    });
});
