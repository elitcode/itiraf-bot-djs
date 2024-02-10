const { EmbedBuilder,  ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require('discord.js');
const { HataEmbed, TrueEmbed } = require('../../func/func_yrd');
const { ownerElitCode, gorsel, channelID } = require('../../config/bot');



module.exports = {
  name: "itiraf_kutusu",
  description: "İtiraf kutusunu aktif eder.",
  options: [],
  run: async (client, interaction) => {
    try {

      if(interaction.user.id!== ownerElitCode){
        interaction.reply('Bu komudu kullanamazsınız.')
        return
      }
      
      const exampleEmbed = new EmbedBuilder()
      .setColor('Random')
      .setTitle('İtiraf Kutusu')
      .setURL(gorsel)
      .setAuthor({ name: 'İtiraf Kutusu', iconURL: gorsel, url: 'https://discord.gg/elitcode' })
      .setDescription('Hey Anonim veya isimli itiraf etmek için butonları kullan.\n')
      .setThumbnail(gorsel)
      .addFields(
        { name: 'Anonim İtiraf', value: 'Kimin söylediği belli olmaz' },
        { name: 'Normal İtiraf', value: 'Kimin attığı gözükür'},
      )
      .setTimestamp()
      .setFooter({ text: 'ElitCode altyapıları', iconURL: gorsel });

      const anonim = new ButtonBuilder()
			.setCustomId('anonim')
			.setLabel('Anonim İtiraf')
			.setStyle(ButtonStyle.Danger);
      const isimli = new ButtonBuilder()
			.setCustomId('isimli')
			.setLabel('İsimli İtiraf')
			.setStyle(ButtonStyle.Secondary);

      const row = new ActionRowBuilder()
			.addComponents(isimli, anonim);


      const channel = client.channels.cache.get(channelID);
      if (channel) {
        channel.send({ embeds: [exampleEmbed], components: [row] });
        TrueEmbed(interaction,'başarılı',`<#${channelID}> gönderildi`)
      } else {
        console.error("Channel not found");
        HataEmbed(interaction,'Kanal bulunamadı')
      }
      }
      catch (error) {
      console.error(error);
      await HataEmbed(interaction, `Hata!`)
    }
    
  },
};
