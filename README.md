# 🤖 Discord QA Automation & Task Logger Bot

An automated Discord integration built with **Node.js**, **Express**, and **Google Sheets API**. Designed to streamline QA workflows, track testing hours, and automatically log structured task reports from Discord directly into Google Sheets using interactive UI Modals.

---

## Key Features

* **Interactive Discord UI:** Utilizes modern `ActionRowBuilder`, `ButtonBuilder`, and `ModalBuilder` components for a clean user input experience.
* **Google Sheets API Integration:** Securely appends task entries (Date, Task Name, Testing Hours, Remaining Hours) in real-time.
* **Keep-Alive Server:** Embedded Express web server ensuring high availability for cloud deployment (Render, Railway, etc.).
* **Security First:** Built with `dotenv` to manage sensitive environment variables (Tokens, API Keys, Service Account Credentials).

---

## Tech Stack & Dependencies

* **Language:** JavaScript (Node.js)
* **Frameworks & Libraries:**
  * `discord.js` (v14+) — Discord API Client
  * `googleapis` — Google Sheets API v4 Integration
  * `express` — Web server for health checks
  * `dotenv` — Environment variable management

---

## 🔒 Security & Architecture

This repository strictly enforces security best practices:
* `.gitignore` prevents exposure of sensitive credentials (`.env`, `node_modules`).
* Environment variables handle Google Service Account JSON parsing dynamically:
  ```javascript
  let creds = JSON.parse(process.env.GOOGLE_CRED);
  creds.private_key = creds.private_key.replace(/\\n/g, '\n');
