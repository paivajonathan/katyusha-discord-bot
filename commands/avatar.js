const discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Mostra o seu avatar ou de uma pessoa mencionada',
    usage: 'avatar [@usuário]',
    aliases: ['icon', 'foto', 'imagem'],
    execute(bot, msg, args) {
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();

            const avatarEmbed = new discord.EmbedBuilder()
            .setTitle(taggedUser.username)
            .setColor(0x0000FF)
            .setImage(`${taggedUser.displayAvatarURL({ format: "png", dynamic: true })}?size=2048`);

            msg.channel.send({ embeds: [avatarEmbed] });
                if (msg.deletable) {
                msg.delete().catch();
                return;
            }
        } else {
            const avatarEmbed = new discord.EmbedBuilder()
            .setTitle(msg.author.username)
            .setColor(0x0000FF)
            .setImage(`${msg.author.displayAvatarURL({ format: "png", dynamic: true })}?size=2048`);

            msg.channel.send({ embeds: [avatarEmbed] });


            if (msg.deletable) {
                msg.delete().catch();
                return;
            }
        }
    }
};