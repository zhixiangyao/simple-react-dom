import React from 'react'
import './index.css'
import App from './App'
import CustomRenderer from './customRenderer'

CustomRenderer.render(<App />, document.getElementById('root'))
