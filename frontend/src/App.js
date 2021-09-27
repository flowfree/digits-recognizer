import axios from 'axios'
import DigitsRecognizer from './components/DigitsRecognizer'

// Get the base URL for the backend
// Note that you can set this variable in the `.env` file.
const baseURL = process.env.REACT_APP_API_BASE_URL 

function App() {
  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        <div className="col-12 col-md-8">
          <h1 className="mt-5 mb-3">Digits Recognizer</h1>
        </div>
      </div>
      <DigitsRecognizer />
    </div>
  )
}

export default App
