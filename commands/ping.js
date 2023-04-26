const discord = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Mostra o NOSSO ping',
  async execute(client, msg, args) {
    const initialEmbed = new discord.EmbedBuilder()
    .setTitle('Calculando...')
    .setColor(0x0000FF);

    msg.channel.send({ embeds: [initialEmbed] }).then(async (m) =>{
      m.delete();

      const lastEmbed = new discord.EmbedBuilder()
      .setTitle(':ping_pong: Pong!')
      .setColor(0xFF0000)
      .setDescription(`A sua latência é de **${m.createdTimestamp - msg.createdTimestamp}ms**. A latência da API é de **${Math.round(client.ws.ping)}ms**.`);

      msg.channel.send({ embeds: [lastEmbed] });
    });
  }
};