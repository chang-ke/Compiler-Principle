const router = require("koa-router")();
const path = require("path");
const fs = require("fs");
const FormBody = require("form-body");
const proxy = require("./request");

router.post("/", async (ctx, next) => {
  const ffi = require('./Compilers-principles/node_modules/ffi');
  const Dll = ffi.Library('./Compilers-principles/CompilersPrinciplesDll/x64/Debug/CompilersPrinciplesDll.dll', {
      'parse': ['string', ['string']
      ]
  })
  let ss = ctx.request.body.str
  let s = Dll.parse(ctx.request.body.str)
  ctx.body = s
});

// router.post("/*", async (ctx, next) => {
//   const data = await proxy({
//     hostname: "cnodejs.org",
//     https: true,
//     req: ctx.req,
//     ctx:ctx
//   });
//   ctx.body = data;
// });

// router.get("/api/v1/*", async (ctx, next) => {
//   const data = await proxy({
//     hostname: "cnodejs.org",
//     https: true,
//     req: ctx.req
//   });
//   ctx.body = data;
// });

router.get("/*", async (ctx, next) => {
  ctx.type = "text/html";
  ctx.body = fs.readFileSync("./public/index.html");
});

module.exports = router;
