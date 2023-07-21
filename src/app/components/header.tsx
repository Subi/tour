import Link from 'next/link'
import classes from './header.module.css'
import { signIn } from 'next-auth/react'



export default function Header() {
    return (
        <div className={classes.headerContainer}>
            <div className={classes.headerLogo}>
                <h2>50 States Tour</h2>
            </div>
            <div className={classes.rightHeaderContent}>
                <Link href={"/about"}>About</Link>
                <Link href={"/upload"}>Upload</Link>
                <button onClick={() => signIn("discord")} className={classes.socialButton}>
                    <i></i>
                    Login with Discord
                </button>
            </div>
        </div>
    )
}


