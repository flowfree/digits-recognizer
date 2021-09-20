import { useState } from 'react'
import CanvasDraw from 'react-canvas-draw'

function App() {
  const [canvas, setCanvas] = useState(null)
  const [image, setImage] = useState(null)

  function handleClear(e) {
    e.preventDefault()
    canvas.clear()
  }

  function handleGetDigits(e) {
    e.preventDefault()
    const data = canvas.canvasContainer.childNodes[1].toDataURL('image/jpeg')
    image.src= data
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
        <div className="col-2">
          <div className="canvas-wrapper border mb-3">
            <CanvasDraw 
              ref={c => setCanvas(c)}
              lazyRadius={0}
              brushColor="#f00"
              brushRadius={5}
              hideGrid={true}
              canvasHeight="150px"
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
          >
            Clear
          </button>
          <button 
            className="btn btn-outline-primary shadow-none"
            onClick={handleGetDigits}
          >
            Get digits
          </button>
        </div>
      </div>
      <img ref={i => setImage(i)} src="" alt="" />
    </div>
  )
}

export default App
