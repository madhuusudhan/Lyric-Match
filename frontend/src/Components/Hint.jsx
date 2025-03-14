function Hint({ hint, showNextHint, isLastHint }) {
  return (
    <div className="mt-4">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow">
        <p className="font-medium">Hint: {hint}</p>
      </div>
      {!isLastHint && (
        <button
          className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
          onClick={showNextHint}
        >
          Show Next Hint
        </button>
      )}
    </div>
  );
}

export default Hint;
