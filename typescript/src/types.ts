// {
//     "balance": "7055593871690000000000",
//     "balanceHint": "7055.59387169 ALPH",
//     "lockedBalance": "0",
//     "lockedBalanceHint": "0 ALPH",
//     "tokenBalances": [
//       {
//         "id": "5bf2f559ae714dab83ff36bed4d9e634dfda3ca9ed755d60f00be89e2a20bd00",
//         "amount": "310515852220662643245"
//       },
//       {
//         "id": "eb220949deae1e755cf06b944e700c4662f790a7b2a7656da4755cfa73f30700",
//         "amount": "9605660000000"
//       },
//       {
//         "id": "0beffdfa642818060ca796ff770bb42d437c93f4f5c381ef89b226ec6ae5f500",
//         "amount": "222222"
//       }
//     ],
//     "utxoNum": 10
//   }

export interface TokenBalance {
  balance: string;
  balanceHint: string;
}
