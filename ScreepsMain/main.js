var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    // clear stale memory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    
    // for every creep name in Game.creeps
    for (let name in Game.creeps) {

        // get the creep object
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        
        var maximumNumberOfHarvesters = 30;
        var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        // console.log(numberOfHarvesters);
        var minimumNumberOfUpgraders = 1;
        var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        // console.log(numberOfUpgraders);
        
        if (numberOfHarvesters < 1){
            var newName = 'Harvester ' + Game.time;
            // Attempt to spawn the new creep
            if (_.isString(Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester', working: false}}))) {
                console.log('Spawned new harvester creep: ' + newName);   
            }
        }
        else if (numberOfUpgraders < minimumNumberOfUpgraders) {
            var newName = 'Upgrader ' + Game.time;
            // console.log('Attempting to spawn an upgrader');
            // if (_.isString(Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader', working: false}}))) {
            //     console.log('Spawned new upgrader creep: ' + newName);   
            // }
            if (_.isString(Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader', working: false}}))) {
                console.log('Spawned new upgrader creep: ' + newName);   
            }
        }
        else if (numberOfHarvesters < maximumNumberOfHarvesters){
            var newName = 'Harvester ' + Game.time;
            // console.log('Attempting to spawn a harvester');
            // Attempt to spawn the new creep
            if (_.isString(Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester', working: false}}))) {
                console.log('Spawned new harvester creep: ' + newName);   
            }
        }
    }
};