import { Container} from 'typedi';

import winston from 'winston';

import config from '../../../config';

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';


const authorizeRole = (roles: string[]) => {
    return async (req, res, next) => {
        const Logger = Container.get('logger') as winston.Logger;

        try {
            // Check if req.user has the required role
            if (!req.user || !req.user.roleId) {
                return res.status(403).json({ message: 'Forbidden: User not authenticated' });
            }

            const options: AxiosRequestConfig = {
                withCredentials: true
            };
          
            //fetch role with the id from the request from .NET MDU module
            axios.get('http://localhost:5095/api/Roles/' + req.user.roleId, options)
                .then((response: AxiosResponse) => {

                    if (roles.includes(response.data.name)) {
                        next();
                    } else {
                        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
                    }
                    
                })
                .catch((error: AxiosError) => {
                  console.error('Get error:', error.message);
                  next( new Error("Error getting roles from MDU") );
                });

        } catch (error) {
            Logger.error('🔥 Error authorizing roles: %o', error);
            return next(error);
        }
    };
};

export default authorizeRole;