import { Interaction } from "discord.js";
import { config } from "../utils/config.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @param interaction インタラクション
 */
// -----------------------------------------------------------------------------------------------------------
// チョコレートを獲得する処理
// -----------------------------------------------------------------------------------------------------------
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

            const chocolate = await prisma.valentineEvent.findMany({
                select: {
                    gave: true
                },

                where: {
                    user_id: interaction.user.id
                }
            });

            if (chocolate[0]) { // 作成済み(すでに相手から受け取っているなど)
                if (chocolate[0].gave) { // 取得済み
                    await interaction.editReply({
                        content: "すでにチョコレートを取得しています！"
                    });

                    return;
                }

                await prisma.valentineEvent.updateMany({
                    where: {
                        user_id: interaction.user.id
                    },

                    data: {
                        passed_count: chocolateNum,
                        gave: true
                    }
                });
            } else {
                await prisma.valentineEvent.create({
                    data: {
                        user_id: interaction.user.id,
                        passed_count: chocolateNum,
                        received_count: 0,
                        gave: true
                    }
                });
            }

            await interaction.editReply({
                content: `チョコレートを${chocolateNum}個渡しました`
            });
        } catch(error) {
            console.log(error);
        };
    }
};