import { Link } from "react-router"
import {PlusIcon} from "lucide-react"

const Navbar = () => {
  return (
    <header className="border-b bg-base-300 border-base-content/10">
    <div className="mx-auto max-w-7xl p4">
    <div className="flex items-center justify-between">
        <h1 className="font-mono text-3xl font-bold tracking-tight text-primary">
            ThinkBoard
        </h1>
        <div className="flex items-center gap-4 p-4">
            <Link to={"/create"} className="btn btn-primary">
            <PlusIcon className="size-5" />
            <span>New Note</span>
            </Link>
        </div>
    </div>
    </div>
    </header>
  )
}

export default Navbar