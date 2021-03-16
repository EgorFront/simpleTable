# simpletable

## Link on vercel

[https://simple-table.vercel.app/](https://simple-table.vercel.app/)

## О Vue-router

Как я выяснил, у vue-router [нет удобного api](https://github.com/vuejs/vue-router/issues/1631) для изменения query параметров. Поэтому мне кажется что решение использовать нативный api браузера в обход vue-router для взаимодействия с фильтрами в этом кейсе подходит лучше. Использовать api vue-router можно, но это усложнит код, и я не вижу преимуществ такого подхода

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
