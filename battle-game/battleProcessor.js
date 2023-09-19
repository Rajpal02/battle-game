const Queue = require("bull");
const Battle = require("./models/battle");
const Player = require("./models/player");

// Create a Bull queue for processing battles
const battleQueue = new Queue("battles", {
  limiter: {
    max: 1, // Maximum number of jobs that can be processed at a time
    duration: 1000, // Time frame (in milliseconds) for the maximum job count
  },
});

// Define a worker to process battles
const battleWorker = new Queue("battles", async (job) => {
  const { battleId } = job.data;

  try {
    // Fetch the battle document
    const battle = await Battle.findById(battleId);

    if (!battle) {
      throw new Error("Battle not found");
    }

    // Check if the battle is already processed
    if (battle.status === "completed") {
      return;
    }

    // Fetch the attacker and defender players
    const attacker = await Player.findById(battle.attacker);
    const defender = await Player.findById(battle.defender);

    if (!attacker || !defender) {
      throw new Error("Attacker or defender not found");
    }

    // Implement your battle logic here
    const { damage, goldStolen, battleReport } = simulateBattle(
      attacker,
      defender
    );

    // Update resources, battle status, and battle report
    attacker.gold += goldStolen;
    defender.gold -= goldStolen;
    defender.hitPoints -= damage;

    battle.status = "completed";
    battle.battleReport = battleReport;

    // Save changes to the database
    await Promise.all([attacker.save(), defender.save(), battle.save()]);

    // Acknowledge job completion
    job.progress(100);
  } catch (error) {
    // Log the error and handle it
    console.error("Error processing battle:", error);

    // Handle errors and possibly retry the job
    job.attemptsMade < 3 ? job.retry(error) : job.fail(error);
  }
});

function simulateBattle(attacker, defender) {
  // Initialize battle report
  let battleReport = "";

  // Calculate the maximum damage an attacker can deal (50% of their attack value)
  const maxDamage = Math.floor(attacker.attack * 0.5);

  // Initialize hit points for both players
  let attackerHitPoints = attacker.hitPoints;
  let defenderHitPoints = defender.hitPoints;

  // Perform the battle rounds
  let round = 1;

  while (attackerHitPoints > 0 && defenderHitPoints > 0) {
    // Calculate damage for the attacker (random value between 1 and maxDamage)
    const damage = Math.floor(Math.random() * maxDamage) + 1;

    // Apply damage to the defender's hit points
    defenderHitPoints -= damage;

    // Append battle report for this round
    battleReport += `Round ${round}: ${attacker.name} attacks ${defender.name} for ${damage} damage.\n`;

    // Swap attacker and defender for the next round
    [attackerHitPoints, defenderHitPoints] = [
      defenderHitPoints,
      attackerHitPoints,
    ];

    // Increment the round counter
    round++;
  }

  // Determine the battle outcome
  let battleOutcome = "";
  if (attackerHitPoints <= 0 && defenderHitPoints <= 0) {
    battleOutcome = "The battle ended in a draw.";
  } else if (attackerHitPoints <= 0) {
    battleOutcome = `${defender.name} wins the battle.`;
  } else {
    battleOutcome = `${attacker.name} wins the battle.`;
  }

  // Concatenate the battle outcome to the battle report
  battleReport += `\n${battleOutcome}`;

  // Calculate gold stolen (between 10% and 20% of the defender's gold)
  const goldStolen =
    Math.floor(Math.random() * (0.2 * defender.gold - 0.1 * defender.gold)) +
    0.1 * defender.gold;

  return { damage, goldStolen, battleReport };
}

module.exports = { battleQueue, battleWorker };
