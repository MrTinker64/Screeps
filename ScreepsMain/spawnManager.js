var minNumberOfHarvesters = 2;
var maxNumberOfHarvesters = 10;
var maxNumberOfUpgradersFromSource = 1;
var maxNumberOfConstructioneers = 15;

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
        var numberOfUpgradersFromSource = _.sum(Game.creeps, (c) => c.memory.role == 'upgraderFromSource');
        var numberOfConstructioneers = _.sum(Game.creeps, (c) => c.memory.role == 'constructioneer');
        var standardBodyParts = [WORK, CARRY, MOVE, MOVE];

        if (numberOfHarvesters < minNumberOfHarvesters) {
            spawnCreep('harvester', standardBodyParts, 'Harvester');
        }
        else if (numberOfUpgradersFromSource < maxNumberOfUpgradersFromSource) {
            spawnCreep('upgraderFromSource', standardBodyParts, 'UpgraderFromSource');
        }
        else if (numberOfHarvesters < maxNumberOfHarvesters) {
            spawnCreep('harvester', standardBodyParts, 'Harvester');
        }
        else if (numberOfConstructioneers < maxNumberOfConstructioneers) {
            spawnCreep('constructioneer', standardBodyParts, 'Constructioneer');
        }
    }
};