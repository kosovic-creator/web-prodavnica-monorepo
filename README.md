# Web Prodavnica Monorepo

Ovaj monorepo sadrži dve Next.js aplikacije:

- `apps/client` – korisnička aplikacija
- `apps/admin` – admin panel

Deljeni paketi:
- `packages/ui` – zajedničke React komponente
- `packages/types` – zajednički TypeScript tipovi

## Pokretanje

Instaliraj zavisnosti u root-u:

```
pnpm install
```

Pokreni aplikacije:

```
pnpm --filter client dev
pnpm --filter admin dev
```

ili koristi npm/yarn workspaces po želji.
