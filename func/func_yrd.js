const { EmbedBuilder } = require("discord.js");
const { logChannelID } = require("../config/bot");
  async function TrueEmbed(interaction,title,description){
    let embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor('DarkGreen')

    interaction.reply({embeds:[embed],ephemeral:true})
  }
  async function HataEmbed(interaction,description){
    let embed = new EmbedBuilder()
    .setTitle(`Hata`)
    .setDescription(description)
    .setColor('DarkRed')

    interaction.reply({embeds:[embed],ephemeral:true})
  }


  async function itiraf_mesaj(client,interaction,name,description,url){
    const exampleEmbed = new EmbedBuilder()
    .setColor('Random')
    .setTitle(`${name}`)
    .setURL('https://discord.gg/elitcode')
    .setAuthor({ name: `${name}`, iconURL: `${url}`, url: 'https://discord.gg/elitcode' })
    .setDescription(` \`\`\`${description}\`\`\``)
    .setTimestamp()
    .setFooter({ text: 'İtiraf geldi!', iconURL: `${url}` });

    const channel = client.channels.cache.get(logChannelID);
    if (channel) {
      channel.send({ embeds: [exampleEmbed]});
      TrueEmbed(interaction,'başarılı',`<#${logChannelID}> gönderildi`)
    } else {
      console.error("Channel not found");
      HataEmbed(interaction,'Kanal bulunamadı')
    }    

  }


  module.exports = {
    TrueEmbed,
    HataEmbed,
    itiraf_mesaj
  };  