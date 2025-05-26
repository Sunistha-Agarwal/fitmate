import { Link } from 'react-router'

export default function Navbar() {
    return(
        <>
            <header>
                <div>
                    <Link to="/">
                        <h1>Workout buddy</h1>
                    </Link>
                </div>
            </header>
        </>
    )
}