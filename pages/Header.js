
import Link from 'next/link'
import { BiWorld } from 'react-icons/bi';


export default function Header() {
  return (
    <div className="p-3 flex justify-center items-center text-slate-800 text-6xl">
      <Link href="/">
        <BiWorld/>
      </Link>
    </div>
  )
}

