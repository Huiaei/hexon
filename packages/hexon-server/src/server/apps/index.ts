/**
 * config app entrance
 */

import compose from "koa-compose"
import mount from "koa-mount"
import install, { checkInstall } from "./install"
import health from "./health"
import hexo from "./hexo"
import git from "./git"
import account from "./account"

export default compose([
  account,
  mount("/install", install),
  checkInstall(),
  mount("/health", health),
  mount("/hexo", hexo),
  mount("/git", git),
])
