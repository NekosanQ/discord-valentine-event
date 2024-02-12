//必要なパッケージをインポートする
import { Client, Collection, Events, GatewayIntentBits, Partials, PermissionsBitField } from "discord.js"
import dotenv from "dotenv"
import fs from "node:fs"
import path from "node:path"
import { CustomCommand } from "./types/client"
import { logger } from "./utils/log"
import { 
	operationEmbed,
	operationRow
 } from "./module/eventController"
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
    ],
    partials: [
        Partials.Message, 
        Partials.Channel
    ]
})

client.commands = new Collection();

client.on(Events.ClientReady, async () => {
	logger.info(`${client.user?.username ?? 'Unknown'} として起動しました`);
});

client.on(Events.MessageCreate, async (message) => {
	// 管理者権限がない場合は実行しない
	if (!message.member?.permissions.has(PermissionsBitField.Flags.Administrator)) return;
	// バレンタインイベントの設定画面を出すコマンド
	if (message.content === "c/event") {
		message.channel.send({
			embeds: [operationEmbed],
			components: [operationRow]
		});
	}
});
client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isButton() && !interaction.isUserSelectMenu()) return;
	switch(interaction.customId) {
		case "get_chocolate_button": { // 取得
			await require("./mainProcess/getChocolate").execute(interaction);
			break;
		}
		case "give_chocolate_button": { // 渡す
			await require("./mainProcess/giveChocolate").execute(interaction);
			break;
		}
		case "check_chocolate_button": { // 確認
			await require("./mainProcess/checkChocolate").execute(interaction);
			break;
		}
		case "selectGiveUserList": { // "渡す -> ユーザー選択"
			await require("./mainProcess/giveChocolate").execute(interaction);
			break;
		}
	}
});
client.login(process.env.DISCORD_TOKEN);