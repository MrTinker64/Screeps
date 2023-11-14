var spawnManager = require('spawnManager');
var rolesManager = require('rolesManager');

module.exports.loop = function () {
    // clear stale memory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    rolesManager.handleRoles();

    spawnManager.manageSpawns();
};