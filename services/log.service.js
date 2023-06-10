import chalk from 'chalk';
import dedent from 'dedent-js';

export const printError = (msg) => {
    console.log(chalk.red(`Error: ${msg}`))
}

export const printSuccess = (msg) => {
    console.log(chalk.green(`Success: ${msg}`))
}

export const printHelp = () => {
    console.log(
    dedent`${chalk.cyan(`Help:`)}
        Без параметров - вывод погоды;
        -s [CITY] для установки города;
        -h для вывода помощи;
        -t [API_KEY] для сохранения токена;
    `)
}