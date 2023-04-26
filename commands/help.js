const discord = require('discord.js');
require("dotenv").config();
const prefix = process.env.PREFIX;

module.exports = {
    name: 'help',
	description: 'Embed de ajuda sobre algum comando.',
    usage: 'help [comando]',
    aliases: ['commands', 'halp','comandos', 'ajuda'],
	execute(bot, msg, args) {
        const { commands } = msg.client;
        
        if (args.length) {
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        
        if (!command) return msg.reply('isso não é um comando válido.');
        
        const helpEmbed = new discord.EmbedBuilder()
            .setTitle(`Comando \`${command.name}\``)
            .setThumbnail('https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
            .setFooter({ text: `Parâmetros com [] são opcionais`, iconURL: msg.author.displayAvatarURL() })
            .setColor(0x00FF00);
            
            if (command.description) helpEmbed.setDescription(command.description);
            if (command.aliases) helpEmbed.addFields({ name: 'Sinônimos', value: command.aliases.join(', ') });
            if (command.usage) helpEmbed.addFields({ name: 'Uso', value: prefix + command.usage });
        
        return msg.channel.send({ embeds: [helpEmbed] });
        
        } else {
            const helpEmbed = new discord.EmbedBuilder()
                .setTitle(`Prefixo atual \`${prefix}\``)
                .setColor(0x00FF00)
                .setThumbnail(`${bot.user.displayAvatarURL({ format: "png", dynamic: true })}?size=2048`)
                .addFields({ name: `Comandos Gerais`, value: `${commands.map(command => `\`${command.name}\` `).join(' ')}` })
                .setFooter({ text: `Para checar o uso de um comando digite ${prefix}help <nome do comando>`, iconURL: msg.author.displayAvatarURL() });
        
            return msg.channel.send({ embeds: [helpEmbed] });
        }
	}
};