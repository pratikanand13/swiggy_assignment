import { Arena } from "./modules/Arena.js";
import { inputIntegerFromUser, inputStringFromUser } from "./utils/userInput.js";

const inputNewPlayerDetails = async () => {
    const name = await inputStringFromUser("Enter the player's name: ");
    const health = await inputIntegerFromUser(`Enter ${name}'s health: `);
    const attack = await inputIntegerFromUser(`Enter ${name}'s attack: `);
    const strength = await inputIntegerFromUser(`Enter ${name}'s strength: `);

    console.log(`\nNew player details: 
    Name: ${name} 
    Health: ${health} 
    Attack: ${attack} 
    Strength: ${strength}\n`);

    return { name, health, attack, strength };
}

const mainExecuter = async () => {
    const A = new Arena();
    while (true) {
        console.log("\nCurrent Players in the Arena:");
        A.displayPlayers();

        console.log("\nOptions: \n\t1> Add new player\n\t2> Battle\n\t3> End game\n");
        const option = await inputIntegerFromUser("Enter your choice (integer): ");

        if (option === 1) {
            const { name, health, attack, strength } = await inputNewPlayerDetails();
            const playerId = A.addPlayer(name, health, strength, attack);
            if (playerId !== -1) {
                console.log(`\nPlayer '${name}' has been added with ID: ${playerId}\n`);
            }
        } else if (option === 2) {
            if (A.getPlayerCount() < 2) {
                console.log('There should be at least two players in the Arena.\nPlease add more players.\n');
            } else {
                const id_first = await inputIntegerFromUser("Enter the first player's id: ");
                const id_second = await inputIntegerFromUser("Enter the second player's id: ");
                const battleResult = A.battle(id_first, id_second);
                if (battleResult.winner !== undefined) {
                    console.log(`\nBattle result: 
                    Winner: Player with ID ${battleResult.winner} 
                    Loser: Player with ID ${battleResult.loser}\n`);
                }
            }
        } else {
            console.log('Ending the game. Thank you for playing!\n');
            break;
        }

        console.log('\n_____________________________*********END GAME********_____________________________________________________\n\n');
    }
};

mainExecuter();
