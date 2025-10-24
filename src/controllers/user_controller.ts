import { Request, Response } from "express";
import { User, getByEmail, insert } from "../models/user";

export function show_login(req: Request, res: Response) {
    res.render('login');
}

export async function register(req: Request, res: Response) {
    const { nome, email, senha } = req.body;
    res.render('login');

    if (!nome || !email || !senha) {
        return res.render('login', {
            response: {
                type: 'error',
                value: 'Preencha os campos corretamente.'    
            }
        });
    }
    const userFound = await getByEmail(email);

    if (userFound) {
        return res.render('login', {
            response: {
                type: 'error',
                value: 'E-mail já cadastrado.'    
            }
        });
    }

    const user: User = {
        nome,
        email,
        senha
    }

    await insert(user);

    return res.render('login', {
        response: {
            type: 'success',
            value: 'Usuário cadastrado com sucesso!'    
        }
    });
}