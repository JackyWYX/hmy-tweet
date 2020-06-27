const Migrations = artifacts.require("TweetRegistry");

var args = require('minimist')(process.argv.slice(2), {boolean: ['registry']});

module.exports = function(deployer) {
    if (args['registry']) {
        console.log("deploying tweet registry");
        deployer.deploy(Migrations);
    }
};