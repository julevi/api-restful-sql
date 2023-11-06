const pool = require("../conexao");

const listarTransacao = async (req, res) => {
    try {
        const { rows } = await pool.query('select * from transacoes where usuario_id = $1 ', [req.usuario.id]);
        return res.status(200).json(rows);

    } catch (error) {
        return res.status(500).json({ Mensagem: 'Erro interno do servidor' });

    }
};

const detalharTransacao = async (req, res) => {
    const { id } = req.params;

    try {
        const { rowCount, rows } = await pool.query('select * from transacoes where id = $1 and usuario_id = $2', [id, req.usuario.id]);

        if (rowCount === 0) {
            return res.status(404).json({ Mensagem: 'Não encontrado' });
        }

        return res.status(200).json(rows);

    } catch (error) {

        return res.status(500).json({ Mensagem: 'Erro interno do servidor' });
    }
};

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        if (!tipo || !descricao || !valor || !data || !categoria_id) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
        }

        if (tipo !== "entrada" && tipo !== "saida") {
            return res.status(400).json({ mensagem: "O tipo deve ser 'entrada' ou 'saida'." });
        }

        const categoria = await pool.query('SELECT * FROM categorias WHERE id = $1', [categoria_id]);
        if (categoria.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Categoria inválida.' });
        }

        const result = await pool.query(
            "INSERT INTO transacoes (descricao, valor, data, categoria_id, tipo, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [descricao, valor, data, categoria_id, tipo, req.usuario.id]
        );

        const novaTransacao = result.rows[0];

        return res.status(201).json(novaTransacao);
    } catch (error) {
        console.error('Erro ao cadastrar transação:', error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id } = req.params
    const { rowCount } = await pool.query('select * from transacoes where id = $1 and usuario_id = $2', [id, req.usuario.id]);

    if (!tipo || !descricao || !valor || !data || !categoria_id) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }

    if (rowCount == 0) {
        return res.status(404).json({ Mensagem: 'Transação não encontrada' });
    }

    const categoria = await pool.query('SELECT * FROM categorias WHERE id = $1', [categoria_id]);

    if (categoria.rowCount < 1) {
        return res.status(404).json({ mensagem: 'Categoria inválida.' });
    }

    if (tipo !== "entrada" && tipo !== "saida") {
        return res.status(400).json({ mensagem: "O tipo deve ser 'entrada' ou 'saida'." });
    }

    try {

        await pool.query('UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 WHERE id = $6',
            [descricao, valor, data, categoria_id, tipo, id]);

        return res.status(200).json();

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const excluirTransacao = async (req, res) => {
    const { id } = req.params
    const { rowCount } = await pool.query('select * from transacoes where id = $1 and usuario_id = $2', [id, req.usuario.id]);

    if (rowCount == 0) {
        return res.status(404).json({ Mensagem: 'Transação não encontrada' });
    }

    try {
        await pool.query('DELETE FROM transacoes WHERE id = $1', [id])
        return res.status(200).json();
    } catch (error) {
        console.log('Erro ao atualizar usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const obterExtrato = async (req, res) => {
    try {
        const userId = req.usuario.id;

        const { rowCount } = await pool.query('SELECT * FROM transacoes WHERE usuario_id = $1', [userId]);

        if (rowCount === 0) {
            return res.status(200).json({
                entrada: 0,
                saida: 0,
            });
        }

        const resultadoEntrada = await pool.query(
            'SELECT COALESCE(SUM(valor), 0) AS somaEntrada FROM transacoes WHERE usuario_id = $1 AND tipo = $2',
            [userId, 'entrada']
        );

        const resultadoSaida = await pool.query(
            'SELECT COALESCE(SUM(valor), 0) AS somaSaida FROM transacoes WHERE usuario_id = $1 AND tipo = $2',
            [userId, 'saida']
        );

        const somaEntrada = resultadoEntrada.rows[0].somaentrada;
        const somaSaida = resultadoSaida.rows[0].somasaida;

        res.status(200).json({
            entrada: somaEntrada,
            saida: somaSaida,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    listarTransacao,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    excluirTransacao,
    obterExtrato
};