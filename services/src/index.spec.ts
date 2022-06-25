import { handler } from './index';

test('handler should return 42', async () => {
	expect(await handler()).toBe(42);
});
