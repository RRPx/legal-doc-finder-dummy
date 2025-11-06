export default function ResponseSummary({ result, error }) {
  if (error)
    return (
      <div className="text-red-600 text-center mt-4 font-medium">{error}</div>
    );

  if (!result)
    return (
      <p className="text-gray-500 text-center mt-8">
        Enter a query to see results.
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6 border">
      <h2 className="text-2xl font-semibold mb-2 text-blue-700">
        {result.title}
      </h2>
      <p className="text-gray-700 leading-relaxed">{result.summary}</p>
    </div>
  );
}
