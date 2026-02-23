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
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   └── layout.tsx
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts
│       │   └── register/route.ts
│       ├── dashboard/route.ts
│       ├── financial-reserve/route.ts
│       ├── seed/route.ts
│       └── transactions/route.ts
├── features/
│   ├── auth/
│   │   ├── components/       # LoginForm, RegisterForm, AuthGuard, LogoutButton
│   │   ├── hooks/            # useAuth, useLogin, useLogout, useRegister, useUser
│   │   ├── services/         # auth.service.ts
│   │   └── types/            # auth.types.ts, auth.dto.ts
│   └── dashboard/
│       ├── components/       # DashboardComponent, DonutCard, MetricCard, etc.
│       ├── hooks/            # useDashboard
│       ├── services/         # dashboard.service.ts
│       └── types/            # dashboard.types.ts
└── lib/
    ├── api.ts
    ├── prisma.ts             # Singleton do Prisma Client
    └── providers.tsx
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

### User

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String | ID único (UUID) |
| `name` | String | Nome do usuário |
| `email` | String | Email único |
| `password` | String | Senha hash |
| `createdAt` | DateTime | Data de criação |

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

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/auth/register` | Criar conta |
| `POST` | `/api/auth/login` | Entrar |

### Dashboard

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/dashboard` | Payload completo (métricas + gráficos + pagamentos) |

Aceita query params de filtro:

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
| `FaturamentoChart` | Gráfico de barras faturamento x estornado (12 meses) |
| `FinanceiroChart` | Gráfico de área financeiro diário |
| `PaymentMethods` | Lista de meios de pagamento com barra de progresso |

---

## 🔧 Scripts disponíveis

```bash
pnpm dev           # Inicia em desenvolvimento
pnpm build         # Build de produção
pnpm start         # Inicia em produção
pnpm lint          # Verifica erros de lint
npx prisma studio  # Interface visual do banco de dados
npx prisma db push # Sincroniza schema com o banco
```