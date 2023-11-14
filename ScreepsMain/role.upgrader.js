var utils = require('utilities');

module.exports = {
    run: function(creep) {
        utils.checkWorkingState(creep);
        
        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working == true) {
            utils.transferEnergyToStructure(creep, creep.room.controller);
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = Game.spawns['Spawn1'];
            // try to harvest energy, if the source is not in range
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};