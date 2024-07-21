package balance

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCheckBalanceSuccess(t *testing.T) {
	fmt.Printf("TestCheckBalanceSuccess")
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/addresses/ABC/balance" {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(`{"balanceHint":"123 ALPH"}`))
		} else {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(`{"detail":"error"}`))
		}
	}))
	defer ts.Close()

	bc := NewClient(ts.URL)
	balance, err := bc.CheckAlphBalance(
		"ABC",
	)
	assert.NoError(t, err)
	assert.Equal(t, "123 ALPH", balance.BalanceHint)

	_, err = bc.CheckAlphBalance("CBA")
	assert.Error(t, err)
}
