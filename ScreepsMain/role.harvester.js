var roleUpgrader = require('role.upgrader');

module.exports = {
    run: function(creep) {
        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working == true && creep.store[RESOURCE_ENERGY] == 0) {
            // switch state
            creep.memory.working = false;
            creep.memory.building = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()) {
            // switch state
            creep.memory.working = true;
        }
        
        // if creep is supposed to transfer energy to the spawn
        if (creep.memory.working == true) {
            // try to transfer energy, if the spawn is not in range
            if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { //  && creep.memory.building == false
                // move towards the spawn
                creep.moveTo(Game.spawns.Spawn1);
            }
            else if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_FULL) {
                // creep.memory.building = true;
                roleUpgrader.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};