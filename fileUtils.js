const fse = require('fs-extra');
const replaceInFiles = require('replace-in-files');
const shell = require("shelljs");

module.exports=
{
    getFileLines: function (filePath)
    {
        var file = fse.readFileSync(filePath, 'utf-8');
        var lines = file.split(/\r?\n/);

        console.log(`READING FILE: ${filePath}`);
        console.log(`READING FILE: ${lines.length}`);

        return lines;
    },

    writeFileLines: function (filePath, lines)
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

        //writer.end();
    },
    replaceInFileNames: async function(filePath, regex, value)
    {
        console.log(`\nutilities.templateFiles():\n\trenaming files "${regex} with ${value}"\n\tpath="${filePath}"`);
            
        var globPath=`${filePath}/**`;
        console.log("\tglobPath="+globPath);

        await shell.exec(`${__dirname}/node_modules/.bin/renamer --find \"${regex}\" --replace \"${value}\" \"${globPath}\"`, { silent: true });
    },
    replaceInFileContent: async function(filePath, regex, value)
    {
        try {
    
            console.log(`\nutilities.templateFiles():\n\treplacing "${regex} with ${value}"`);

            var options = {
                files: `${filePath}/**/*`,

                from: regex,  // string or regex
                to:value // string or fn  (fn: carrying last argument - path to replaced file)
            };

            var {countOfMatchesByPaths} = await replaceInFiles(options);

            console.log(`\treplaced: ${changesSum(countOfMatchesByPaths)} instances`);
        }
        catch (error)
        {
            console.log('\tError occurred:', error);
            throw error;
        }
    }
}

function changesSum(countOfMatchesByPaths)
{
    var count = 0;
    Object.keys(countOfMatchesByPaths[0]).forEach(key => {
        count += countOfMatchesByPaths[0][key];
    });
    return count;
}