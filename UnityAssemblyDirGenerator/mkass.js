const fse = require('fs-extra');
var glob = require( 'glob' );  

const PREFIX=/{PREFIX}/g;
const NAME=/{NAME}/g;
const GIT_USER="{GIT_USER}";
const GIT_EMAIL="{GIT_EMAIL}";
const NPM_REGISTRY="{NPM_REGISTRY}";
const GIT_REPO="{GIT_REPO}";

const templateDir = `${__dirname}/{NAME}`;
const workingDir="./";

console.log(templateDir);
console.log(workingDir);

const args = process.argv.slice(2);
const prefixValue = args[0];
const nameValue = args[1];

console.log("nameValue="+nameValue);
console.log("prefixValue="+prefixValue);

if(args.length != 2)
{
    throw new Error("requires 2 args; 'prefix' and 'name'");
}

console.log(args);

glob( `${templateDir}/**/*`, function( err, paths ) {
  
  paths.forEach((path) => {
    TemplateFile(path);
    RenameFile(path);
  });
});

function RenameFile(path)
{
    var newPath = path.replace(PREFIX, prefixValue);
    newPath = newPath.replace(NAME, nameValue);

    console.log(path);
    console.log(newPath);

    //fse.copySync(path, newPath);
}

function TemplateFile(path)
{

}