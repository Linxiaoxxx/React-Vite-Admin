import { useNavigate } from 'react-router'

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      404
      <p onClick={() => navigate('Setting')}>go home</p>
    </div>
  )
}

export default NotFound
