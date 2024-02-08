import { Interaction } from "discord.js";
import { config } from "../utils/config.js";
/**
 * @param interaction インタラクション
 */
module.exports = {
	async execute(interaction: Interaction): Promise<void> {
        if (!interaction.isButton()) return;
        try {
            await interaction.deferReply({
                ephemeral: true
            });
            let chocolateNum: number = 1; // 初期値
            const member = await interaction.guild?.members.fetch(interaction.user.id);
            const roles = member?.roles.cache;

            for (let i = 0; i < config.roleIds.length; i++) { // 役職によってチョコレートの数を変更する
                if (roles?.has(config.roleIds[i])) {
                    chocolateNum = i + 1; // ロールの配列は0からなので1を足す
                }
            };
            await interaction.editReply({
                content: `チョコレートを${chocolateNum}個渡しました`
            });
        } catch(error) {
            console.log(error);
        };
    }
};