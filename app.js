const express = require('express');
const rotaVenda = require("./routes/src/venda-route");
const rotaPagamento = require("./routes/src/pagamento-route");


const app = express();
app.use(express.json());
const port = 8000;


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/vendas', rotaVenda);

app.use('/favoritos', rotaPagamento);


app.listen(port, () => {
    console.log(`Escutando a porta ${port}`);
})