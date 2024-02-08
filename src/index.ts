//必要なパッケージをインポートする
import { Client, Collection, Events, GatewayIntentBits, Partials } from "discord.js"
import dotenv from "dotenv"
import fs from "node:fs"
import path from "node:path"
import { CustomCommand } from "./types/client"
import { logger } from "./utils/log"

//.envファイルを読み込む
dotenv.config()

/**
 * Discord Client
 */
export const client: Client = new Client({
	//Botで使うGetwayIntents、partials
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
    ],
    partials: [
        Partials.Message, 
        Partials.Channel
    ]
})

client.commands = new Collection();

// -----------------------------------------------------------------------------------------------------------
// コマンドハンドラー
// -----------------------------------------------------------------------------------------------------------
const foldersPath: string = path.join(__dirname, 'commands');
const commandFolders: string[] = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath: string = path.join(foldersPath, folder);
	const commandFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath: string = path.join(commandsPath, file);
		const command: CustomCommand = require(filePath) as CustomCommand;
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] ${filePath}のコマンドには、必須の "data "または "execute "プロパティがありません。`);
		};
	};
};

client.on(Events.ClientReady, async () => {
	logger.info(`${client.user?.username ?? 'Unknown'} として起動しました`);
});
client.on(Events.InteractionCreate, async () => {
	
})
client.login(process.env.KokoneToken);