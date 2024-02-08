import fs from "node:fs"

//ファイルの作成関数
export function writeFile(path: string, data: string) {
    fs.writeFile(path, data, (err) => {
        if (err) throw err;
    });
};