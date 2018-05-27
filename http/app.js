const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const path = require('path');
const staticCache = require('koa-static-cache');

const index = require('./routes/index');

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
    formLimit: '5mb',
    jsonLimit: '15mb',
    textLimit: '5mb'
  })
);
app.use(json());
app.use(logger());
app.use(
  staticCache('./public/v1', {
    gzip: true,
    maxAge: 365 * 24 * 60 * 60
  })
);

app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();

  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  //ctx.set('Access-Control-Allow-Credentials', true);
  try {
    await next();
  } catch (error) {
    console.log(error);
  }

  const ms = new Date() - start;
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
app.use(index.routes(), index.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
