import { argv } from "node:process";

const isKey = (str) => str.startsWith("--");
const not =
  (func) =>
  (...args) =>
    !func(...args);

export const parseArgs = () => {
  const cliArguments = argv.slice(2);
  const keys = cliArguments.filter(isKey).map((str) => str.slice(2));
  const values = cliArguments.filter(not(isKey));

  let argsMap = {};
  for (const [index, value] of keys.entries()) {
    const [key, data] = value.split('=');
    argsMap[key] = data;
  }

  return argsMap;
};
