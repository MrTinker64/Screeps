module.exports = {
    getEnergyFromSource: function (creep) {
        // find closest source
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        // try to harvest energy, if the source is not in range
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            // move towards the source
            creep.moveTo(source);
        }
    },

    transferEnergyToStructure: function (creep, structure) {
        // try to transfer energy, if the spawn is not in range
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { //  && creep.memory.building == false
            // move towards the spawn
            creep.moveTo(structure);
        }
        else if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_FULL) {
            roleUpgraderFromSource.run(creep);
        }
    },

    checkWorkingState: function (creep) {
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
    }
};