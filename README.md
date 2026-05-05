# A3J-online-store

## 📂 Project File Structure

```
/my-online-store
├── /client                # Frontend (React + Vite + TS)
│   ├── /src
│   │   ├── /components    # UI elements (Navbar, Button)
│   │   ├── /pages         # Store pages (Home, Product, Cart)
│   │   ├── /hooks         # API fetch hooks (useProducts)
│   │   ├── /store         # State management (Zustand/Redux)
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts     # Config for "npm run build"
│
├── /server                # Backend (Node.js + Express + TS)
│   ├── /src
│   │   ├── /controllers   # Business logic (handlePayment)
│   │   ├── /models        # Database schemas (Product, User)
│   │   ├── /routes        # API endpoints (/api/items)
│   │   ├── /middlewares   # Auth & Security
│   │   └── index.ts       # Entry point (listens to PORT)
│   ├── package.json
│   └── tsconfig.json
│
├── /shared                # Shared Types (Important for TS!)
│   └── types.ts           # Product & Order interfaces
│
├── .env                   # DB_URL, STRIPE_KEY (ignored by Git)
├── .gitignore             # Ignores node_modules, .env, dist
├── Dockerfile             # The "Recipe" for Render
└── package.json           # Root scripts to run both apps
```