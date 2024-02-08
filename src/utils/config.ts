import { parse } from "toml";
import { getWorkdirPath } from "./wirkdir";
import { readFileSync } from "fs";
import { logger } from "./log.js";
import { exit } from "process";

/**
 * コンフィグファイルの構造
 */
export interface Config {
    customVcChannelIdList: any;
    clientId: string;
    developerGuildId: string;
    generalGuildId: string;
    entranceChannelId: string;
    chatChannelId: string;
    inviteChannelId: string;
    voiceCreateChannelId: string;
    managementChannelId: string;
    logChanneld: string;
    checkMarkId: string;
    uncertifiedRoleId: string;
    authenticatedRoleId: string;
    everyoneRoleId: string;
    newMemberNoticeRoleId: string;
    botColor: string;
    errorColor: string;
    defaultVoiceChannelList: string[];
    inviteRoleId: string[];
};

// コンフィグファイルを読み込む
export const config: Config = ((): Config => {
    try {
        return parse(
            readFileSync(getWorkdirPath("config.toml"), "utf-8"),
        ) as Config;
    } catch (error) {
        logger.error("コンフィグの読み込みに失敗しました", error);
        exit(1);
    };
})();