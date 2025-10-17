import { Request, Response } from "express";

export function show_login(req: Request, res: Response) {
    res.render('login');
}

export function register(req: Request, res: Response) {
    const { nome, email, senha } = req.body;
    res.render('login');
}