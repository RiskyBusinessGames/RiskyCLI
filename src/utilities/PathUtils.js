import * as path from "path"
import glob from "glob"
import * as fs from 'fs'

export default
{
    GetPackageRoot,
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

function GetPackageRoot()
{
    let filePath = ".";
    
    let counter = 0;
    while(counter !== 10)
    {
        let packagePath = `${filePath}/package.json`
        if(Exists(packagePath))
        {
            return Resolve(filePath);
        }
        
        filePath = `../${filePath}`;

        counter++;
    }
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