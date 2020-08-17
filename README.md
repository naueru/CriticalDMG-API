# critical-dmg-api

>

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/), [npm](https://www.npmjs.com/) and [PostgreSQL](https://www.postgresql.org/) installed.

2. Install your dependencies

   ```bash
   cd path/to/CriticalDMG-API
   npm install
   ```

3. [Configure PostgreSQL.](https://www.postgresql.org/docs/12/runtime.html)
   **For local development:**

   - Log in as the Postgres user 
   ```bash
    sudo -i -u postgres
    ```
   - [Create an user](https://www.postgresql.org/docs/12/app-createuser.html) with username _"critical-dmg"_ and password _"critical-dmg"_
   ```bash
    createuser critical-dmg -P
    ```
   - [Create a database](https://www.postgresql.org/docs/12/app-createdb.html) called _"critical-dmg"_ and set as owner the user created
   ```bash
    createdb critical-dmg -O critical-dmg
    ```

4. Start your app

   ```bash
   npm run dev
   ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Critical has is custom scaffolding service generator. Run and follow instructions

```bash
npm run plop
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
