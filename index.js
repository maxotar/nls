#!/usr/bin/env node

const { readdir, lstat } = require("fs").promises;
const path = require("path");
const chalk = require("chalk");

const dir = process.argv[2] || process.cwd();

async function main() {
  try {
    const filenames = await readdir(dir);
    const filepaths = filenames.map((filename) => path.join(dir, filename));
    const lstatResults = await Promise.all(filepaths.map(lstat));

    filenames.forEach((filename, index) =>
      lstatResults[index].isFile()
        ? console.log(filename)
        : console.log(chalk.bold.green(filename))
    );
  } catch (err) {
    console.error(err);
  }
}

main();
