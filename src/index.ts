import express from 'express';
import { userRoutes } from './routes/user_routes';
import { admRoutes } from './routes/adm _routes';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs');

app.set('views', './src/views');

app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.redirect('/user/login')
});

app.use(session({
    secret: 'aula-pw2', //chave usada para assinar o cookie
    resave: false, //evita salvar a sessão se nada mudou
    saveUninitialized: true, //salva as sessões não inicializadas
    cookie: { maxAge: 1 * 1000 * 60 * 60 } //uma hora de tempo de expiração
}));
app.use(userRoutes);
app.use(admRoutes);

app.listen(3333, () => {
    console.log('Servidor rodando no endereço http://localhost:3333');
});