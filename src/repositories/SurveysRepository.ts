import { Entity, EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

@EntityRepository(Survey)
class SurveysController extends Repository<Survey> {}

export { SurveysController };