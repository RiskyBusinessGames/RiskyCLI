import * as fse from "fs-extra"

export default {
    GetFileLines,
    WriteFileLines
}

function GetFileLines(filePath)
{
    var file = fse.readFileSync(filePath, 'utf-8');
    var lines = file.split(/\r?\n/);

    console.log(`READING FILE: ${filePath}`);
    console.log(`READING FILE: ${lines.length}`);

    return lines;
}

function WriteFileLines(filePath, lines)
{
    console.log(`WRITING FILE: ${filePath}`);
    console.log(`WRITING FILE: ${lines.length}`);

    fse.rmSync(filePath);

    var writer = fse.createWriteStream(filePath);

    for(var i = 0; i < lines.length; i++)
    {
        console.log(lines[i]);
        writer.write(lines[i]);
        writer.write("\n");
    }

    writer.end();
}