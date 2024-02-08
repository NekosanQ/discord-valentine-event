import fs from "node:fs"

//ファイルの書き込み関数
export function appendFile(path: string, data: string) {
    fs.appendFile(path, data, (err) => {
        if (err) throw err;
    });
};