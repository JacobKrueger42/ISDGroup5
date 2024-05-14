import { default as prisma } from '../services/DatabaseClient.js';
import { default as emailNotifier } from '../services/EmailNotifier.js';

import { default as userAuthRepository } from '../services/UserAuthRepository.js';
import { default as productRepository } from '../services/ProductRepository.js';
import { default as catalogueRepository } from '../services/CatalogueRepository.js';

import { default as checkoutService } from './CheckoutService.js';

export {
    prisma,
    userAuthRepository,
    productRepository,
    catalogueRepository,
    emailNotifier,
    checkoutService
};
