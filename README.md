# 🌌 FunToolHub
> A vibrant full-stack platform offering **fun mini-games** and **useful daily tools** in a sleek dark-themed interface.
[![License](https://img.shields.io/github/license/Fellah73/myWebsite)](./LICENSE)
[![Made with Next.js](https://img.shields.io/badge/Next.js-14-blue?logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-3982CE?logo=prisma)](https://www.prisma.io/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/status-in%20progress-yellow)]()
---
## 🚀 Features
🎮 **Games**
- Flappy Bird clone with leaderboard
- Snake Game with customization & progression tracking
🧭 **Services**
- Islamic Prayer Times with beautiful visuals
- To-Do List system (Coming Soon)
👤 **User Features**
- Full authentication system (register, login, logout)
- Update personal profile (avatar, username, preferences)
- Global and personal leaderboards
- In-game stats & milestones
- Community feedback system (coming soon)
---
## 🛠️ Tech Stack
- **Frontend**: [Next.js 14](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Backend**: Next.js API Routes, [Prisma ORM](https://prisma.io)
- **Database**: PostgreSQL or MySQL
- **Auth**: JWT-based authentication (via cookies)
- **Styling**: Tailwind CSS with custom dark/fuchsia theme
- **Deployment**: Vercel / Railway / Render (to be decided)
---
## 📦 Setup
```bash
# Clone the repo
git clone https://github.com/Fellah73/myWebsite.git
cd NovaNest
# Install dependencies
npm install
# Configure environment
cp .env.example .env
# add your DATABASE_URL and JWT_SECRET
# Run local dev server
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
