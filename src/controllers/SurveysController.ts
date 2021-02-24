import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";




class SurveysController{
    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const surveysRepository = getCustomRepository(Survey)
    }
}
export { SurveysController }