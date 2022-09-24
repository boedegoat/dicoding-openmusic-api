# Openmusic API

Halo para reviewer 👋, senang sekali bisa ikut tergabung ke dalam komunitas dicoding.

[GitHub Repo](https://github.com/boedegoat/dicoding-openmusic-api)

Saya mencoba untuk membuat semua testing passed, namun karena saya masih pemula postgresql, mungkin ada beberapa code yang sudah bekerja dengan baik tapi belum sesuai dengan best practices. Untuk itu, Saran dan kritik dipersilahkan untuk membuat webserver ini jadi lebih baik lagi.

Sekian, Terimakasih 😀.

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
```

kemudian jalankan command ini

```
npm i
npm migrate up
npm start
```
