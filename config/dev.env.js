var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    SUP_URL: '"https://wwwapi.pzlive.vip/supadmin/"',
    WAP_URL: '"https://wapdev.pzlive.vip/"'
})