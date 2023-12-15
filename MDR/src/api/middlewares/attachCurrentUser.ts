import { Container} from 'typedi';

import winston from 'winston';

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  const Logger = Container.get('logger') as winston.Logger;
  try {

    if( !req.token || req.token == undefined )
      next( new Error("Token inexistente ou inválido ") );

    const headers = {
      withCredentials: true,
      Authorization: `Bearer ${req.token}`
    };

    axios.get('http://localhost:5095/api/Auth/session/', {headers})
      .then((response: AxiosResponse) => {
        if(response.data != null) {
          req.user = response.data;
          next();
        }else{
          next( new Error("fuck off") );
        }
      })
      .catch((error: AxiosError) => {
        console.error('Post error:', error.message);
        next( new Error("Token não corresponde a qualquer utilizador do sistema") );
      });

  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;
