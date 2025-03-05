import { useState } from "react";
import { analyzePaper } from "../services/api";
import ReactMarkdown from "react-markdown";
import { BlueCheck, LoadingIcon } from "../assets/Icons";

const Analyzer = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const response = await analyzePaper(text);
      console.log("API Response:", response);

      setResult(response.result || "No analysis found.");
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setResult("An error occurred while analyzing.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analysis_result.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <textarea
        className="w-[400px] max-w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none min-h-[150px] bg-gray-50 placeholder-gray-500"
        placeholder="Paste your paper and let AI do the magic! ✨ "
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className={`bg-blue-600 text-white px-5 py-2.5 rounded-lg mt-3 cursor-pointer shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center justify-center ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "hover:bg-blue-700 active:bg-blue-800"
        }`}
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? (
          <>
            <LoadingIcon />
            Analyzing...
          </>
        ) : (
          "Analyze"
        )}
      </button>

      {result && (
        <div className="mt-6 p-6 bg-white shadow-lg rounded-xl border border-gray-200 transition-all duration-300">
          <h3 className="font-semibold text-xl text-blue-600 mb-3 flex items-center">
            <BlueCheck />
            Analysis Result
          </h3>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>

          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition-all"
            onClick={handleDownload}
          >
            Download Result
          </button>
        </div>
      )}
    </div>
  );
};

export default Analyzer;
