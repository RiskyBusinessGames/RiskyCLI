const { join } = require('path');
const path = require('path');
const fse = require('fs-extra');
const fileUtils = require('./fileUtils');

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

        filePath = path.relative("./", filePath).replace(/\\/g,"/");

        Object.keys(regexs).forEach(async key => {
            await fileUtils.replaceInFileContent(filePath, regexs[key], values[key]);
        });  
    },

    renameFiles: async function(filePath, regexs, values)
    {
        filePath = path.relative("./", filePath).replace(/\\/g,"/");

        Object.keys(regexs).forEach(async key => {
            await fileUtils.replaceInFileNames(filePath, regexs[key], values[key]);
        });        
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