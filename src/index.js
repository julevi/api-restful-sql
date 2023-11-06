const express = require('express');
const rotasCategorias = require('./routes/rotasCategorias');
const rotasTransacoes = require('./routes/rotasTransacoes');
const rotasUsuarios = require('./routes/rotasUsuarios');

const app = express();

app.use(express.json());

app.use(rotasCategorias);
app.use(rotasTransacoes);
app.use(rotasUsuarios);

app.listen(3000);
