require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('The bot is online!');
});

client.on('messageCreate', (msg) => {
    if (!msg.content.trim().split(/ +/)[1] && !(msg.content === "@everyone" || msg.content === "@here") && !msg.author.bot && msg.mentions.has(client.user)) {
        return msg.reply(`para saber meus comandos, digite \`${process.env.PREFIX}help\`.`);
    }

    if (msg.author.bot || !msg.content.startsWith(process.env.PREFIX) || msg.channel.type === "DM") return;

    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        let reply = `Lembre-se de passar algum argumento para esse comando, ${msg.author}!`;
        if (command.usage) {
            reply += `\nO uso correto desse comando seria  \`${process.env.PREFIX + command.usage}\` `;
        }
        return msg.channel.send(reply);
    }

    try {
        command.execute(client, msg, args);
    } catch (error) {
        console.error(error);
        msg.reply("houve um erro ao tentar executar esse comando...");
    }
});

client.login(process.env.TOKEN);