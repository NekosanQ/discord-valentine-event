import { Interaction } from "discord.js";

/**
 * @param interaction インタラクション
 */
// -----------------------------------------------------------------------------------------------------------
// 貰ったチョコレートの個数を確認する
// -----------------------------------------------------------------------------------------------------------
module.exports = {
	async execute(interaction: Interaction): Promise<void> {
        if (!interaction.isButton()) return;
        try {
            await interaction.deferReply({
                ephemeral: true
            });

            let chocolateNum: number = 0;
            
            await interaction.editReply({
                content: `貰ったチョコレートは、${chocolateNum}個です。`
            });
        } catch(error) {
            console.log(error);
        }
    }
};