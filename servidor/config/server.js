/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({
	extended: true
})); //Aceita formato html
app.use(bodyParser.json()); //Aceita formato json

/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('/app/routes')
	.then('/app/models')
	.then('/app/controllers')
	.into(app);

//Middleware - Tratamento de status
app.use(function (req, res, next) {
	// res.status(400).send('Página não encontrada!');
	res.status(400).render('errors/404');
	next();
});

app.use(function (err, req, res, next) {
	res.status(500).render('errors/500');
	next();
});


//Descomentar para executar no vscode
// app.listen(3000, function () {
// 	console.log('Servidor online');
// });

/* exportar o objeto app */
module.exports = app;