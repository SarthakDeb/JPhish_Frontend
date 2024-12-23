import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { increment, decrement } from '../redux/counterSlice'


const Counter =  () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
  return (
    <div className='flex flex-col items-center p-20 mt-20 text-black font-bold text-3xl'>Counter:
    <button 
    className='mt-5 font-semibold text-sm border-2 border-amber-600'  
    onClick={()=>dispatch(decrement())}>
        Decrement</button>
    <h3 className='font-thin text-xs p-10'>count is = {count}</h3>
    <button 
    className='font-semibold text-sm border-2 border-amber-600'  
    onClick={()=>dispatch(increment())}>
        Increment</button>
    </div>
  )
}

export default Counter;