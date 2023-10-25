import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import passage from './routes/passageRoute';
import elevator from './routes/elevatorRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	building(app);
	floor(app);
	passage(app);
	elevator(app)
	
	return app
}