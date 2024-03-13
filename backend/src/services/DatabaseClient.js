// ensure a single instance of the database client is re-used to limit the number
// of database connections consuming resourcee. We don't have hot-reload, so there
// is no need to store a global dev-variable
// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#re-using-a-single-prismaclient-instance

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
