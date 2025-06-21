import React, { useEffect, useRef, useState } from 'react'
import MessageComponent from '../component/MessageComponent'
import {useForm} from 'react-hook-form';
import { apiConnector } from '../service/apiConnector';
import { modelEndPoints } from '../service/api';
import { useDispatch, useSelector } from 'react-redux';
import { push } from '../features/historySlice';
import { IoIosSend } from "react-icons/io";
import toast from 'react-hot-toast';
import RohitImage from '../assets/rohit-negi-photo.jpg'


const Chat = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState:{errors}
  }=useForm()

  const [generating,setGenerating]=useState(false);

  const dispatch=useDispatch();
  const {array}=useSelector((state)=>state.history);

  const bottomRef=useRef()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [array])
  

  async function onSubmit(data) {
    if(generating || data.doubt==""){
      return ;
    }
    const toastId=toast.loading("Generating")
    setGenerating(true);
    reset()
    console.log(data)
    const userMessage={
      role:"user",
      parts:[{text:data.doubt}]
    }
    let updatedArray=[...array,userMessage]
    dispatch(push(userMessage))
    // console.log(array)
    const response=await apiConnector("POST",modelEndPoints.MODEL_API,{history:updatedArray})
    // console.log(response.data.data)
    const modelMessage={
      role:"model",
      parts:[{text:response.data.data}]
    }
    updatedArray=[...updatedArray,modelMessage]
    dispatch(push(modelMessage))
    setGenerating(false)
    // console.log(updatedArray)
    toast.dismiss(toastId)
  }


  return (
    <div className={`h-screen w-screen  relative m-r-2 flex flex-col justify-center items-center`}>
      <div className='h-screen w-screen bg-slate-700'>
      {array.length===0?
      <div className=' h-5/6 p-2 flex flex-col justify-center items-center'>
        {/* <div> */}
          <p className='text-3xl font-bold text-white'>Welcome To The </p>
          <p className='text-gradient text-5xl font-bold'>NegiBot</p>
          <img className='mt-5 rounded-full' src={RohitImage}/>
        {/* </div> */}
      </div>
      :
      <div className='h-5/6 overflow-y-scroll p-4'>
        <div className='flex gap-2 justify-center items-center'>
          <img width={80} height={80} className='rounded-full' src={RohitImage}/>
          <p className='text-5xl font-bold text-white text-gradient'>NegiBot</p>
        </div>
        {array.map((message)=>(
          <MessageComponent
          message={message}
          />
        ))}
        <div ref={bottomRef} />
      </div>
      }
      
      {/* <div className='absolute bottom-2 left-1/2 -translate-x-1/2'> */}
      <div className='h-1/6 w-screen flex justify-center items-center'>
        <form className='w-full flex justify-center gap-2' onSubmit={handleSubmit(onSubmit)}>
          <input autoComplete="off"
          required
          className='p-2 w-3/4 bg-black text-white text-lg rounded-md'
          type="text"
          {...register("doubt")}
            placeholder='Enter your doubt'
            >          
          </input>
          <button className={`${generating==false?'hover:scale-105 cursor-pointer':'hover:scale-100 cursor-default'} p-2 bg-black rounded-md text-white text-2xl`} type='submit'><IoIosSend /></button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Chat