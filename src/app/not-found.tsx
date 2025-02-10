import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="grid justify-center items-center">
      <div className='m-2'>

      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      </div>
      <Link className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" href="/">Return Home</Link>
    </div>
  )
}