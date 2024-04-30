// test/services/hello.service.test.ts
import { HelloService } from '../src/services/hello.service';

describe('HelloService', () => {
    it('getMessage should return "Hello, World!"', () => {
        expect(HelloService.getMessage()).toBe('Hello, World!');
    });
});
