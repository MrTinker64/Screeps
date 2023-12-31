var pathStyling = true;
var reusePathTickAmount = 5;

function creepMoveTo(creep, target) {
    if (pathStyling) {
        creep.moveTo(target, { reusePath: reusePathTickAmount, pathStyling: {} });
    }
    else {
        creep.moveTo(target, { reusePath: reusePathTickAmount });
    }
}

module.exports = {
    pathStyling,

    /** @param {Creep} creep **/
    getEnergyFromSource: function (creep) {
        // find closest source
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        // try to harvest energy, if the source is not in range
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            // move towards the source
            creepMoveTo(creep, source);
        }
    },

    /** @param {Creep} creep, @param {Structure} structure **/
    transferEnergyToStructure: function (creep, structure) {
        var err = creep.transfer(structure, RESOURCE_ENERGY);
        // try to transfer energy, if the spawn is not in range
        if (err == ERR_NOT_IN_RANGE) {
            // move towards the spawn
            creepMoveTo(creep, structure);
        }
        return err;
    },

    /** @param {Creep} creep **/
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