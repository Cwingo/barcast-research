# BarCast Research

A small Expo and React Native app. Enter a sample bar name, choose a crowd level, and submit it to the report list. Reports reset on reload.

Requires Node.js 22.13 or newer.

```sh
npm install
npm run web
```

If the development server reports `EMFILE`, run `npm run build`, then `python3 -m http.server 8082 --bind 127.0.0.1 --directory dist`. Open http://127.0.0.1:8082.
