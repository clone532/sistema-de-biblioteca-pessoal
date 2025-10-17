import express from 'express';

const app = express();

app.set('view engine', 'ejs');

app.set('views', './src/views');

app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.render('index', { message: 'Hello' });
});

app.get('/login', function (req, res) {
    res.render('login', { message: 'Hello' });
});

app.listen(3333, () => {
    console.log('Servidor rodando no endereço http://localhost:3333');
});