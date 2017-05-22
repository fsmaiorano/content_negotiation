var http = require('http');

var opcoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        // 'Content-type': 'application/x-www-form-urlencoded'
        'Content-type': 'application/json'
    }
}

// var opcoes = {
//     hostname: 'localhost',
//     port: 3000,
//     path: '/paginaQueNaoExiste',
//     method: 'post',
//     headers: {
//         'Accept': 'application/json',
//         // 'Content-type': 'application/x-www-form-urlencoded'
//         'Content-type': 'application/json'
//     }
// }

// var opcoes = {
//     hostname: 'localhost',
//     port: 3000,
//     path: '/',
//     method: 'get',
//     headers: {
//         'Accept': 'application/json',
//         'Content-type': 'application/json'
//     }
// }

var buffer = [];

//Content-type
var html = 'nome=Fábio'; // x-www-form-urlencoded
var json = {
    nome: "Fábio"
};
var stringJson = JSON.stringify(json);

var req = http.request(opcoes, function (res) {
    //data - existe qd a requisição está em curso,
    //ou quando algo está carregando aos poucos
    res.on('data', function (chunk) {
        buffer.push(chunk);
    });

    //end - disparado qd o carregamento é finalizado
    res.on('end', function (chunk) {
        //Concatena todos os pedaços do buffer
        var response = Buffer.concat(buffer).toString();
        // console.log(response);
        // console.log(res.statusCode);
    });

    //erro - falha na requisição
    res.on('erro', function (erro) {
        console.log(erro);
    });
});
req.write(stringJson); //Pega uma string e anexa no body.
req.end();