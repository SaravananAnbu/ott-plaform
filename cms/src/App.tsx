import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Logo Section */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo h-24 w-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react h-24 w-24" alt="React logo" />
          </a>
        </div>

        {/* Headings showcase */}
        <div className="text-center mb-8 space-y-4">
          <h1 className="h1">Vite + React + Tailwind</h1>
          <h2 className="h2">Welcome to Our Platform</h2>
          <h3 className="h3">Built with Modern Tools</h3>
          <h4 className="h4">Fast Development Experience</h4>
          <h5 className="h5">Optimized Performance</h5>
          <h6 className="h6">Scalable Architecture</h6>
        </div>

        {/* Interactive section with styled buttons */}
        <div className="text-center space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button 
              className="btn btn-primary mr-4"
              onClick={() => setCount((count) => count + 1)}
            >
              Primary Button (count: {count})
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setCount(0)}
            >
              Reset Count
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">
              Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">src/App.tsx</code> and save to test HMR
            </p>
            <p className="text-sm text-gray-500">
              Click on the Vite and React logos to learn more
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
