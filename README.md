# Openmusic API

Halo para reviewer 👋, senang sekali bisa ikut tergabung ke dalam komunitas dicoding.

[GitHub Repo](https://github.com/boedegoat/dicoding-openmusic-api)

Ini adalah hasil final project Openmusic API. Selama saya mengerjakan project ini, saya belajar banyak hal baru yang meliputi hapi framework, database postgresql, auth flow, message broker, dan redis caching. Saya tunggu kritik dan saran dari para reviewer.

Sekali lagi, terima kasih kepada tim Dicoding atas kursusnya yang sangat berdaging.

## Langkah menjalankan webserver openmusic api

setup `.env`

```env
PGHOST=
PGUSER=
PGDATABASE=
PGPASSWORD=
PGPORT=

# jwt
ACCESS_TOKEN_KEY=
ACCESS_TOKEN_AGE=
REFRESH_TOKEN_KEY=

# rabbitmq
RABBITMQ_SERVER=
```

kemudian jalankan command ini

```
npm i
npm migrate up
npm start
```
