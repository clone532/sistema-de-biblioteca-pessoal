import { Request, Response } from "express";
import { User, getByEmail, getByEmailAndPassword, insert } from "../models/user";

export function show_login(req: Request, res: Response) {
    res.render('login', { response: null });
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

export async function login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.render('login', {
            response: {
                type: 'error',
                value: 'Preencha os campos corretamente.'    
            }
        });
    }

    const user = await getByEmailAndPassword(email, senha);

    if (!user) {
        return res.render('login', {
            response: {
                type: 'error',
                value: 'Email ou senha incorretos.'   
            }
        });
    }
    (req.session as any).user = {
        nome: user.nome,
        email: user.email,
        id: user.id
    }
    res.redirect('/adm');
}