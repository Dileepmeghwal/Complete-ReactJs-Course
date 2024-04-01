import { useEffect, useState } from "react";

export const useGatCurrency = (amount, from, to) => {
  const [rate, setRate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState([]);

  async function convertCurrency() {
    if (!amount) return;
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}=1&from=${from}&to=${to}`
      );
      const data = await res.json();
      console.log(data);

      setRate(data.rates[to] + "" + to);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const res = await fetch(`https://api.frankfurter.app/currencies`);
        const data = await res.json();
        console.log(data);
        setCurrency(Object.keys(data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrency();
  }, []);

  return {
    rate,
    isLoading,
    convertCurrency,
    currency,
    setCurrency,
  };
};
