// run this with npm run seed
// seed any test data (JSON files) found in the './seed'

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import products from './seed/products.json' assert { type: 'json' };

async function main() {
    await seedProducts();
}

async function seedProducts() {
    console.log(`discovered ${products.length} products to seed`);
    for (const product of products) {
        try {
            await prisma.product.create({
                data: { ...product }
            });
        } catch (error) {
            console.log();
            console.error('❌ error while seeding,', error);
            console.log();
        }
    }
}

console.log();
console.log('--------------------');
console.log('🌱 beginning seeding process');
console.log('--------------------');

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log();
        console.log('--------------------');
        console.log(' finished seeding process');
        console.log('--------------------');
        console.log();
    })
    .catch(async error => {
        console.log();
        console.error('❌ error while finalising seeding,', error);
        console.log();
        await prisma.$disconnect();
        process.exit(1);
    });
