let BRL_VALUE = document.getElementById("brl-real");
const CONVERT = document.getElementById("to-convert");
const URL = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL";
const inputRadioDolar = document.getElementById("usd-dolar");
const inputRadioEuro = document.getElementById("eur-euro");
const inputRadioBitcoin = document.getElementById("btc-bitcoin");
const result = document.getElementById("result-area");

async function fetchCurrencyData() {
  try {
    const response = await fetch(URL);
    const coins = await response.json();
    const { USDBRL, EURBRL, BTCBRL } = coins;

    return { USDBRL, EURBRL, BTCBRL };
  } catch (error) {
    console.error("Error fetching currency data: ", error);
  }
}

async function realCurrency() {
  try {
    const { USDBRL, EURBRL, BTCBRL } = await fetchCurrencyData();

    if (USDBRL && EURBRL && BTCBRL) {
      const BRL_REAL = Number(BRL_VALUE.value)
      const USD_VALUE = Number(USDBRL.ask)
      const EUR_VALUE = Number(EURBRL.ask)
      const BTC_VALUE = Number(BTCBRL.ask)

      const USD_BRL_VALUE = BRL_REAL * USD_VALUE
      const EUR_BRL_VALUE = BRL_REAL * EUR_VALUE
      const BTC_BRL_VALUE = BRL_REAL * BTC_VALUE

      if (!BRL_REAL) {
        alert("Digite um valor a ser convertido!");
      }

      if (inputRadioDolar.checked) {
        result.textContent = `R$${USD_BRL_VALUE.toFixed(2)}`
      }

      if (inputRadioEuro.checked) {
        result.textContent = `R$${EUR_BRL_VALUE.toFixed(2)}`
      }

      if (inputRadioBitcoin.checked) {
        result.textContent = `R$${BTC_BRL_VALUE}`
      }

      BRL_VALUE.value = ''

    } else {
      console.log("Failed to fetch currency data.");
    }
  } catch (error) {
    console.error("Error in realCurrency function:", error);
  }
}



CONVERT.addEventListener("click", () => realCurrency());

