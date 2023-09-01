# next-js with express-js backend

clone repository

```
git clone https://github.com/winnysan/next-express.git
```

copy `.env` and install dependencies

```
cd next-express
cp .env.example .env
npm install
```

## scripts

in `.env`, first set the enviroment `development` or `production`

```
"scripts": {
    "dev": "nodemon index.js",
    "build": "next build",
    "start": "npm run build && node index.js"
  },
```
