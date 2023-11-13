var maxNumberOfCreeps = 20;
var minimumNumberOfHarvesters = 2;
var maximumNumberOfHarvesters = Math.floor(maxNumberOfCreeps / 2);
var minimumNumberOfUpgraders = 1;
var maximumNumberOfUpgradersFromSource = Math.floor(maxNumberOfCreeps / 3);

function spawnCreep(role, body, namePrefix) {
    var newName = namePrefix + ' ' + Game.time;
    Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role: role, working: false}});
}

module.exports = {
    manageSpawns: function () {
        var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var numberOfUpgradersFromSource = _.sum(Game.creeps, (c) => c.memory.role == 'upgraderFromSource');
        
        if (numberOfHarvesters < minimumNumberOfHarvesters) {
            spawnCreep('harvester', [WORK, CARRY, MOVE, MOVE], 'Harvester');
        }
        else if (numberOfUpgraders < minimumNumberOfUpgraders) {
            spawnCreep('upgrader', [WORK, WORK, CARRY, MOVE], 'Upgrader');
        }
        else if (numberOfHarvesters < maximumNumberOfHarvesters) {
            spawnCreep('harvester', [WORK, CARRY, MOVE, MOVE], 'Harvester');
        }
        else if (numberOfUpgradersFromSource < maximumNumberOfUpgradersFromSource) {
            spawnCreep('upgraderFromSource', [WORK, CARRY, MOVE, MOVE], 'UpgraderFromSource');
        }
    }
};