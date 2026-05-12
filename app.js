const express = require('express');
const rotaVenda = require("./src/routes/venda.route");
const rotaPagamento = require("./src/routes/pagamento.route");


const app = express();
app.use(express.json());
const port = 8000;


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/vendas', rotaVenda);

app.use('/pagamentos', rotaPagamento);


app.listen(port, () => {
    console.log(`Escutando a porta ${port}`);
})