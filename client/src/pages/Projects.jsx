import React from 'react'
import CallToAction from '../components/CallToAction'
export default function Projects() {
  return (
    <div className='flex flex-col items-center justify-center max-w-2xl min-h-screen gap-6 p-4 mx-auto'>
      <h1 className='mb-4 text-3xl font-semibold'>Projects</h1>
      <p className='text-gray-500 text-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam hic quis repudiandae quisquam aut odit vel cupiditate, beatae, quo fugiat deserunt. Optio mollitia ullam tempora eaque quam non aliquid ipsum!</p>
      <CallToAction />
    </div>
  )
}
