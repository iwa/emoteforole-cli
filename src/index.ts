import fs from 'fs';
import dotenv from 'dotenv';
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import clui from 'clui';
const Spinner = clui.Spinner;

// initializes and displays the welcome screen
async function init() {
    console.clear();
    console.log(
        chalk.green(
            figlet.textSync('EmoteFoRole', {
                horizontalLayout: 'full',
            })
        )
    );
}

async function checkDiscordCredentials() {
    const spinner = new Spinner('Checking Discord Credentials...');
    spinner.start();
    let exists = false;

    dotenv.config();

    if (process.env.DISCORD_SECRET)
        exists = true;

    fs.access('./.env', fs.constants.F_OK, (err) => {
        if (err) {
            exists = false;
        }
        exists = true;
    });

    spinner.stop();
    if (exists)
        console.log(chalk.green('Discord Credentials Accessible 👍'));
    else {
        console.log(chalk.red('No Discord Credentials Registered ❌'));
        await registerDiscordCredentials();
    }
};

async function registerDiscordCredentials() {
    let questions = [
        {
            name: 'DISCORD_SECRET',
            type: 'password',
            message: 'Enter your Discord Bot Secret:'
        },
    ]
    return inquirer.prompt(questions).then(answers => {
        process.env.DISCORD_SECRET = answers.DISCORD_SECRET;
        updateDiscordSecretEnv(`DISCORD_SECRET="${answers.DISCORD_SECRET}"`);
    })
};

function updateDiscordSecretEnv(text: string) {
    fs.writeFile('.env', text, (err) => {
        if (err) throw err;
        console.log(chalk.bold(chalk.green('  Secret Saved ✅')));
    });
}


async function run() {
    await init();
    await checkDiscordCredentials();
};

run()