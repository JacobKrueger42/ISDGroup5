// the methods defined in this file must match one that the route configurer knowns
// otherwise your route will NOT be automatically configured
// one of: [ list, count, create, detail, update, remove ] is valid

import { prisma } from '#services';

export async function count(_, res) {
	const counter = (await prisma.counter.findMany()) || [];
	const total = counter.reduce((partial, c) => partial + c.value, 0);
	res.json(total);
}

export async function update(req, res, next) {
	const { count } = req.body;

	try {
		await prisma.counter.create({
			data: { value: parseInt(count) }
		});
		res.send('OK');
	} catch (error) {
		next(error);
	}
}
