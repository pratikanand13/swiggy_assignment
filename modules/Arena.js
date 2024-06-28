import { rollDice } from "../utils/rollDiceUtil.js"
import { Player } from "./Player.js"

export class Arena {
    constructor() {
        this.total_players = 0;
        this._players = [];
        console.log('Welcome to the game! This is your virtual Arena.\n')
    }

    isPresent(id) {
        return this._players.some(player => player.id === id)
    }

    getPlayerCount() {
        return this._players.length
    }

    validateAttributes(health, strength, attack) {
        if (health <= 0) {
            console.log("Error: Health must be a positive number.");
            return false;
        }
        if (strength <= 0) {
            console.log("Error: Strength must be a positive number.");
            return false;
        }
        if (attack <= 0) {
            console.log("Error: Attack must be a positive number.");
            return false;
        }
        return true;
    }

    addPlayer(name, health, strength, attack) {
        if (!this.validateAttributes(health, strength, attack)) {
            return -1;
        }

        const id = this.total_players;
        const newPlayer = new Player(id, name, health, strength, attack);
        this._players.push(newPlayer);
        this.total_players += 1;

        console.log(`Player added successfully! ID: ${id}, Name: ${name}\n`);
        return id;
    }

    deletePlayer(id) {
        const playerIndex = this._players.findIndex(player => player.id === id);
        if (playerIndex !== -1) {
            const player = this._players[playerIndex];
            console.log(`Player ${player?.name} (ID: ${id}) has been eliminated.\n`);
            this._players.splice(playerIndex, 1);
        } else {
            console.log(`Error: No player with ID = ${id} exists in this virtual arena.\n`);
        }
    }

    displayPlayers() {
        if (this._players.length === 0) {
            console.log("No players in the arena.\n");
            return;
        }

        console.log('|\tID\t|\tName\t|\tHealth\t|\tStrength\t|\tAttack\t|');
        for (const player of this._players) {
            const { id, name, health, strength, attack } = player;
            console.log(`|\t${id}\t|\t${name}\t|\t${health}\t|\t${strength}\t|\t${attack}\t|`);
        }
        console.log('\n');
    }

    battle(id_first, id_second) {
        if (id_first === id_second) {
            console.log('Error: IDs cannot be the same for both players.\n');
            return {};
        }

        const firstPlayer = this._players.find(player => player.id === id_first);
        const secondPlayer = this._players.find(player => player.id === id_second);

        if (!firstPlayer) {
            console.log(`Error: No player with ID = ${id_first} exists.\n`);
            return {};
        } else if (!secondPlayer) {
            console.log(`Error: No player with ID = ${id_second} exists.\n`);
            return {};
        }

        let attacker = firstPlayer;
        let defender = secondPlayer;
        console.log(`\n____________${attacker.name} v/s ${defender.name}____________\n`);

        if (defender.health < attacker.health) {
            [attacker, defender] = [defender, attacker];
        }

        while (defender.health > 0) {
            const attacking_power = attacker.attack * rollDice();
            const defending_power = defender.strength * rollDice();

            console.log(`${attacker.name} hits ${defender.name} with power = ${attacking_power}`);
            console.log(`${defender.name} defends with power = ${defending_power}`);

            if (attacking_power > defending_power) {
                defender.health -= (attacking_power - defending_power);
                defender.health = Math.max(0, defender.health);
            }

            console.log(`${defender.name}'s health: ${defender.health}\n`);

            if (defender.health > 0) {
                [attacker, defender] = [defender, attacker];
            }
        }

        const res = { winner: attacker.id, loser: defender.id };
        console.log(`${attacker?.name} has emerged victorious!!!\n`);
        this.deletePlayer(defender.id);

        return res;
    }
}
