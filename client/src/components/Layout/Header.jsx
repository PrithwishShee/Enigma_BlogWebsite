import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='p-2 '>

      <Link to="/" className='p-2 rounded-md text-4xl hover:text-black'>🏠︎</Link>

    </div>
  )
}

export default Header
