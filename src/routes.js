const _         = require('cleaner-node');
const router    = require('express').Router();
const pkg       = require('../package.json');
const upstream  = require('./upstream');

const BASE_URL = process.env.NODE_BASE ? `/${process.env.NODE_BASE}` : '';

const getStatus = () => ({
  name  : pkg.name,
  alias : process.env.NODE_ALIAS || '(not set)',
  base  : process.env.NODE_BASE || '(not set)',
  desc  : pkg.description,
  env   : process.env.NODE_ENV || '(not set)',
  ver   : pkg.version,
  date  : (new Date()).toISOString()
})

router.use((req, res, next) => {
  console.log(JSON.stringify({
    url: `${req.method} ${req.url}`,
    body: req.body
  }, null, 2));
  return next();
});

const sendStatus = async (req, res) => {
  const data = getStatus();
  data.vars = _.getVars();
  data.tests = await upstream.ping();
  return res.json(data);
}
const testAll = async (req, res) => {
  const data = getStatus();
  data.vars = _.getVars();
  data.tests = await upstream.test();
  return res.json(data);
}
const sendPing = (req, res) => {
  const data = getStatus();
  return res.json(data);
}

router.get(`${BASE_URL}/status`,  _.express.wrap(sendStatus));
router.get(`${BASE_URL}/test`,    _.express.wrap(testAll));
router.get(`${BASE_URL}/`,        sendPing);

if (BASE_URL) {
  router.get(`/`, sendPing);  
}

module.exports = router;

