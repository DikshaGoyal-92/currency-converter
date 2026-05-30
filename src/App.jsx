import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { ArrowRightLeft } from "lucide-react";

const currencyOptions = [
  {
    value: "USD",
    label: "USD",
    flag: "https://flagcdn.com/w40/us.png",
  },
  {
    value: "INR",
    label: "INR",
    flag: "https://flagcdn.com/w40/in.png",
  },
  {
    value: "GBP",
    label: "GBP",
    flag: "https://flagcdn.com/w40/gb.png",
  },
  {
    value: "EUR",
    label: "EUR",
    flag: "https://flagcdn.com/w40/eu.png",
  },
  {
    value: "JPY",
    label: "JPY",
    flag: "https://flagcdn.com/w40/jp.png",
  },
  {
    value: "CAD",
    label: "CAD",
    flag: "https://flagcdn.com/w40/ca.png",
  },
  {
    value: "AUD",
    label: "AUD",
    flag: "https://flagcdn.com/w40/au.png",
  },
];

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState(currencyOptions[0]);
  const [to, setTo] = useState(currencyOptions[1]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  
  const API_KEY = import.meta.env.VITE_API_KEY;

  const convertCurrency = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from.value}`
      );

      const rate = response.data.conversion_rates[to.value];

      setResult((amount * rate).toFixed(2));
    } catch (error) {
      console.error(error);
      alert("Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const formatOptionLabel = ({ label, flag }) => (
    <div className="flex items-center gap-2">
      <img
        src={flag}
        alt={label}
        className="w-6 h-4 object-cover"
      />
      <span>{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-black to-slate-800 p-4">

      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Currency Converter
        </h1>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-4 rounded-xl mb-5 bg-white/20 text-white outline-none"
          placeholder="Enter Amount"
        />

        <div className="flex items-center gap-3 mb-5">

          <div className="flex-1">
            <Select
              options={currencyOptions}
              value={from}
              onChange={setFrom}
              formatOptionLabel={formatOptionLabel}
            />
          </div>

          <button
            onClick={swapCurrencies}
            className="bg-blue-500 p-3 rounded-xl text-white"
          >
            <ArrowRightLeft />
          </button>

          <div className="flex-1">
            <Select
              options={currencyOptions}
              value={to}
              onChange={setTo}
              formatOptionLabel={formatOptionLabel}
            />
          </div>

        </div>

        <button
          onClick={convertCurrency}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl font-semibold"
        >
          {loading ? "Converting..." : "Convert"}
        </button>

        {result && (
          <div className="mt-6 text-center bg-white/10 p-5 rounded-xl">

            <h2 className="text-white text-3xl font-bold">
              {result} {to.value}
            </h2>

            <p className="text-gray-300 mt-2">
              {amount} {from.value} = {result} {to.value}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;