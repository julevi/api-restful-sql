const express = require('express')
const { listarTransacao, detalharTransacao, cadastrarTransacao, atualizarTransacao, excluirTransacao, obterExtrato } = require('../controllers/transacoes')
const { verificarUsuarioLogado } = require('../intermediarios/autenticacao.js');

const rotas = express()

rotas.get('/transacao/extrato', verificarUsuarioLogado, obterExtrato)
rotas.get('/transacao', verificarUsuarioLogado, listarTransacao)
rotas.get('/transacao/:id', verificarUsuarioLogado, detalharTransacao)
rotas.post('/transacao', verificarUsuarioLogado, cadastrarTransacao)
rotas.put('/transacao/:id', verificarUsuarioLogado, atualizarTransacao)
rotas.delete('/transacao/:id', verificarUsuarioLogado, excluirTransacao)


module.exports = rotas