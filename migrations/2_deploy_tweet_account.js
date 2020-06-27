const Migrations = artifacts.require("TweetAccount");

let args = require('minimist')(process.argv.slice(2), {
    boolean: ['account'],
});

module.exports = function(deployer) {
    if (args['account']) {
        console.log("deploying tweet account");
        deployer.deploy(Migrations);
    }
};
