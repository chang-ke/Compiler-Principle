const router = require("koa-router")();
const path = require("path");
const fs = require("fs");

router.post("/", async (ctx, next) => {
  const ffi = require('../../node_modules/ffi');
  const Dll = ffi.Library('../../dll/x64/Debug/CompilersPrinciplesDll.dll', {
      'parse': ['string', ['string']
      ]
  })
  let ss = ctx.request.body.str
  let s = Dll.parse(ctx.request.body.str)
  ctx.body = s
});

router.post("/ll", async (ctx, next) => {
  const ffi = require('../../node_modules/ffi');
  const Dll = ffi.Library('../../dll/x64/Debug/CompilersPrinciplesDll.dll', {
      'analys': ['string', ['string']
      ]
  })
  let ss = ctx.request.body.str
  let s = Dll.analys(ctx.request.body.str)
  ctx.body = s
});

router.get("/*", async (ctx, next) => {
  ctx.type = "text/html";
  ctx.body = fs.readFileSync("./public/index.html");
});

module.exports = router;
