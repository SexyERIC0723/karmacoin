# 🪷 KarmaCoin - Cyber Wooden Fish

![KarmaCoin Banner](https://img.shields.io/badge/KarmaCoin-Cyber%20Buddhism-gold?style=for-the-badge)

**KarmaCoin** is not just a meme coin, it's a rebellion against fake holiness, corrupted donations, and tax evasion under religious names.

## ✨ Features

- 🖱️ **Interactive Wooden Fish** - Click to accumulate merit and earn Cyber-Karma Tokens (CKT)
- 🌍 **Global Leaderboard** - Countries compete in spreading cyber enlightenment
- ⚡ **Real-time Updates** - Live karma tracking with beautiful animations
- 🎨 **Modern UI** - Sleek design with particle effects and smooth animations
- 📱 **Mobile Friendly** - Fully responsive experience

## 🏗️ Project Structure

```
karmacoin/
  backend/        # Express + MongoDB 后端 API
  frontend/       # React + Vite + Tailwind 前端
```

## 开发环境搭建

### 前置要求

- Node.js ≥ 18
- MongoDB 本地或远程实例

### 后端

```bash
cd backend
npm install
# 启动后台（默认 4000 端口）
npm run dev
```

环境变量 `.env` 可定义：

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/karmacoin
```

### 前端

```bash
cd frontend
npm install
# 启动前端（默认 5173 端口）
npm run dev
```

Vite 已配置将 `/api` 请求代理到 `http://localhost:4000`。

### 访问

- http://localhost:5173/           首页
- http://localhost:5173/game       赛博木鱼
- http://localhost:5173/leaderboard 排行榜

## 部署

- 前端：Vercel / Netlify 直接部署 `frontend` 目录构建产物。
- 后端：Render / Railway / Heroku 部署 `backend`。记得配置环境变量与允许前端域 CORS。
- 数据库：Render（PostgreSQL/Mongo）或 MongoDB Atlas。 