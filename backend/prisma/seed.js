// run this with npm run seed
// seed any test data (JSON files) found in the './seed'

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import products from './seed/products.json' assert { type: 'json' };
import users from './seed/users.json' assert { type: 'json' };
import accesslogs from './seed/accesslogs.json' assert { type: 'json' };


async function main() {
    await seedUsers();
    await seedProducts();
    await seedCatalogueEntries();
    await seedAccessLogs();
}

async function seedUsers() {
    // all demo user's seed with password ABC123
    console.log(`discovered ${users.length} users to seed`);

    try {
        for (const user of users) {
            await prisma.user.create({
                data: { ...user }
            });
        }
    } catch (error) {
        console.log();
        console.error('❌ error while seeding,', error);
        console.log();
    }
}

async function seedProducts() {
    console.log(`discovered ${products.length} products to seed`);

    try {
        for (const product of products) {
            await prisma.product.create({
                data: { ...product }
            });
        }
    } catch (error) {
        console.log();
        console.error('❌ error while seeding,', error);
        console.log();
    }
}

async function seedAccessLogs() {
    console.log(`discovered ${accesslogs.length} access logs to seed`);

    try {
        for (const accesslog of accesslogs) {
            await prisma.userAccessLog.create({
                data: { ...accesslog }
            });
        }

    } catch (error) {
        console.log();
        console.error('❌ error while seeding,', error);
        console.log();
    }
}


const catalogueEntryCategories = [
    'TOOLS AND TEST EQUIPMENT',
    'SOUND AND VIDEO',
    'CABLES AND CONNECTORS',
    'COMPONENTS AND ELECTROMECHANICAL',
    'POWER AND BATTERIES',
    'HOBBIES AND GADGETS',
    '3D PRINTING',
    'SECURITY AND SURVEILLANCE',
    'COMPUTING AND COMMUNICATION',
    'KITS, SCIENCE AND LEARNING',
    'OUTDOORS AND AUTOMOTIVE'
];

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const catalogueEntryCategoryRoulette = () =>
    catalogueEntryCategories.sort(() => 0.5 - Math.random())[0];

async function seedCatalogueEntries() {
    // it is assumed this runs after products have been seeded
    console.log(
        `discovered ${products.length} products to seed - will attempt to create catalogue entries for each these`
    );

    // look up the product IDs to link the new data
    let productsFromDb = [];
    try {
        productsFromDb = await prisma.product.findMany({
            select: {
                id: true,
                uniqueProductCode: true
            }
        });
    } catch (error) {
        console.log();
        console.error('❌ error while querying dependent seed data,', error);
        console.log();
    }

    try {
        for (const product of productsFromDb) {
            await prisma.catalogueEntry.create({
                data: {
                    price: randInt(3, 200),
                    stockQuantity: randInt(3, 27),
                    productCategory: catalogueEntryCategoryRoulette(),
                    uniqueProductCode: product.uniqueProductCode,
                    productId: product.id,
                    isArchived: false
                }
            });
        }
    } catch (error) {
        console.log();
        console.error('❌ error while seeding,', error);
        console.log();
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
    .catch(async reason => {
        console.log();
        console.error('❌ error while finalising seeding,', reason);
        console.log();
        await prisma.$disconnect();
        process.exit(1);
    });
