# Discord QA Automation & Task Logger Bot

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

## Security & Architecture

This repository strictly enforces security best practices:
* `.gitignore` prevents exposure of sensitive credentials (`.env`, `node_modules`).
* Environment variables handle Google Service Account JSON parsing dynamically:
  ```javascript
  let creds = JSON.parse(process.env.GOOGLE_CRED);
  creds.private_key = creds.private_key.replace(/\\n/g, '\n');

  
📸 Workflow & Preview

Full workflow preview video:
https://www.loom.com/share/8a7bfccd692c46659ebc65c05c259a20

Triggering the Logger: User triggers the command in Discord to generate the interactive task logging button.
<img width="678" height="216" alt="image" src="https://github.com/user-attachments/assets/ae239c2a-ae03-4c47-a67b-b87a2e55b4d9" />

Modal Form Submission: A clean popup prompts for Task Type, Date, and Testing Hours.

<img width="513" height="523" alt="image" src="https://github.com/user-attachments/assets/7a2ae2ff-17ed-446d-a37f-780586761234" />

Automated Sheet Sync: Submitted data is appended seamlessly to the targeted Google Sheet worksheet (DiscordBotTasks).

<img width="1186" height="667" alt="image" src="https://github.com/user-attachments/assets/5321e82b-9dc8-463f-a8cd-72186a9a43eb" />

🚀 How to Run Locally
Clone the repository:

Bash
git clone [https://github.com/AndresVergara-qa/discord-form-automation-bot.git](https://github.com/AndresVergara-qa/discord-form-automation-bot.git)
cd discord-form-automation-bot


Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory:


Fragmento de código
PORT=3000
TOKEN=your_discord_bot_token
SHEET_ID=your_google_sheet_id
GOOGLE_CRED={"type":"service_account", ...}
Start the bot:

Bash
npm start

