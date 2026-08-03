require('dotenv').config();
const { 
  Client, 
  GatewayIntentBits, 
  Partials, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  ModalBuilder, 
  TextInputBuilder, 
  TextInputStyle, 
  Events 
} = require('discord.js');

const express = require('express');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;


let creds = JSON.parse(process.env.GOOGLE_CRED); 

creds.private_key = creds.private_key.replace(/\\n/g, '\n');

const SHEET_ID = process.env.SHEET_ID; 


const auth = new google.auth.GoogleAuth({
  credentials: creds,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});
const sheets = google.sheets({ version: 'v4', auth });


app.get('/', (req, res) => {
  res.send('Bot is alive!');
});
app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});


const TOKEN = process.env.TOKEN; 
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel]
});

let horas = 0;


client.once(Events.ClientReady, () => {
  console.log(`✅ Bot connected as ${client.user.tag}`);
  console.log('⏳ Google Sheets is ready using googleapis!');
});


client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  const content = message.content.trim();

  if (content.toLowerCase().startsWith("son ")) {
    const numero = parseInt(content.split(" ")[1]);
    if (!isNaN(numero)) {
      horas = numero;
      message.reply(`✅ Hours set to **${horas}**.`);
    }
    return;
  }

  if (content.startsWith("+") || content.startsWith("-")) {
    const numero = parseInt(content);
    if (!isNaN(numero)) {
      horas += numero;

      const button = new ButtonBuilder()
        .setCustomId('openModal')
        .setLabel('Log Task')
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder().addComponents(button);

      await message.reply({
        content: `📋 ${message.author}, click the button to log your task.\n⏱ Remaining hours: **${horas}**`,
        components: [row]
      });
    }
  }
});


client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton() && interaction.customId === 'openModal') {
    const modal = new ModalBuilder()
      .setCustomId('taskModal')
      .setTitle('Task Details');

    const taskInput = new TextInputBuilder()
      .setCustomId('task')
      .setLabel('Task type')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const dateInput = new TextInputBuilder()
      .setCustomId('date')
      .setLabel('Date (YYYY-MM-DD)')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const testHoursInput = new TextInputBuilder()
      .setCustomId('testingHours')
      .setLabel('Testing Hours')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const firstRow = new ActionRowBuilder().addComponents(taskInput);
    const secondRow = new ActionRowBuilder().addComponents(dateInput);
    const thirdRow = new ActionRowBuilder().addComponents(testHoursInput);

    modal.addComponents(firstRow, secondRow, thirdRow);

    await interaction.showModal(modal);
  }

  if (interaction.isModalSubmit() && interaction.customId === 'taskModal') {
    const task = interaction.fields.getTextInputValue('task');
    const date = interaction.fields.getTextInputValue('date');
    const testingHours = parseInt(interaction.fields.getTextInputValue('testingHours')) || 0;

    await interaction.reply(
      `✅ Hours updated: **${horas}**\n📌 Task: **${task}**\n📅 Date: **${date}**\n⏱ Testing Hours: **${testingHours}**\n⏳ Remaining hours: **${horas}**`
    );

    
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: 'DiscordBotTasks!A:D', 
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [date, task, testingHours, horas]
          ]
        }
      });
      console.log("✅ Data saved to Google Sheet.");
    } catch (err) {
      console.error("❌ Error saving to Google Sheet:", err);
    }
  }
});

client.login(TOKEN);
