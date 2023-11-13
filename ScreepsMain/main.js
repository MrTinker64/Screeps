var roleHarvester = require('./roles/role.harvester');
var roleUpgrader = require('./roles/role.upgrader');
var roleUpgraderFromSource = require('./roles/role.upgraderFromSource');
var spawnManager = require('spawnManager');

module.exports.loop = function () {
    // clear stale memory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    
    // for every creep name in Game.creeps
    for (let name in Game.creeps) {

        // get the creep object
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'upgraderFromSource') {
            roleUpgraderFromSource.run(creep);
        }
    }

    spawnManager.manageSpawns();
};