import { useState } from "react";
import Header from "./Components/Header.jsx";
import LyricSnippet from "./Components/LyricSnippet.jsx";
import Loader from "./Components/Loader.jsx";
import Result from "./Components/Result.jsx";
import Hint from "./Components/Hint.jsx";

function App() {
  const [lyricSnippet, setLyricSnippet] = useState(null);
  const [hints, setHints] = useState([]);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  const [result, setResult] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [actualTitle, setActualTitle] = useState(null);

  const lyricFetcher = async () => {
    setLoadingLyrics(true);
    try {
      const response = await fetch("/api/fetchLyrics");
      const data = await response.json();
      setLyricSnippet(data.snippet);
      setActualTitle(data.actualTitle);
      setHints(data.hints || []);
      setCurrentHintIndex(0);
      setShowHint(false);
    } catch (error) {
      console.error("Error fetching lyrics:", error);
    } finally {
      setLoadingLyrics(false);
    }
  };

  const inputHandler = async (e) => {
    e.preventDefault();
    setLoadingResult(true);

    const inputValue = e.target[0].value;
    try {
      const response = await fetch("/api/check-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAnswer: inputValue, actualTitle }),
      });
      const data = await response.json();
      if (data.isCorrect) {
        setResult("Correct Answer!");
      } else {
        setResult("Wrong Answer");
      }
    } catch (error) {
      console.error("Error verifying answer:", error);
    } finally {
      setLoadingResult(false);
    }
  };

  const showNextHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center p-4">
      <Header />
      {loadingLyrics ? (
        <Loader />
      ) : (
        <>
          <LyricSnippet snippet={lyricSnippet} />

          {hints.length > 0 && (
            <>
              <button
                onClick={() => setShowHint(!showHint)}
                className={`mt-4 px-6 py-2 rounded-full shadow transition ${
                  showHint
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {showHint ? "Hide Hints" : "Show Hints"}
              </button>

              {showHint && (
                <Hint
                  hint={hints[currentHintIndex]}
                  showNextHint={showNextHint}
                  isLastHint={currentHintIndex === hints.length - 1}
                />
              )}
            </>
          )}

          <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition disabled:bg-gray-400"
            onClick={lyricFetcher}
            disabled={loadingLyrics}
          >
            Fetch Lyrics
          </button>
        </>
      )}

      <form
        onSubmit={inputHandler}
        className="mt-4 flex space-x-2 items-center"
      >
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter song title"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Submit
        </button>
      </form>

      {loadingResult ? <Loader /> : result && <Result answer={result} />}
    </div>
  );
}

export default App;
