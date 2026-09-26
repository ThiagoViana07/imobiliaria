# Imobiliária API

API REST para gestão de operações imobiliárias: clientes, empreendimentos, unidades, vendas, pagamentos e vendedores. Construída em **Node.js + Express** com **MongoDB/Mongoose**.

## Stack

| Camada | Tecnologia |
|---|---|
| Runtime | Node.js (ESM — `"type": "module"`) |
| Framework HTTP | Express `^5.2.1` |
| ODM | Mongoose `^9.6.3` |
| Banco de dados | MongoDB |
| CORS | `cors` `^2.8.6` |
| Variáveis de ambiente | `dotenv` `^17.4.2` |
| Lint/Format | ESLint + Prettier |
| Dev runner | Nodemon |

## Pré-requisitos

- Node.js instalado (recomendado LTS ≥ 20)
- Uma instância MongoDB acessível (local, Docker ou Atlas)

## Como iniciar o projeto

```bash
# 1. Clonar o repositório
git clone https://github.com/ThiagoViana07/imobiliaria.git
cd imobiliaria

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente (ver seção abaixo)
cp .env.example .env   # crie o .env.example se ainda não existir
# edite o .env com os valores corretos

# 4. Rodar em modo desenvolvimento (com watch/reload via nodemon)
npm run dev

# 5. Rodar em modo produção
npm start
```

O servidor sobe por padrão em `http://localhost:8000` (ou na porta definida em `PORT`).

## Configuração do `.env`

O projeto carrega variáveis de ambiente via `dotenv` (chamado em `src/config/dbConnect.js`). Crie um arquivo `.env` na raiz do projeto com as seguintes chaves:

| Variável | Obrigatória | Descrição | Exemplo |
|---|---|---|---|
| `MONGODB_URI` | ✅ Sim | String de conexão do MongoDB. Sem ela, `mongoose.connect()` falha. | `mongodb://usuario:senha@localhost:27017/imobiliaria` ou uma URI do MongoDB Atlas |
| `PORT` | ❌ Não | Porta em que o Express escuta. Se omitida, usa `8000` como fallback (`app.js`). | `8000` |

**Exemplo de `.env`:**

```env
MONGODB_URI=mongodb://localhost:27017/imobiliaria
PORT=8000
```

> ⚠️ **Segurança:** o repositório já ignora `.env` e variantes (`.env.local`, `.env.production.local`, etc.) via `.gitignore` — nunca commite credenciais reais. Recomenda-se manter um `.env.example` versionado (sem valores sensíveis) para documentar as chaves esperadas, já que ele não existe atualmente no repositório.

## Estrutura do projeto

```
imobiliaria/
├── app.js                      # Bootstrap do Express, conexão com o banco e carregamento dinâmico de rotas
├── src/
│   ├── config/
│   │   └── dbConnect.js        # Configuração da conexão Mongoose (lê MONGODB_URI)
│   ├── routes/                 # Definição dos endpoints (um arquivo por recurso)
│   ├── controllers/            # Camada de controle (recebe req/res, delega para services)
│   ├── services/                # Regras de negócio e acesso a dados
│   ├── models/                  # Schemas Mongoose
│   └── validations/             # Validações de payload (CPF, e-mail, telefone, CEP, etc.)
└── data/                        # Massa de dados / fixtures em JSON
```

**Observação sobre carregamento de rotas:** `app.js` lê dinamicamente todos os arquivos em `src/routes/`, monta o nome da rota a partir do nome do arquivo (removendo o sufixo `.route.js`) e registra `app.use('/nomeDaRota', ...)`. Ou seja, novas rotas adicionadas em `src/routes/` são registradas automaticamente, sem precisar editar `app.js`.

## Endpoints disponíveis

| Recurso | Base path | Métodos |
|---|---|---|
| Clientes | `/client` | `GET /`, `GET /:id`, `GET /cpf/:cpf`, `POST /`, `PUT /:id`, `DELETE /:id` |
| Empreendimentos | `/empreendimentos` | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Unidades | `/unidades` | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Vendas | `/venda` | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Pagamentos | `/pagamento` | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Vendedores | `/vendedor` | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia com Nodemon (reload automático) |
| `npm start` | Inicia em modo produção (`node app.js`) |

