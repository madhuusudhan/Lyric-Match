function Result({ answer,actualTitle,hints }) {
    return (
      <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center">
        <span className="font-semibold">{answer === "Correct Answer!" ? answer : `${answer}, the correct answer is ${actualTitle} ${hints[0]} and ${hints[1]} `}</span>
      </div>
    );
  }
  
  export default Result;
  