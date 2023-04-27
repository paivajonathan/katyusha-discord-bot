const discord = require('discord.js');

module.exports = {
    name: 'announce',
    description: 'Anuncia algo em algum canal',
    aliases: ['anuncio', 'anunciar', 'anuncie'],
    args: true,
    usage: 'announce <#canal> <título> <mensagem>',
    execute(bot, msg, args) {
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply('você não tem as permissões necessárias para executar esse comando...');

    if (!args[0]) return msg.reply('você precisa passar um canal para que o comando funcione.');
    const channelId = args[0];

    const channel = bot.channels.cache.get(channelId.replace(/<|#|>/g, '')); 
    if (!channel) return msg.reply('canal inválido');

    if (!args[1]) return msg.reply('você precisa informar um título.');
    const title = args[1];

    if(!args[2]) return msg.reply('você precisa passar a descrição do anúncio para que o comando funcione.');
    const description = args.slice(1).join(' ');

    const announceEmbed = new discord.MessageEmbed()
        .setTitle(title)
        .setDescription(description)

    channel.send(`teupai`);
    channel.send(announceEmbed);

    return;
  }
};
