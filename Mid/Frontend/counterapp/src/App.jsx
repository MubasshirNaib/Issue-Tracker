import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot } from 'recoil'
import Counter from './Component/Counter'

function App() {
  return (
    <>
      Mubasshir
      <RecoilRoot>
        <Counter/>
      </RecoilRoot>

    </>
  )
}

export default App
