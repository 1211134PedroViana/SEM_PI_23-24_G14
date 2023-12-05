import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import passage from './routes/passageRoute';
import room from './routes/roomRoute';
import robot from './routes/robotRoute';
import robotType from './routes/robotTypeRoute';
import taskType from './routes/taskTypeRoute';
import elevator from './routes/elevatorRoute';
import floorMapperz from './routes/floorMapperzRoute';
import systemUserRoute from './routes/systemUserRoute';

export default () => {
  const app = Router();

  auth(app);
  user(app);
  role(app);
  building(app);
  floor(app);
  passage(app);
  room(app);
  robot(app);
  robotType(app);
  taskType(app);
  elevator(app);
  floorMapperz(app);
  systemUserRoute(app);

  return app;
};
