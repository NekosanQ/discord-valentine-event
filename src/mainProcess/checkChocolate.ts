import { Interaction } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/log";
const prisma = new PrismaClient();

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

            const user = await prisma.valentineEvent.findMany({
                select: {
                    user_id: true,
                    received_count: true
                },

                where: {
                    user_id: interaction.user.id
                }
            });

            if (user[0]) {

                logger.info(`[チョコ確認] ${interaction.user.displayName}/${interaction.user.id} 個数: ${user[0].received_count}`);
                
                await interaction.editReply({
                    content: `貰ったチョコレートの個数: ${user[0].received_count}個`
                });
            } else { // データがないので新規作成する
                await prisma.valentineEvent.create({
                    data: {
                        user_id: interaction.user.id,
                        passed_count: 0,
                        received_count: 0,
                        gave: false
                    }
                });

                await interaction.editReply({
                    content: "貰ったチョコレートの個数: 0個"
                });
            }
        } catch(error) {
            console.log(error);
        }
    }
};