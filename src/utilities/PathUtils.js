const glob = require("glob");
const fs = require("fs");
const path = require("path");

module.exports=
{
    Join,
    GlobSync,
    GetDirs,
    GetFiles,
    IsDir,
    IsFile,
    Resolve,
    IsFileSystemRoot,
    GetRelative,
    Exists,
    CreateDir
}

function Join()
{
    var joinedPath = "";

    Object.keys(arguments).forEach(key => {
        joinedPath = path.join(joinedPath, arguments[key]);
    });

    joinedPath = joinedPath.replace(/\\/g,"/");
    return joinedPath;
}

function GlobSync(globString)
{
    globString = globString.replace(/\\/g, "/");
    return glob.sync(globString);
}

function GetDirs(filePath)
{
    return fs.readdirSync(filePath).filter(function (file) {
        return fs.lstatSync(filePath+'/'+file).isDirectory();
    });
}

function GetFiles(filePath)
{
    return fs.readdirSync(filePath).filter(function (file) {
        return fs.lstatSync(filePath+'/'+file).isFile();
    });
}

function IsDir(filePath)
{
    return fs.lstatSync(filePath).isDirectory();
}

function IsFile(filePath)
{
    return fs.lstatSync(filePath).isFile();
}

function Resolve(filePath)
{
    return path.resolve(filePath).replace(/\\/g, "/");
}

function GetRelative(from, to)
{
    from = Resolve(from);
    to = Resolve(to);
    
    if(from === to)
    {
        return ".";
    }
    
    return path.relative(from, to).replace(/\\/g, "/");
}

const slashRegex=new RegExp('/', 'g');

function IsFileSystemRoot(filePath)
{
    filePath = Resolve(filePath);
    let count =(filePath.match(slashRegex) || []).length;
    return count === 1;
}

function Exists(filePath)
{
    return fs.existsSync(filePath);
}

function CreateDir(filePath)
{
    fs.mkdirSync(filePath);
}