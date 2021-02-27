import { Router } from 'express';
import { SendMailcontroller } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController} from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();

const sendMailController = new SendMailcontroller();

router.post("/users", userController.create);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", sendMailController.execute);

export { router } ;
