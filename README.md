# 挪威 · 八人冬日旅行

2026.12.31–2027.01.09 的团队旅行网站。包含折叠航班卡、每日行程、三个时区的出发／会合倒计时、共享待办、食材认领和按每日汇率换算的八人 AA 账本。

## 两部分部署

- **GitHub Pages 前端**：发布 `main` 分支的 `/docs` 目录。主页和倒计时使用 HTTPS，无需登录。
- **共享后端**：现有站点 `https://norway-eight-winter-journey.wh1sper.chatgpt.site` 的 Worker + D1。已有待办、食材和账本保存在后端，不保存在 GitHub，也不会随前端发布清空。
- Pages 的允许来源为 `https://whisperle.github.io`。如果更换 GitHub 账号或使用自定义域名，需要同步调整后端的 CORS 允许来源。

GitHub Pages 只提供静态网页，不能直接运行这里的共享数据接口。不能只复制 HTML 后就移除后端。

## 本地更新

需要 Node.js 24 和 pnpm。

```text
pnpm install --frozen-lockfile
node scripts/build.mjs
node scripts/build-pages.mjs
node scripts/test-fx.mjs
node scripts/test-countdown.mjs
node scripts/test-wechat.mjs
```

- 编辑 `public/travel.js` 更新机票和倒计时时间；时间包含 UTC 偏移，不能删除时区。
- 编辑 `public/index.html`、`public/style.css` 更新页面。
- 运行 `build-pages.mjs` 后，把 `docs/` 和源文件一起提交。GitHub Pages 会发布更新。
- 后端变更需单独发布现有 Sites 项目；GitHub Pages 的发布不会替代后端部署。

## 微信访问说明

- 网页采用 HTTPS，脚本打包为 ES2018，无需微信 JS SDK、微信登录或 ChatGPT 登录。
- 主图随站点发布，不依赖 Unsplash 在线加载；照片来源为 [Himmel S / Unsplash](https://unsplash.com/photos/KXcezlKOlKc)。
- 包含随机 ID 与微任务兼容处理，适配更多内置浏览器。
- 已检查模拟微信 User-Agent 下的公开页面与接口。模拟检查不等于真机微信实测；微信的域名风控、版本以及当地网络仍可能影响访问。
- 网站按用户要求允许持链接的人查看和填写，成员名字由本人选择，不是账号身份验证。请勿在网页内填写护照号、密码、银行卡等信息。

## 文件说明

- `public/`：可读的前端源码及图片。
- `worker/`：共享数据和每日汇率 API。
- `drizzle/`：数据库迁移，已应用的迁移不要修改。
- `scripts/build.mjs`：将网站、脚本和图片打包为 Worker。
- `scripts/build-pages.mjs`：生成独立的 GitHub Pages 前端。
- `.openai/hosting.json`：已有 Sites 项目配置，不包含密码或部署凭证。

## 数据和汇率

共同费用默认八人平摊。每笔按花费日期的 ECB 参考汇率换算人民币、美元、挪威克朗，周末／休市日取此前最近公布日；未来日期保持原币，等待汇率发布。不同币种的分摊只是同一份账的不同表示，不能重复结算。
