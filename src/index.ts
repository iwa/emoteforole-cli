import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';

// initializes and displays the welcome screen
const init = async () => {
    console.clear();
    console.log(
        chalk.green(
            figlet.textSync('EmoteFoRole', {
                horizontalLayout: 'full',
            })
        )
    );
}


const run = async () => {
    init();
};

run()