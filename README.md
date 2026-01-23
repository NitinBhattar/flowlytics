# 🚀 Flowlytics  
**A modern inventory management platform built with Next.js**

Flowlytics is a modern inventory management platform for tracking products, monitoring stock levels, and gaining real-time operational insights. It is built as a full-stack Next.js application with a serverless-first architecture and secure authentication.

---

## 🧠 Key Features
- Product and inventory tracking
- Real-time stock level monitoring
- Secure authentication & session handling
- Serverless PostgreSQL database
- Scalable and maintainable architecture
- Dashboard-driven operational insights

---

## 🛠️ Tech Stack

### Frontend & Backend
- Next.js (Full-stack with App Router)
- React
- TypeScript
- Tailwind CSS

### Database
- **Neon** (Serverless PostgreSQL)

### Authentication
- **NeonAuth** (powered by Better Auth)

## 📁 Project Structure
```text
flowlytics/
├── app/ # Next.js App Router
├── components/ # Reusable UI components
├── lib/ # Database & auth utilities
├── public/
└── README.md
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/NitinBhattar/flowlytics.git
cd flowlytics
```

### 2️⃣ Setup
```bash
npm install
```

Create .env:
- env
```
DATABASE_URL = your_neon_postgres_url
NEON_AUTH_BASE_URL = your_neon_auth_url
```

Start:
```bash
npm run dev
```

## 📊 Use Cases
- Inventory and stock management systems
- Retail and warehouse tracking
- Product lifecycle monitoring
- Operational analytics dashboard

## 👤 Author
- Nitin Bhattar
- GitHub: https://github.com/NitinBhattar
- Vercel: https://flowlytics-two.vercel.app


## 📜 License
This project is licensed under the MIT License.
See the LICENSE file for details.

## 📄 `LICENSE` (MIT)

```txt
MIT License

Copyright (c) 2026 Nitin Bhattar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
