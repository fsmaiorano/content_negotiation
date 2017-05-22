module.exports = function (application) {
	application.get('/', function (req, res) {
		//Se o cliente aceita html, responde html.
		//Se o cliente aceita json, responde json.
		res.format({
			html: function () {
				res.send('Retorno em HTML');
			},

			json: function () {
				var retorno = {
					body: 'Retorno em JSON'
				}
				res.json(retorno);
			}
		});
	});

	application.post('/', function (req, res) {
		var dados = req.body;
		console.log(dados);
	});
}