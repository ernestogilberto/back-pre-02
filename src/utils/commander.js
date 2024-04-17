import {Command} from 'commander';

const program = new Command();

program.option('-m, --mode <mode>', 'set mode', 'development')
program.parse()

export {program}