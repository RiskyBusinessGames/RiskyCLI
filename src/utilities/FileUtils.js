import * as fse from "fs-extra"
import { writeFileSync } from 'fs'
export default {
    GetFileLines,
    WriteFileLines,
    WriteFile
}

function WriteFile(filePath, fileContents)
{
    try {
        writeFileSync(filePath, fileContents);
        //console.log(`File Write:\n\t${filePath}\n\t${fileContents}`);
    } 
    catch (ex)
    {
       throw ex;
    }
}

function GetFileLines(filePath)
{
    let file = fse.readFileSync(filePath, 'utf-8');
    let lines = file.split(/\r?\n/);

    console.log(`READING FILE: ${filePath}`);
    console.log(`READING FILE: ${lines.length}`);

    return lines;
}

function WriteFileLines(filePath, lines)
{
    console.log(`WRITING FILE: ${filePath}`);
    console.log(`WRITING FILE: ${lines.length}`);

    fse.rmSync(filePath);

    let writer = fse.createWriteStream(filePath);

    for(let i = 0; i < lines.length; i++)
    {
        console.log(lines[i]);
        writer.write(lines[i]);
        writer.write("\n");
    }

    writer.end();
}