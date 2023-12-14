import { Container} from 'typedi';

import winston from 'winston';

import config from '../../../config';

import IRoleRepo from '../../services/IRepos/IRoleRepo';

const authorizeRole = (roles: string[]) => {
    return async (req, res, next) => {
        const Logger = Container.get('logger') as winston.Logger;

        const roleRepo = Container.get(config.repos.role.name) as IRoleRepo;

        try {
            // Check if req.user has the required role
            if (!req.user || !req.user.role || !req.user.role.name) {
                return res.status(403).json({ message: 'Forbidden: User not authenticated' });
            }

            const role = await roleRepo.findByDomainId(req.user.roleId);

            if (roles.includes(role.name)) {
                next();
            } else {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
            }
        } catch (error) {
            Logger.error('🔥 Error authorizing roles: %o', error);
            return next(error);
        }
    };
};

export default authorizeRole;