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
            // try to transfer energy, if the controller is not in range
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // move towards the spawn
                creep.moveTo(creep.room.controller);
            }
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