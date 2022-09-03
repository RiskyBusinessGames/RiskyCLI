const { join } = require('path');
const path = require('path');
const replaceInFiles = require('replace-in-files');
const shell = require("shelljs");
const fse = require('fs-extra');


module.exports=
{
    join:function join()
    {
        //console.log(arguments);

        var joinedPath = "";

        Object.keys(arguments).forEach(key => {
            joinedPath = path.join(joinedPath, arguments[key]);
        });

        
        //console.log(joinedPath);

        joinedPath = joinedPath.replace(/\\/g,"/");

        //console.log(joinedPath);
        return joinedPath;
    },

    templateFiles: async function(filePath, regexs, values)
    {
        for (var i = 0; i < regexs.length; i++) {
            try {
    
                console.log(`\nutilities.templateFiles():\n\treplacing "${regexs[i]} with ${values[i]}"`);
    
                var options = {
                    files: `${filePath}/**/*`,
    
                    from: regexs[i],  // string or regex
                    to: values[i] // string or fn  (fn: carrying last argument - path to replaced file)
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
    

    },

    renameFiles: async function(filePath, regexs, values)
    {
        filePath = path.relative("./", filePath).replace(/\\/g,"/");

        for (var i = 0; i < regexs.length; i++) 
        {
            console.log(`\nutilities.templateFiles():\n\trenaming files "${regexs[i]} with ${values[i]}"\n\tpath="${filePath}"`);
    
            var globPath=`${filePath}/**`;
            console.log("\tglobPath="+globPath);

            await shell.exec(`${__dirname}/node_modules/.bin/renamer --find \"${regexs[i]}\" --replace \"${values[i]}\" \"${globPath}\"`, { silent: false });
        }
    },

    addInstallerEntry: function(filePath, string)
    {
        console.log(`\nutilities.addInstallerEntry():\n\tNOT IMPLEMENTED\n\tpath=${filePath}\n\tstring=${string}`);
    },

    createTempDir: function()
    {
        console.log(`utilities.createTempDir():`);


        var tempDir= join(__dirname, "temp");
        console.log(`\n\tpath=${tempDir}`);

        if (fse.existsSync(tempDir)){
            console.log("\talready exists, deleting...");
            fse.rmSync(tempDir, { recursive: true, force: true });
        }
        
        console.log("\tcreated temp dir");
        fse.mkdirSync(tempDir, { recursive: true });

        return tempDir;
    }
};


function changesSum(countOfMatchesByPaths)
{
    var count = 0;
    Object.keys(countOfMatchesByPaths[0]).forEach(key => {
        count += countOfMatchesByPaths[0][key];
    });
    return count;
}