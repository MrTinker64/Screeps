var minimumNumberOfHarvesters = 2;
var maxNumberOfHarvesters = 10;
var minimumNumberOfUpgraders = 1;
var maxNumberOfUpgradersFromSource = 3;
var maxNumberOfConstructioneers = 4;

/** 
 * @param {string} role, 
 * @param body, 
 * @param {string} namePrefix
**/
function spawnCreep(role, body, namePrefix) {
    var newName = namePrefix + ' ' + Game.time;
    Game.spawns['Spawn1'].spawnCreep(body, newName, { memory: { role: role, working: false } });
}

module.exports = {
    manageSpawns: function () {
        var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var numberOfUpgradersFromSource = _.sum(Game.creeps, (c) => c.memory.role == 'upgraderFromSource');

        if (numberOfHarvesters < minNumberOfHarvesters) {
            spawnCreep('harvester', [WORK, CARRY, MOVE, MOVE], 'Harvester');
        }
        else if (numberOfUpgraders < minimumNumberOfUpgraders) {
            spawnCreep('upgrader', [WORK, WORK, CARRY, MOVE], 'Upgrader');
        }
        else if (numberOfHarvesters < maxNumberOfHarvesters) {
            spawnCreep('harvester', [WORK, CARRY, MOVE, MOVE], 'Harvester');
        }
        else if (numberOfUpgradersFromSource < maxNumberOfUpgradersFromSource) {
            spawnCreep('upgraderFromSource', [WORK, CARRY, MOVE, MOVE], 'UpgraderFromSource');
        }
    }
};