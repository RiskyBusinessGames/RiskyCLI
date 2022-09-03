const fse = require('fs-extra');
const replaceInFiles = require('replace-in-files');
const shell = require("shelljs");

module.exports=
{
    getFileLines: function (filePath)
    {
        var file = fse.readFileSync(filePath, 'utf-8');
        var lines = file.split(/\r?\n/);

        return lines;
    },

    writeFileLines: function (filePath, lines)
    {
        var writer = fse.createWriteStream(filePath);

        lines.forEach(line => {
            writer.write(line);
            writer.write("\n");
        });

        writer.end();
    },
    replaceInFileNames: async function(filePath, regex, value)
    {
        console.log(`\nutilities.templateFiles():\n\trenaming files "${regex} with ${value}"\n\tpath="${filePath}"`);
            
        var globPath=`${filePath}/**`;
        console.log("\tglobPath="+globPath);

        await shell.exec(`${__dirname}/node_modules/.bin/renamer --find \"${regex}\" --replace \"${value}\" \"${globPath}\"`, { silent: false });
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