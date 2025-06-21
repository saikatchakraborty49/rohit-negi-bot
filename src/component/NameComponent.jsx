import React from 'react'
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateName, updateprofilePicture } from '../features/userSlice';
import { apiConnector } from '../service/apiConnector';
import { userEndPoints } from '../service/api';
import toast from 'react-hot-toast';

const NameComponent = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState:{errors}
      }=useForm()

      const {name}=useSelector((state)=>state.user)

      const dispatch=useDispatch();

      async function onSubmit(data) {
        const updatedName=`${data.fname} ${data.lname}`
        dispatch(updateName(`${data.fname} ${data.lname}`));
        dispatch(updateprofilePicture(`https://ui-avatars.com/api/?name=${data.fname}+${data.lname}`))
        // console.log(updatedName)
        const response=await apiConnector("POST",userEndPoints.USER_API,{name:updatedName})
        toast.success(`Welcome ${data.fname} ${data.lname}`)
      }

  return (
    <div className=' z-10 absolute w-screen h-screen bg-white bg-opacity-65 flex justify-center items-center'>
        <div className='w-[450px] flex justify-center flex-col gap-4 border-2 p-2 rounded-md bg-stone-700 text-white'>
            <p className='text-xl font-bold text-center'>
                Enter Your Name
            </p>
            <form className='flex flex-col items-center justify-center gap-2' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex md:flex-row flex-col justify-center gap-2'>    
                    <input
                        required
                        className='rounded-md p-2'
                        type="text"
                        {...register("fname")}
                        placeholder='Enter your first name'
                        >          
                    </input>
                    <input
                        required
                        className='rounded-md p-2'
                        type="text"
                        {...register("lname")}
                        placeholder='Enter your last name'
                        >          
                    </input>
                </div>
                <button className='bg-orange-500 p-2 rounded-md' type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default NameComponent