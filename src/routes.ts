import { Router } from 'express';
import { AnswerControlller } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailcontroller } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController} from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();

const sendMailController = new SendMailcontroller();

const answerController = new AnswerControlller();

const npsController = new NpsController();

router.post("/users", userController.create);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", sendMailController.execute);

router.get("/answers/:value", answerController.execute);

router.get("/nps/:survey_id", npsController.execute);

export { router } ;
