/* modules */
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const util = require('minecraft-server-util');

/* variables and imports */
const Global = require('./global.js');
const webhook = new Webhook(Global.webhook);

setInterval(() => {
    util.status(Global.serverIP, { port: Global.serverPort ?? 25565 })
        .then(res => {
            if (res.version === null) {
                const embed = new MessageBuilder()
                    .setText(Global.pingEveryone ? `@everyone ${Global.message}` : Global.message)
                    .setColor('#ff0000')
                    .setThumbnail('https://cdn.spin.rip/content/2022/02/02/1643794001828-mc-block.png')
                    .setDescription(`The server ${Global.serverIP} is down!`)
                    .setFooter('Made by Spinfal', 'https://cdn.discordapp.com/emojis/727618803772555325.webp?size=44&quality=lossless')
                    .setTimestamp();

                // /^{0-9}[18]$/.test(Global.roleID) ? `<@{${Global.roleID}}> ${Global.message}` : Global.message
                webhook.send(embed);
            }
        }).catch(err => {
            console.log(err);
        });
}, Global.interval);
