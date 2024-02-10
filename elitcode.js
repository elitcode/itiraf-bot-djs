const { Client, GatewayIntentBits, Partials, EmbedBuilder ,ActionRowBuilder,  ModalBuilder, TextInputBuilder, TextInputStyle, } = require("discord.js");
const config = require("./config/bot");


const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

module.exports = client;

const fs = require("fs");
const { itiraf_mesaj } = require("./func/func_yrd");
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  require("./events/"+file);
  console.log(`> | ${file} Event Yüklendi!`)
}



client.on("interactionCreate", async (interaction) => {

  
  if(interaction.customId === "anonim") {
    const itiraf = new TextInputBuilder()
    .setCustomId("itiraf")
    .setLabel(`Anonim İtirafınızı giriniz.`)
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(300)
    .setPlaceholder("bir gün... \"gibi\"")
    .setRequired(true)
    const textrow = new ActionRowBuilder()
    .addComponents(itiraf)
    const modal = new ModalBuilder()
    .setCustomId("anonim_mesaj")
    .setTitle("İtiraf Kutusu")
    modal.addComponents(textrow)
    await interaction.showModal(modal)
  }
  if(interaction.customId === "isimli") {
    const itiraf = new TextInputBuilder()
    .setCustomId("itiraf")
    .setLabel(`İtirafınızı giriniz.`)
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(300)
    .setPlaceholder("bir gün... \"gibi\"")
    .setRequired(true)
    const textrow = new ActionRowBuilder()
    .addComponents(itiraf)
    const modal = new ModalBuilder()
    .setCustomId("isimli_mesaj")
    .setTitle("İtiraf Kutusu")
    modal.addComponents(textrow)
    await interaction.showModal(modal)
  }

  
  //itiraf kanala gönderme
  
  if(interaction.customId === "anonim_mesaj"){
    const itirafiniz = interaction.fields.getTextInputValue("itiraf")
    console.log("---------")
    console.log(interaction.user.username+' '+itirafiniz)
    console.log("---------")
      var name = 'Anonim'
      var url = config.gorsel
    itiraf_mesaj(client,interaction,name,itirafiniz,url)
  }
  if(interaction.customId === "isimli_mesaj"){
    const itirafiniz = interaction.fields.getTextInputValue("itiraf")
    console.log("---------")
    console.log(interaction.user.username+' '+itirafiniz)
    console.log("---------")
    var url = `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}`
    itiraf_mesaj(client,interaction,interaction.user.username,itirafiniz,url)
  }

})

client.login(config.token).catch(e => {
console.log(`Token Hata Var!`)
})


//var url = `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}`

