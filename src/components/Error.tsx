import React from 'react'

export const Error = ({ children } : { children: React.ReactNode }) => {
  return (
    <p className='bg-red-600 text-white text-center font-semibold p-2 uppercase text-sm mt-2 rounded'>{children}</p>
  )
}
