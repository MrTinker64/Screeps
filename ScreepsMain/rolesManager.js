var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleUpgraderFromSource = require('role.upgraderFromSource');

module.exports = {
    handleRoles: function () {
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
    }
};