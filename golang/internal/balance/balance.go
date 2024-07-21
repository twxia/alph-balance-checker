package balance

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type TokenBalance struct {
	Balance     string `json:"balance"`
	BalanceHint string `json:"balanceHint"`
}

type Client struct {
	url string
}

func NewClient(url string) Client {
	return Client{url}
}

func (c Client) CheckAlphBalance(address string) (*TokenBalance, error) {
	url := fmt.Sprintf(c.url+"/addresses/%s/balance", address)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		var errResp map[string]interface{}
		bodyBytes, _ := io.ReadAll(resp.Body)
		if err := json.Unmarshal(bodyBytes, &errResp); err != nil {
			return nil, err
		}

		return nil, fmt.Errorf("error fetching balance: %v", errResp)
	}

	var balance TokenBalance
	if err := json.NewDecoder(resp.Body).Decode(&balance); err != nil {
		return nil, err
	}

	return &balance, nil
}
