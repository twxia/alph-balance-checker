'use strict';

var commander = require('commander');

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const checkBalance = (address) => __async(void 0, null, function* () {
  const result = yield fetch(
    `https://wallet.mainnet.alephium.org/addresses/${address}/balance`
  ).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    return response.json().then((data) => {
      throw data;
    });
  }).then((data) => {
    return data;
  }).catch((error) => {
    throw error;
  });
  return result;
});

const program = new commander.Command();
program.version("1.0.0").description("ALPH Balance Checker").argument("<address>", "The address to be checked").action((address) => {
  checkBalance(address).then((result) => {
    console.log(`Balance: ${result.balanceHint}`);
  }).catch((error) => {
    console.error(error);
  });
}).parse(process.argv);
