function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-primary">Tytuł strony</h1>
      <button
        className="bg-blue-300 p-4 mt-4 rounded"
        onClick={() => setCount((c) => c + 1)}
      >
        count is {count}
      </button>
    </div>
  )
}
