import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';


export default class ValidateAuthRoutes {
    static signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const schema: ObjectSchema<any> = Joi.object({
                fullName: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                confirmPassword: Joi.string().required(),
            });
            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(400).json({
                    status: false,
                    message: error.message,
                });
            }

            return next();
        } catch (err) {
            next(err);
        }
    }

    static signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const schema: ObjectSchema<any> = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            });
            console.log(req.body)
            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(400).json({
                    status: false,
                    message: error.message,
                });
            }

            return next();
        } catch (err) {
            next(err);
        }
    }

    static forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const schema: ObjectSchema<any> = Joi.object({
                email: Joi.string().email().required(),
            });
            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(400).json({
                    status: false,
                    message: error.message,
                });
            }

            return next();
        } catch (err) {
            next(err);
        }
    }
}