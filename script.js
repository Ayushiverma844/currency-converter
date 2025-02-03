const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // Correct API URL
  const URL = `https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/${fromCurr.value}`;

  try {
    let response = await fetch(URL);
    let data = await response.json();

    if (data.result !== "success") {
      msg.innerText = "Error fetching exchange rates!";
      return;
    }

    // Correct way to get exchange rate
    let rate = data.conversion_rates[toCurr.value];

    if (!rate) {
      msg.innerText = "Conversion rate not available!";
      return;
    }

    let finalAmount = (amtVal * rate).toFixed(2); // Round to 2 decimal places
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    msg.innerText = "Failed to fetch exchange rate!";
  }
};
