const express = require('express')
const { cadastrarUsuario, loginUsuario, detalharUsuario, atualizarUsuario } = require('../controllers/usuarios.js')
const { verificarUsuarioLogado } = require('../intermediarios/autenticacao.js');

const rotas = express()

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginUsuario);

rotas.use(verificarUsuarioLogado);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', atualizarUsuario);

module.exports = rotas