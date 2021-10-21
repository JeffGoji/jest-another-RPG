const inquirer = require("inquirer");
const Enemy = require("./Enemy");
const Player = require("./Player");

//Game function:
function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

//Game initialize method:
Game.prototype.initializeGame = function () {
  //Setup our Enemy and player Objects:
  this.enemies.push(new Enemy("goblin", "sword"));
  this.enemies.push(new Enemy("orc", "baseball bat"));
  this.enemies.push(new Enemy("skeleton", "axe"));

  //Keeps track of which enemy object is fighting:
  this.currentEnemy = this.enemies[0];

  //Inquirer prompts for the game:
  inquirer
    .prompt({
      type: "text",
      name: "name",
      message: "What is your name?",
    })
    // destructure name from the prompt object
    .then(({ name }) => {
      this.player = new Player(name);

      // test the object creation
      console.log(this.currentEnemy, this.player);
    });
};

module.exports = Game;
