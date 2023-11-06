const pool = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt');

async function cadastrarUsuario(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
  }

  const validadeEmail = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );

  if (validadeEmail.rows.length > 0) {
    return res.status(400).json({ mensagem: "E-mail já cadastrado. Escolha outro e-mail." });
  }

  try {

    const senhaCriptografada = await bcrypt.hash(senha, 6);

    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email",
      [nome, email, senhaCriptografada]
    );

    const novoUsuario = result.rows[0];

    return res.status(201).json(novoUsuario);


  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body

  const usuario = await pool.query(
    'select * from usuarios where email = $1',
    [email]
  )

  //Verifica se não existe email
  if (usuario.rowCount < 1) {
    return res.status(404).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
  }

  try {

    const senhaCorreta = await bcrypt.compare(senha, usuario.rows[0].senha)

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
    }

    const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, {
      expiresIn: '8h',
    })

    const { senha: _, ...usuarioLogado } = usuario.rows[0]

    return res.json({ usuario: usuarioLogado, token })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
};

const detalharUsuario = async (req, res) => {
  try {
    const { id, nome, email } = req.usuario;
    return res.status(200).json({ id, nome, email });

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const usuarioConectado = req.usuario;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
  }

  try {
    const validadeEmail = await pool.query('SELECT email FROM usuarios WHERE email = $1', [email]);

    if (validadeEmail.rows.length > 0 && validadeEmail.rows[0].email !== usuarioConectado.email) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado. Escolha outro e-mail." });
    }

    await pool.query('UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4', [nome, email, senha, usuarioConectado.id]);

    return res.status(204).json();

  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  detalharUsuario,
  atualizarUsuario
};
