import Router from "@koa/router";
import { container } from "tsyringe";
import { Context } from "koa";
import Hexo from "./service";

const router = new Router();

router.get("/posts", async (ctx: Context) => {
  const hexo = container.resolve(Hexo);
  ctx.body = await hexo.listPost();
});
router.get("/pages", async (ctx: Context) => {
  const hexo = container.resolve(Hexo);
  ctx.body = await hexo.listPage();
});
router.get("/tags", async (ctx: Context) => {
  const hexo = container.resolve(Hexo);
  ctx.body = await hexo.listTag();
});
router.get("/categories", async (ctx: Context) => {
  const hexo = container.resolve(Hexo);
  ctx.body = await hexo.listCategory();
});
router.post("/deploy", async (ctx: Context) => {
  const hexo = container.resolve(Hexo);
  await hexo.deploy(ctx.request.body);
  ctx.status = 200;
});
router.post("/generate", async (ctx: Context) => {
  const hexo = container.resolve(Hexo);
  await hexo.generate(ctx.request.body);
  ctx.status = 200;
});
router.post("/clean", async (ctx: Context) => {
  const hexo = container.resolve(Hexo);
  await hexo.clean();
  ctx.status = 200;
});

export default router;