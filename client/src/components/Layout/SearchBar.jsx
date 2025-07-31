import React from 'react'
import Button from '../Utils/Button'

const SearchBar = () => {
  return (
    <div className='flex mx-10 my-4'>
      <input className='bg-slate-300 p-4 w-full text-xl' type="text" name="" id="" placeholder='🔍 Search blogs' />
      {/* <button className='bg-slate-900 py-4 px-10 opacity-90 text-white font-bold hover:opacity-100'>Search</button> */}
      <Button>Search</Button>
    </div>
  )
}

export default SearchBar
