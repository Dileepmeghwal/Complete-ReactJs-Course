import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DateCounter from './component/DateCounter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <DateCounter/>
    </>
  )
}

export default App
