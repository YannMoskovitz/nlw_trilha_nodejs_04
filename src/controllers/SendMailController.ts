import { Request, Response } from "express";
import { resolve } from 'path';
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { User } from "../models/User";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";




class SendMailcontroller {
    
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveyUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user =  await usersRepository.findOne({ email });

        if(!user) {
            throw new AppError("User does not exists");
        }
        const survey = await surveysRepository.findOne({
            id: survey_id,
        });

        if (!survey) {
            throw new AppError("survey does not exists");
        }


        const npsPath = resolve(__dirname, "../", "views", "emails", "npsMail.hbs");

        const surveyUserAlreadyExists = await surveyUsersRepository.findOne({
            where: { user_id: user.id, value: null },
            relations: ["user", "survey"],
        });


        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        };

        if(surveyUserAlreadyExists){
            variables.id = surveyUserAlreadyExists.id
            await SendMailService.execute(email, survey.title, variables, npsPath)

            return response.json(surveyUserAlreadyExists)
        };

        // salvar as info na tabela surveyUser
        const surveyUser = surveyUsersRepository.create({
            user_id: user.id,
            survey_id
        });


        await surveyUsersRepository.save(surveyUser);
        // Enviar e-mail para o usuário
        variables.id = surveyUser.id;

        await SendMailService.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export { SendMailcontroller }