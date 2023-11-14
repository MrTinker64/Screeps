var utils = require('utilities');

module.exports = {
    run: function(creep) {
        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working == true && creep.store[RESOURCE_ENERGY] == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()) {
            // switch state
            creep.memory.working = true;
        }
        
        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working == true) {
            // try to transfer energy
            utils.transferEnergyToStructure(creep, creep.room.controller);
        }
        // if creep is supposed to harvest energy from source
        else {
            utils.getEnergyFromSource(creep);
        }
    }
};