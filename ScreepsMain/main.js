var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

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
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        
        var maximumNumberOfHarvesters = 30;
        var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        // console.log(numberOfHarvesters);
        var minimumNumberOfUpgraders = 1;
        var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        // console.log(numberOfUpgraders);
        var minimumNumberOfBuilders = 2;
        var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        // console.log(numberOfBuilders);
        var minimumNumberOfRepairers = 2;
        var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
        // console.log(numberOfRepairers);
        
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
        // else if (numberOfRepairers < minimumNumberOfRepairers){
        //     var newName = 'Repairer ' + Game.time;
        //     // Attempt to spawn the new creep
        //     if (_.isString(Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'repairer', working: false}}))) {
        //         console.log('Spawned new repairer creep: ' + newName);   
        //     }
        // }
        // else if (numberOfBuilders < minimumNumberOfBuilders) {
        //     var newName = 'Builder ' + Game.time;
        //     // Attempt to spawn the new creep
        //     if (_.isString(Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder', working: false}}))) {
        //         console.log('Spawned new builder creep: ' + newName);   
        //     }
        // }
    }
};

// for(var name in Game.creeps) {     var creep = Game.creeps[name];     if(creep.memory.role == 'builder') {         creep.memory.role = 'harvester';     } }