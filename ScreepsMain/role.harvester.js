var roleUpgraderFromSource = require('role.upgraderFromSource');
var utils = require('utilities');

module.exports = {
    /** @param {Creep} creep **/
    run: function (creep) {
        utils.checkWorkingState(creep);

        // if creep is supposed to transfer energy to the spawn
        if (creep.memory.working == true) {
            if (utils.transferEnergyToStructure(creep, Game.spawns.Spawn1) == ERR_FULL) {
                roleUpgraderFromSource.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            utils.getEnergyFromSource(creep);
        }
    }
};