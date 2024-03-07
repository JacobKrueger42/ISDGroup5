import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function count(_, res) {
	const counter = (await prisma.counter.findMany()) || [];
	const total = counter.reduce((partial, c) => partial + c.value, 0);
	res.json(total);
}

export async function update(req, res) {
	const { count } = req.body;

	try {
		await prisma.counter.create({
			data: { value: parseInt(count) }
		});
	} catch (error) {
		console.log('an error occured while updating the count,\n', error);
	}

	res.send('OK');
}
