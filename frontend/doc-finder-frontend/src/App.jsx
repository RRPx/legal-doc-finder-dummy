import { useState } from "react";
import Search from "./components/Search";
import ResponseSummary from "./components/ResponseSummary";

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-8">
        ⚖️ Legal Document Search Portal
      </h1>
      <Search onSearch={handleSearch} loading={loading} />
      <ResponseSummary result={result} error={error} />
    </div>
  );
}

export default App;
