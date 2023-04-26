module.exports = {
    name: 'say',
    description: 'Me faz falar a mensagem que você desejar!',
    aliases: ['falar', 'fale', 'diga'],
    args: true,
    usage: 'say [mensagem para falar]',
    execute(bot, msg, args) {
        if (msg.deletable) msg.delete().catch(err => console.error(err));
        return msg.channel.send(args.join(' '));  
    },
};