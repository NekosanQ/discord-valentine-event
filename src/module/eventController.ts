import {
    EmbedBuilder,
    ActionRowBuilder,
    ModalSubmitInteraction,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction,
    VoiceBasedChannel,
    User,
    ButtonInteraction,
    UserSelectMenuBuilder,
    ButtonBuilder,
    StringSelectMenuBuilder,
    ButtonStyle,
    ModalBuilder,
} from "discord.js";
import { config } from "../utils/config.js";
/**
 * バレンタインイベントの設定画面埋め込みメッセージ
 */
const operationEmbed: EmbedBuilder = new EmbedBuilder()
    .setColor(Number(config.botColor))
    .setTitle("バレンタインイベント操作画面")
    .setDescription("下のボタン・メニューから操作をしてください。")
    .setFields(
		{ name: "取得", value: "チョコレートを取得できます(一回きり)", inline: true },
		{ name: "", value: "", inline: true },
        { name: "", value: "", inline: true }
	)
/**
 * チョコレートを取得するボタン
 */
const getChocolateButton: ButtonBuilder = new ButtonBuilder()
    .setCustomId("get_chocolate_button")
    .setLabel("取得")
    .setStyle(ButtonStyle.Primary)
/**
 * チョコレートを渡すボタン
 */
const giveChocolateButton: ButtonBuilder = new ButtonBuilder()
    .setCustomId("give_chocolate_button")
    .setLabel("渡す")
    .setStyle(ButtonStyle.Success)
/**
 * 貰ったチョコレートの数を確認できるボタン
 */
const checkChocolateButton: ButtonBuilder = new ButtonBuilder()
    .setCustomId("give_chocolate_button")
    .setLabel("確認")
    .setStyle(ButtonStyle.Success)
/**
 * チョコレートを渡すユーザーセレクトメニュー
 */
export const selectGiveUserMenu: ActionRowBuilder<UserSelectMenuBuilder> = new ActionRowBuilder<UserSelectMenuBuilder>().setComponents(
    new UserSelectMenuBuilder()
        .setCustomId("selectGiveUserList")
        .setPlaceholder("チョコレートを渡すユーザーを選択")
        .setMaxValues(10)
        .setMinValues(1)
);