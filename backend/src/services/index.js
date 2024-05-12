import { default as prisma } from '../services/DatabaseClient.js';
import { default as userAuthRepository } from '../services/UserAuthRepository.js';
import { default as productRepository } from '../services/ProductRepository.js';
import { default as catalogueRepository } from '../services/CatalogueRepository.js';

export { prisma, userAuthRepository, productRepository, catalogueRepository };
