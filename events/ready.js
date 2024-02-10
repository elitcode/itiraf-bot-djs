const client = require("../elitcode");
const { Collection } = require("discord.js")
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs")
const path = require("path");
var config = require("../config/bot.js");

let lastInteraction;
client.on("interactionCreate", async interaction => {
    lastInteraction = interaction; 
  });

client.on("ready", () => {
    client.slashCommands = new Collection();
    const slashCommandsLoader = []

    const slashCommandFolders = fs.readdirSync('./slash');
    for (const folder of slashCommandFolders) {
        const folderPath = path.join('./slash', folder);
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            const props = require("../" + filePath);

            client.slashCommands.set(props.name, props);
            slashCommandsLoader.push({
                name: props.name,
                description: props.description,
                options: props.options
                });
            console.log(`> Slash | ${props.name}/${folder} Komut Yüklendi!`)

        }
    }


    const rest = new REST({ version: "10" }).setToken(config.token);
    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: await slashCommandsLoader,
            });
            console.log("[/]");
        } catch (e) {
            console.log(e);
        }
    })();

    console.log(`> | ${client.user.tag} Online! | ElitCode(1flexy) Developer`)
    console.log('> Bu bot elit code için hazırlanmıştır izinsiz paylaşılması yasaktır.')
    client.user.setActivity(config.botStatus || "ElitCode(1flexy) Developer");

    process.title = config.botStatus + " | ElitCode(1flexy) Developer"

});