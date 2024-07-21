package main

import (
	"fmt"

	"github.com/spf13/cobra"
	"github.com/twxia/alph-checker/internal/balance"
)

func main() {
	rootCmd := &cobra.Command{
		Use:   "alphbalance [address]",
		Short: "ALPH Balance Checker",
		Long:  `ALPH Balance Checker checks the balance of a given ALPH address.`,
		Args:  cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			address := args[0]
			bc := balance.NewClient("https://wallet.mainnet.alephium.org")
			balance, err := bc.CheckAlphBalance(address)
			if err != nil {
				fmt.Printf("Error fetching balance: %v", err)
				return
			}
			fmt.Printf("Balance: %s\n", balance.BalanceHint)
		},
	}

	if err := rootCmd.Execute(); err != nil {
		fmt.Printf("Error executing command: %v", err)
	}
}
