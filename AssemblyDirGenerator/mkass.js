#!/usr/bin/env node

const fse = require('fs-extra');
var glob = require('glob');
var path = require('path');
const shell = require("shelljs");
const replaceInFiles = require('replace-in-files');

const REGEXS =
    [
        /{PREFIX}/g,
        /{NAME}/g
    ];

const VALUES = process.argv.slice(2);

console.log(VALUES);

const GIT_USER = "{GIT_USER}";
const GIT_EMAIL = "{GIT_EMAIL}";
const NPM_REGISTRY = "{NPM_REGISTRY}";
const GIT_REPO = "{GIT_REPO}";

var templateDir = `${__dirname}/{NAME}`;
const workingDir = "./";

console.log(templateDir);
console.log(workingDir);

if (VALUES.length != 2) {
    throw new Error("requires 2 args; 'prefix' and 'name'");
}


CreateDir();


async function CreateDir() {

    fse.copySync(`${__dirname}/{NAME}`, `${workingDir}/{NAME}`);

    for (var i = 0; i < REGEXS.length; i++) {
        try {

            console.log(`replacing "${REGEXS[i]} with ${VALUES[i]}"`)

            var options = {
                files: `${workingDir}/**/*`,

                from: REGEXS[i],  // string or regex
                to: VALUES[i] // string or fn  (fn: carrying last argument - path to replaced file)
            };

            var {
                changedFiles,
                countOfMatchesByPaths,
                replaceInFilesOptions
            } = await replaceInFiles(options);
            console.log('Modified files:', changedFiles);
            console.log('Count of matches by paths:', countOfMatchesByPaths);
            console.log('was called with:', replaceInFilesOptions);
        } catch (error) {
            console.log('Error occurred:', error);
        }
    }

    for (var i = 0; i < REGEXS.length; i++) 
    {
        console.log(`renaming files "${REGEXS[i]} with ${VALUES[i]}"`);

        shell.exec(`${__dirname}/../node_modules/.bin/renamer --find \"${REGEXS[i]}\" --replace \"${VALUES[i]}\" \"${workingDir}/**\"`, { silent: false });
    }

    glob(`${workingDir}**/*`, options, function (er, files) {
        
        files.forEach(path => {
            shell.exec(`mkmeta ${path}`);
        });
        
    });
}