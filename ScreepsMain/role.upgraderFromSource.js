var utils = require('utilities');

module.exports = {
    /** @param {Creep} creep **/
    run: function (creep) {
        utils.checkWorkingState(creep);

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