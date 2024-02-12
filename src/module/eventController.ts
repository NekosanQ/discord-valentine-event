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
import { SelectMenuBuilder } from "@discordjs/builders";
/**
 * バレンタインイベントの設定画面埋め込みメッセージ
 */
export const operationEmbed: EmbedBuilder = new EmbedBuilder()
    .setColor(Number(config.botColor))
    .setTitle("🍫バレンタインイベント操作画面")
    .setDescription("下のボタン・メニューから操作をしてください。")
    .setFields(
		{ name: "取得", value: "チョコレートを取得できます(一回きり)" },
		{ name: "渡す", value: "チョコレートを渡すことが出来ます"},
        { name: "確認", value: "貰ったチョコレートの数を確認できます", }
	)
/**
 * チョコレートを取得するボタン
 */
export const getChocolateButton: ButtonBuilder = new ButtonBuilder()
    .setCustomId("get_chocolate_button")
    .setLabel("取得")
    .setStyle(ButtonStyle.Primary)
/**
 * チョコレートを渡すボタン
 */
export const giveChocolateButton: ButtonBuilder = new ButtonBuilder()
    .setCustomId("give_chocolate_button")
    .setLabel("渡す")
    .setStyle(ButtonStyle.Success)
/**
 * 貰ったチョコレートの数を確認できるボタン
 */
export const checkChocolateButton: ButtonBuilder = new ButtonBuilder()
    .setCustomId("check_chocolate_button")
    .setLabel("確認")
    .setStyle(ButtonStyle.Success)
/**
 * 操作するコンポーネント
 */
export const operationRow: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(getChocolateButton, giveChocolateButton, checkChocolateButton);
/**
 * チョコレートを渡すユーザーセレクトメニュー
 */
export const selectGiveUserMenu: ActionRowBuilder<UserSelectMenuBuilder> = new ActionRowBuilder<UserSelectMenuBuilder>().setComponents(
    new UserSelectMenuBuilder()
        .setCustomId("selectGiveUserList")
        .setPlaceholder("チョコレートを渡すユーザーを選択")
        .setMaxValues(1)
        .setMinValues(1)
);

/**
 * 相手にチョコを渡すときの画面(埋め込みメッセージ)
 */
export const giveChocolateEmbed: EmbedBuilder = new EmbedBuilder()
    .setColor(Number(config.botColor))
    .setTitle("チョコレートを渡す 🍫")
    .setDescription("下のメニューから渡したい相手を選んでください。");