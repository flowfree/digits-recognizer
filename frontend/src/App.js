import axios from 'axios'
import axiosRetry from 'axios-retry'
import { useEffect, useState } from 'react'
import DigitsRecognizer from './components/DigitsRecognizer'

// Get the base URL for the backend
// Note that you can set this variable in the `.env` file.
const baseURL = process.env.REACT_APP_API_BASE_URL 

axiosRetry(axios, { retries: 3 })

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    console.log(baseURL)
    axios 
      .get(`${baseURL}/`)
      .then(() => {
        setIsLoaded(true)
        setError('')
      })
      .catch(() => {
        setIsLoaded(false)
        setError('Something went wrong.')
      })
  }, [])

  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        <div className="col-12 col-md-8">
          <h1 className="mt-5 mb-3">Digits Recognizer</h1>
        </div>
      </div>
      {isLoaded ? (
        <DigitsRecognizer />
      ) : (
        <p className="text-center">Please wait while we're warming up the AI code...</p>
      )}
      {error && (
        <div className="text-center text-danger">{error}</div>
      )}
    </div>
  )
}

export default App
