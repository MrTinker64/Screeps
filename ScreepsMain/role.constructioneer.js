var utils = require('utilities');

module.exports = {
    /** @param {Creep} creep **/
    run: function (creep) {
        utils.checkWorkingState(creep);

        // if creep is supposed to build
        if (creep.memory.working == true) {
            // try to build
            const buildSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (buildSite) {
                if (creep.build(buildSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildSite);
                }
            }
            // if no build sites then repair
            else {
                var repairTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                });
                if (repairTargets.length > 0) {
                    if (creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repairTargets[0]);
                    }
                }
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            utils.getEnergyFromSource(creep);
        }
    }
};