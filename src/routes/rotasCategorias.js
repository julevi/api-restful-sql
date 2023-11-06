const express = require('express')
const { listarCategorias } = require('../controllers/categorias')

const rotas = express()

rotas.get('/categoria', listarCategorias)

module.exports = rotas