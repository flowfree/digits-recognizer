import axios from 'axios'
import { useState } from 'react'
import CanvasDraw from 'react-canvas-draw'

const baseURL = 'http://localhost:8000'

function App() {
  const [canvasDraw, setCanvasDraw] = useState(null)
  const [onProgress, setOnProgress] = useState(false)
  const [number, setNumber] = useState('')
  const [error, setError] = useState('')

  function handleClear() {
    setNumber('')
    setError('')
    canvasDraw.clear()
  }

  function handleGetDigits() {
    // Code borrowed from https://github.com/embiem/react-canvas-draw/pull/67
    const canvas = canvasDraw.canvasContainer.childNodes[1]
    let context = canvas.getContext('2d')
    let w = canvas.width
    let h = canvas.height
    let data = context.getImageData(0, 0, w, h)
    const compositeOperation = context.globalCompositeOperation 
    context.globalCompositeOperation = 'destination-over'
    context.fillStyle = '#fff'
    context.fillRect(0, 0, w, h)
    const imageData = canvas.toDataURL('image/jpeg')
    context.clearRect(0, 0, w, h)
    context.putImageData(data, 0, 0)
    context.globalCompositeOperation = compositeOperation

    setOnProgress(true)
    axios
      .post(`${baseURL}/predict`, { imageData })
      .then(response => {
        setNumber(response.data.result)
        setError('')
      })
      .catch(error => {
        setError('Something went wrong.')
      })
      .then(() => {
        setOnProgress(false)
      })
  }

  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        <div className="col-8">
          <h1 className="mt-5 mb-3">Digits Recognition</h1>
          <p>Draw the numbers with your mouse on the canvas below.</p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="canvas-wrapper border mb-3">
            <CanvasDraw 
              ref={c => setCanvasDraw(c)}
              lazyRadius={0}
              brushColor="#f00"
              brushRadius={3}
              hideGrid={false}
              canvasHeight="100px"
              canvasWidth="100%"
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8 text-center">
          <button 
            className="btn btn-outline-primary shadow-none me-2"
            onClick={handleClear}
            disabled={onProgress}
          >
            Clear
          </button>
          <button 
            className="btn btn-outline-primary shadow-none"
            onClick={handleGetDigits}
            disabled={onProgress}
          >
            {onProgress ? 'Predicting...' : 'Get digits'}
          </button>
        </div>
      </div>
      <div className="row mt-3 justify-content-center">
        <div className="col-8 text-center">
          {number && (
            <pre style={{fontSize: '50px'}}>
              <code>{number}</code>
            </pre>
          )}
          {error && (
            <div className="text-danger">{error}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
