import fs from "fs";
import { processLine } from "./utils/processor";



const filename: string = process.argv[2];
fs.readFile(filename, "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    const lines = data.split("\n");
    for (const line of lines) {
        processLine(line.trim());
    }

});

