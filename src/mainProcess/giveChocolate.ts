import { GuildMemberFlags, Interaction } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { 
	selectGiveUserMenu,
    giveChocolateEmbed
 } from "../module/eventController"

const prisma = new PrismaClient();

/**
 * @param interaction インタラクション
 */
// -----------------------------------------------------------------------------------------------------------
// 相手にチョコレートを渡す処理
// -----------------------------------------------------------------------------------------------------------
module.exports = {
	async execute(interaction: Interaction): Promise<void> {
        if (!interaction.isButton() && !interaction.isUserSelectMenu()) return;
        try {
            await interaction.deferReply({
                ephemeral: true
            });

            if (interaction.isButton()) {
                const chocolate = await prisma.valentineEvent.findMany({
                    select: {
                        passed_count: true,
                        gave: true
                    },

                    where: {
                        user_id: interaction.user.id
                    }
                });

                if (!chocolate[0]) {
                    await interaction.editReply({
                        content: "チョコがありません。 **取得ボタン** から、チョコレートを受け取ってください。"
                    });

                    return;
                } else {
                    if (!chocolate[0].gave) {
                        await interaction.editReply({
                            content: "チョコがありません。 **取得ボタン** から、チョコレートを受け取ってください。"
                        });

                        return;
                    }

                    if (chocolate[0].passed_count == 0) {
                        await interaction.editReply({
                            content: "渡せるチョコレートがありません。"
                        });

                        return;
                    }

                    await interaction.editReply({
                        embeds: [giveChocolateEmbed],
                        components: [selectGiveUserMenu]
                    });
                }
            } else if (interaction.isUserSelectMenu()) {
                const oppoentUserID: string = String(interaction.values[0]); // 送る相手のユーザーID
                const oppoentUser = await interaction.guild?.members.fetch(oppoentUserID);

                if (interaction.user.id == oppoentUserID) {
                    await interaction.editReply({
                        content: "自分自身には渡せません！"
                    });

                    return;
                }

                if (oppoentUser?.user.bot) {
                    await interaction.editReply({
                        content: "このユーザーには渡せません！"
                    });

                    return;
                }

                const myChocolate = await prisma.valentineEvent.findMany({
                    select: {
                        passed_count: true
                    },

                    where: {
                        user_id: interaction.user.id
                    }
                });

                if (myChocolate[0].passed_count == 0) { // 0こ
                    await interaction.editReply({
                        content: "渡せるチョコレートがありません。"
                    });

                    return;
                }

                const oppoentChocolate = await prisma.valentineEvent.findMany({
                    select: {
                        received_count: true
                    },

                    where: {
                        user_id: oppoentUserID
                    }
                });

                if (oppoentChocolate[0]) {
                    await prisma.valentineEvent.updateMany({
                        data: {
                            received_count: oppoentChocolate[0].received_count + 1
                        },

                        where: {
                            user_id: oppoentUserID
                        }
                    });
                } else {
                    await prisma.valentineEvent.create({
                        data: {
                            user_id: oppoentUserID,
                            passed_count: 0,
                            received_count: 1,
                            gave: false
                        }
                    });
                }

                await prisma.valentineEvent.updateMany({
                    data: {
                        passed_count: myChocolate[0].passed_count - 1
                    },

                    where: {
                        user_id: interaction.user.id
                    }
                });


                await interaction.editReply({
                    content: `${oppoentUser?.displayName} にチョコレートを渡しました。\nあなたが渡せる残りのチョコレートの数: ${myChocolate[0].passed_count - 1}`
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
};