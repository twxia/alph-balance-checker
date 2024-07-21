import { Command } from "commander";
import { checkBalance } from "./balance";

const program = new Command();

program
  .version("1.0.0")
  .description("ALPH Balance Checker")
  .argument("<address>", "The address to be checked")
  .action((address) => {
    checkBalance(address)
      .then((result) => {
        console.log(`Balance: ${result.balanceHint}`);
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .parse(process.argv);
