export function authMiddleware(req: any, res: any, next: any) {
    if (req.session?.user) { //se o usuario estiver logado
        return next(); //continua a request
    }
    return res.redirect('/user/login'); //senão volta para o login
}