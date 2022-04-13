import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { User } from '../models/User';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthController {
    async authenticate(request: Request, response:Response) {
        const repository = getRepository(User)
        const {email, password} = request.body;

        const user = await repository.findOne({where: { email }});

        if(!user) {
            return response.sendStatus(401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) {
            return response.sendStatus(401)
        }

        const token = jwt.sign({id: user.id}, 'secret', {expiresIn: '1d'})

        delete user.password

        response.json({
            user,
            token
        })
    }
}

export default new AuthController();