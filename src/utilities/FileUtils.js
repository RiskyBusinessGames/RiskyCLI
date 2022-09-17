const { writeFileSync, readFileSync, rmSync, createWriteStream } = require('fs');

module.exports= {
    GetFileLines,
    WriteFileLines,
    WriteFile,
    ReadFile
}

function WriteFile(filePath, fileContents)
{
    try {
        writeFileSync(filePath, fileContents, "utf8");
        //console.log(`File Write:\n\t${filePath}\n\t${fileContents}`);
    }
    catch (ex)
    {
        throw ex;
    }
}

function ReadFile(filePath)
{
    try {
        return readFileSync(filePath, "utf8");
        //console.log(`File Write:\n\t${filePath}\n\t${fileContents}`);
    }
    catch (ex)
    {
        throw ex;
    }
}

function GetFileLines(filePath)
{
    let file = readFileSync(filePath, "utf8");
    let lines = file.split(/\r?\n/);

    console.log(`READING FILE: ${filePath}`);
    console.log(`READING FILE: ${lines.length}`);

    return lines;
}

function WriteFileLines(filePath, lines)
{
    console.log(`WRITING FILE: ${filePath}`);
    console.log(`WRITING FILE: ${lines.length}`);

    //rmSync(filePath);

    let writer = createWriteStream(filePath);

    for(let i = 0; i < lines.length; i++)
    {
        //console.log(lines[i]);
        writer.write(lines[i]);
        writer.write("\n");
    }

    writer.end();
}