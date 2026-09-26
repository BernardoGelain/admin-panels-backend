# Marcante API

NestJS API for the [Marcante admin console](https://github.com/BernardoGelain/admin-panels). It stores users, panels, and locations in PostgreSQL and protects panel routes with JWT.

## What it is

REST API for signing in and for creating, listing, updating, and deleting panels. Each panel keeps a location (street and coordinates) and an online flag. List responses are paginated.

## Why it exists

The console needs a tenant boundary. A superuser can read every panel. Any other user only receives panels for their own `tenantId`.

## Highlights

- JWT is issued at login and read from `Authorization: Bearer`.
- Panel queries filter by `tenantId` unless `isSuperuser` is set.
- Creating a panel saves the location first, then the panel.
- `GET /panels/summary` returns online, offline, and total counts.
- Schema changes are TypeORM migrations. Jest specs cover the auth, user, panel, and message modules.

Group and message controllers are still the Nest scaffolding. They do not persist records.

## Tech

NestJS, TypeScript, TypeORM, PostgreSQL, Passport JWT

## Running locally

Requirements: Node.js 18 and PostgreSQL.

Create a database, then a `.env` in the repository root:

```ini
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=
DATABASE_NAME=marcante
JWT_SECRET=
```

Use your own database password and a long random `JWT_SECRET`. Do not commit `.env`.

```bash
npm install
npm run migration:run
npm run seed
npm run start:dev
```

The API listens on [http://localhost:3000](http://localhost:3000). `npm run seed` inserts sample users and panels so the console has something to list. The admin web app expects this URL.
