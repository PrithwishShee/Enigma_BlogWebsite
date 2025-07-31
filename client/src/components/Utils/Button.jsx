import React from 'react'

const Button = ({children}) => {
  return (
    <button className='bg-slate-900 py-3 px-6 opacity-90 text-white font-semibold hover:opacity-100'>
      {children}
    </button>
  )
}

export default Button
