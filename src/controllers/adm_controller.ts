import { Request, Response } from "express";

export function show_adm(req: Request, res: Response) {
    const { user } = req.session as any;
    res.render('dashboard',  { user });
}