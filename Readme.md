MCP 
- Overview of the project
- API structure
- Setup instructions
- CURL commands with expected outputs
- Explanation of the MCP pattern

---

```md
# 🔗 MCP (Model Context Protocol) with Supabase & Express.js

A simple proof-of-concept Node.js + Express app showcasing:
- REST API versions with and without service layers
- Dynamic MCP route to execute modular service functions
- Supabase integration as a database layer

---

## 🧠 What is MCP?

MCP (Model Context Protocol) is a dynamic route pattern to call any **tool/function combo** in a unified way.

```json
{
  "tool": "userService",
  "function": "createUser",
  "data": {
    "email": "chirag@mcp.com",
    "name": "Chirag MCP"
  }
}
```

> This allows integrating multiple tools like Binance, OpenAI, Supabase, etc., via a single gateway.

---

## 🔧 Setup

1. Clone this repo

```bash
git clone https://github.com/your/repo.git
cd mcp
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file

```env
PORT=4001
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_or_service_key
```

4. Start the server

```bash
npm run dev
# OR
npx ts-node index.ts
```

---

## 📡 API Routes

### ✅ `v1` Routes – Basic Supabase Access

#### ➕ Create User (v1)
```bash
curl -X POST http://localhost:4001/v1/users \
  -H "Content-Type: application/json" \
  -d '{"email":"chirag@v1.com","name":"Chirag V1"}'
```
> ✅ Response:
```json
[
  {
    "id": 5,
    "email": "chirag@v1.com",
    "name": "Chirag V1"
  }
]
```

#### 📥 Get All Users (v1)
```bash
curl http://localhost:4001/v1/users
```

---

### ✅ `v2` Routes – With Service Layer

#### ➕ Create User (v2)
```bash
curl -X POST http://localhost:4001/v2/users \
  -H "Content-Type: application/json" \
  -d '{"email":"chirag@v2.com","name":"Chirag V2"}'
```

> ✅ Response:
```json
[
  {
    "id": 6,
    "email": "chirag@v2.com",
    "name": "Chirag V2"
  }
]
```

#### 📥 Get All Users (v2)
```bash
curl http://localhost:4001/v2/users
```

> ✅ Response:
```json
[
  { "id": 1, "email": "chirag@gmail.com", "name": "chirag" },
  { "id": 2, "email": "thor@asgard.com", "name": "Thor" },
]
```

---

### 🔁 MCP Unified Route

#### ➕ Create User via MCP
```bash
curl -X POST http://localhost:4001/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "userService",
    "function": "createUser",
    "data": {
      "email": "chirag@mcp.com",
      "name": "Chirag MCP"
    }
  }'
```

> ✅ Response:
```json
[
  {
    "id": 8,
    "email": "chirag@mcp.com",
    "name": "Chirag MCP"
  }
]
```

#### 📥 Get All Users via MCP
```bash
curl -X POST http://localhost:4001/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "userService",
    "function": "getAllUsers",
    "data": {}
  }'
```

> ✅ Response:
```json
[
  { "id": 1, "email": "chirag@gmail.com", "name": "chirag" },
  { "id": 2, "email": "thor@asgard.com", "name": "Thor" },
  ...
]
```

---

## 🔌 Extending MCP

Add new tools and functions like:

```ts
if (tool === 'binance') {
  if (func === 'getMarketPrice') {
    const price = await binance.getMarketPrice(data.symbol);
    return res.json(price);
  }
}
```

You can support tools like: any many more others
- 🔮 AI tools (OpenAI, Claude)
- ✈️ Travel APIs (Skyscanner, Amadeus)
- 🍔 Food delivery (Zomato, Swiggy)
- 📊 Finance (Alpaca, Binance)

---

## 👨‍💻 For Developers

You can plug in:
- Supabase for DB
- Postgres / Redis
- Firebase / Firestore
- REST / GraphQL / gRPC
- Any external HTTP/SDK-based APIs
---

> Built by [Chiragkumar](https://github.com/ichiragkumar) 🚀
```