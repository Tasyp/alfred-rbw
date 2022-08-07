#!/usr/bin/env node

const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * @typedef {Object} MenuEntry
 * @property {string} title 
 * @property {string} subtitle
 */

/**
 * @return {Promise<MenuEntry[]>}
 */
const getPasswords = async () => {
  const rbwPath = process.env.RBW_PATH !== undefined ? `${process.env.RBW_PATH}/` : '';
  const { stdout } = await exec(`export RBW_AGENT=${rbwPath}rbw-agent;${rbwPath}rbw ls --fields name,user`);
  const rawPasswords = stdout.toString().split('\n');

  /** @type {MenuEntry[]} */
  const parsedPasswords = [];
  for (const rawPassword of rawPasswords) {
    const [name, user] = rawPassword.split('\t');

    if (name == '') {
      continue;
    }

    parsedPasswords.push({ 'title': name, 'subtitle': user });
  }

  return parsedPasswords;
};

/**
 * @typedef {Object} AlfredMenuItem 
 * @property {string} uid 
 * @property {string} title 
 * @property {string} subtitle
 * @property {string} arg
 * @property {string} match
 * @property {string} autocomplete
 * @property {Object} variables
 */

/**
 * @param {MenuEntry[]}  items
 * @returns {string}
 */
const getJSONResponse = (items) => {
  /** @type {AlfredMenuItem[]} */
  const result = [];

  for (const item of items) {
    const fullPath = `${item.title}/${item.subtitle}`;
    result.push({
      uid: fullPath,
      title: item.title,
      subtitle: item.subtitle,
      arg: fullPath,
      match: fullPath,
      autocomplete: fullPath,
      variables: {
        fullPath: fullPath,
        title: item.title,
        subtitle: item.subtitle,
      },
    });
  }

  return JSON.stringify({ items: result });
};

async function main() {
  console.log(getJSONResponse(await getPasswords()));
}

main().then(() => { }).catch(console.error);
