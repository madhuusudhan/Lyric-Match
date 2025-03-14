const LyricSnippet = ({ snippet }) => (
    <div className="w-full max-w-lg bg-gray-100 rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-500 py-2 px-4 text-white font-semibold">
        Lyric Snippet
      </div>
      <div className="p-4 text-gray-700 text-center">
        {snippet || "No lyrics available"}
      </div>
    </div>
  );
  
  export default LyricSnippet;
  