import chalk from 'chalk';

const SHADES = ['#00FF00', '#00E600', '#00CC00', '#00B300', '#009900', '#007F00', '#006600', '#004C00', '#003300', '#001A00'];

const getRandomChar = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}

const rows = process.stdout.rows;
const columns = process.stdout.columns;

const stream = [];
for (let i = 0; i < columns; i++)
    stream[i] = Math.floor(Math.random() * rows);

const printRain = async () => {
    console.clear()

    for (let i = 0; i < rows; i++) {
        let line = ""
        for (let j = 0; j < columns; j++) {
            const shade = stream[j] - i
            if (shade >= 0 && shade < 10)
                line += chalk.hex(SHADES[shade])(getRandomChar())
            else if (stream[j] < 10 && rows - i < 10 - stream[j])
                line += chalk.hex(SHADES[stream[j]])(getRandomChar())
            else
                line += ' '
        }

        console.log(line);
    }

    for (let i = 0; i < stream.length; i++)
        stream[i] = (stream[i] + 1) % rows;
}

setInterval(printRain, 100);
