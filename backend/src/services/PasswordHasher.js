import { isNullOrEmpty } from '../services/StringUtils.js';
import crypto from 'crypto';

export default function PasswordHasher() {
    const hashMethod = 'md5';

    function hashPassword(password) {
        if (isNullOrEmpty(password))
            throw new Error('must have a password to hash');

        return crypto.createHash(hashMethod).update(password).digest('hex');
    }

    function verifyHashedPassword(providedPassword, existingPasswordHash) {
        // this means the user may have not provided a password
        if (isNullOrEmpty(providedPassword))
            throw new Error(
                'cannot verify a password without a provided password'
            );

        // this would mean we broke the workflow
        if (isNullOrEmpty(existingPasswordHash))
            throw new Error(
                'existing password is non-existant (check the existing password was correctly provided)'
            );

        return (
            crypto
                .createHash(hashMethod)
                .update(providedPassword)
                .digest('hex') === existingPasswordHash
        );
    }

    return {
        hashPassword,
        verifyHashedPassword
    };
}
