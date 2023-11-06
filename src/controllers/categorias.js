const pool = require("../conexao");

const listarCategorias = async (req, res) => {
    try {
        const resultadoConsulta = await pool.query('SELECT id, descricao FROM categorias');
        const categorias = resultadoConsulta.rows;

        return res.status(200).json(categorias);
    } catch (error) {
        console.error('Erro ao listar categorias:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    listarCategorias
  };