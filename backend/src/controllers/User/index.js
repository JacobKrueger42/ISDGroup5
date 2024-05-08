import { userAuthRepository } from '#services';
import { requireAuth } from '#middleware';
import HttpStatus from 'http-status-codes';
import { requireRole } from '#middleware';

export async function get(req, res, next) {
    await requireAuth(req, res, next, async () => {
        try {
            const { getUserAsync } = userAuthRepository();
            const user = await getUserAsync(req.session.userId);
            res.json({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                displayName: `${user.firstName} ${user.lastName}`,
                id: user.id,
                phone: user.phone,
                role: user.role
            });
        } catch (error) {
            next(error);
        }
    });
}

export async function update(req, res, next) {
    console.log('At update: ');
    try {
        await requireRole(
            req,
            res,
            next,
            async () => {
                const { firstName, lastName, email, phone } = req.body;
                console.log('First name is: ' + firstName);
                console.log('Last name is: ' + lastName);
                console.log('Email is: ' + email);
                console.log('Phone is: ' + phone);
                const { updateUserAsync } = userAuthRepository();
                await updateUserAsync(
                    req.params.id,
                    firstName,
                    lastName,
                    email,
                    phone
                );

                res.send('OK');
            },
            ['CUSTOMER', 'STAFF', 'ADMIN']
        );
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            path: req.path,
            detailed_error_message: error.message,
            message: 'Cant update account with given information'
        });
    }
}

export async function remove(req, res, next) {
    console.log('At remove ');
    try {
        await requireRole(
            req,
            res,
            next,
            async () => {
                const { removeUserAsync } = userAuthRepository();
                await removeUserAsync(req.params.id);

                console.log('Removed ');
                res.send('OK');
            },
            ['CUSTOMER', 'STAFF', 'ADMIN']
        );
    } catch (error) {
        next(error);
    }
}
