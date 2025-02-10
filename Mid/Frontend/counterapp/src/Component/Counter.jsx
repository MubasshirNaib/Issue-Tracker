import React from 'react'
import {atom, useRecoilState} from 'recoil'
import { Button } from '@mui/material';
const CountAtom = atom({
    key:'CountState',
    default: 0,
})
const Counter = () => {
  const[count,setCount]= useRecoilState(CountAtom);
  return (
    <div>
      Counter App
      <div> Count : {count}</div>
      <br></br>
      <Button variant="outlined" onClick={()=>{setCount(count+1)}} >Increment</Button> <span> </span>
      <Button variant="outlined" onClick={()=>{setCount(count-1)}} disabled={count == 0}>Decrement</Button>
    </div>
  )
}

export default Counter
