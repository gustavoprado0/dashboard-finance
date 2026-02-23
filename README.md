# 📊 Dashboard Financeiro

Dashboard financeiro completo com Next.js, Prisma e PostgreSQL para visualização de transações, faturamento, meios de pagamento e métricas de negócio em tempo real.

---

## 🚀 Tecnologias

- **Next.js 14** — App Router
- **TypeScript**
- **Prisma ORM** — PostgreSQL
- **Tailwind CSS**
- **Recharts** — gráficos
- **Lucide React** — ícones

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   └── api/
│       ├── dashboard/          # GET /api/dashboard (payload completo)
│       ├── transactions/       # POST criar transação
│       ├── financial-reserve/  # POST criar reserva financeira
│       └── seed/               # POST popular / DELETE limpar dados
├── features/
│   └── dashboard/
│       ├── components/         # Componentes visuais
│       ├── hooks/              # useDashboard
│       ├── services/           # DashboardService (queries Prisma)
│       └── types/              # Interfaces TypeScript
└── lib/
    └── prisma.ts               # Singleton do Prisma Client
```

---

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/dashboard-finance.git
cd dashboard-finance/my-app
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/financeiro_db"
```

### 4. Crie as tabelas no banco

```bash
npx prisma db push
```

### 5. Gere o Prisma Client

```bash
npx prisma generate
```

### 6. Inicie o servidor

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Modelos do Banco de Dados

### Transaction

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String | ID único |
| `amount` | Float | Valor da transação |
| `status` | Enum | Status da transação |
| `paymentMethod` | Enum | Meio de pagamento |
| `createdAt` | DateTime | Data de criação |

**Status disponíveis:** `PENDING`, `APPROVED`, `PAID`, `REFUNDED`, `PRE_CHARGEBACK`, `CHARGEBACK`, `FAILED`

**Meios de pagamento:** `pix`, `credit_card`, `boleto`

### FinancialReserve

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String | ID único |
| `amount` | Float | Valor da reserva |
| `createdAt` | DateTime | Data de criação |

---

## 🔌 Endpoints da API

### Dashboard

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/dashboard` | Payload completo |
| `GET` | `/api/dashboard/metrics` | KPI cards |
| `GET` | `/api/dashboard/billing` | Faturamento mensal (12 meses) |
| `GET` | `/api/dashboard/financial` | Gráfico financeiro diário |
| `GET` | `/api/dashboard/payment` | Meios de pagamento |

Todos os endpoints aceitam os query params:

```
?startDate=2024-01-01&endDate=2024-12-31
```

### Transações

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/transactions` | Criar transação |

**Body:**
```json
{
  "amount": 1500.00,
  "status": "APPROVED",
  "paymentMethod": "pix"
}
```

### Reserva Financeira

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/financial-reserve` | Criar reserva |

**Body:**
```json
{
  "amount": 5000.00
}
```

### Seed (apenas desenvolvimento)

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/seed` | Popular banco com 310 registros de teste |
| `DELETE` | `/api/seed` | Apagar todos os dados |

---

## 🧪 Populando dados com Postman

### Seed automático (recomendado)

```
POST http://localhost:3000/api/seed
```

Sem body. Insere 300 transações aleatórias dos últimos 12 meses + 10 reservas financeiras.

### Inserção manual

```
POST http://localhost:3000/api/transactions
Content-Type: application/json

{
  "amount": 1500.00,
  "status": "APPROVED",
  "paymentMethod": "pix"
}
```

### Limpar todos os dados

```
DELETE http://localhost:3000/api/seed
```

---

## 📊 Componentes da Dashboard

| Componente | Descrição |
|------------|-----------|
| `MetricCard` | Cards de KPI com sparkline |
| `DonutCard` | Gráfico donut por meio de pagamento |
| `FaturamentoChart` | Gráfico de barras faturamento x estornado |
| `FinanceiroChart` | Gráfico de área financeiro diário |
| `PaymentMethods` | Lista de meios de pagamento com barra de progresso |

---

## 🔧 Scripts disponíveis

```bash
pnpm dev          # Inicia em desenvolvimento
pnpm build        # Build de produção
pnpm start        # Inicia em produção
pnpm lint         # Verifica erros de lint
npx prisma studio # Interface visual do banco de dados
```