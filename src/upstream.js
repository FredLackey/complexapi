const _ = require('cleaner-node');

const PREFIX = 'UPSTREAM_';

const toUrl = value => {
  let url = _.removePrefix(value, '/');
      url = _.removeSuffix(url, '/');
  return url.startsWith('http') 
    ? url
    : `http://${url}`;
}
const doGet = async (url) => {
  try {
    const response  = await fetch(url);
    const data      = await response.json();
    return data;
  } catch (ex) {
    console.log(JSON.stringify(ex, null, 2));
    return ex.message || 'ERROR';
  }
};

const ping = async () => {
  const results = {};
  const keys = Object.keys(process.env).filter(x => (x && x.startsWith(PREFIX)));
  if (keys.length === 0) {
    return null;
  }
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const url = toUrl(process.env[key]);
    results[key.substring(PREFIX.length)] = await doGet(url) || 'FAIL'
  } 
  return results;
}
const test = async () => {
  const results = {};
  const keys = Object.keys(process.env).filter(x => (x && x.startsWith(PREFIX)));
  if (keys.length === 0) {
    return null;
  }
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const url = toUrl(process.env[key]);
    results[key.substring(PREFIX.length)] = await doGet(url) || 'FAIL'
  } 
  return results;
}

module.exports = {
  ping,
  test
};
