import Link from 'next/link'
import classes from './header.module.css'
import { Session, getServerSession } from 'next-auth'
import Profile, { IProfileProps } from './profile'

async function getSession() {
    const response = await fetch('api/session')
    if(!response.ok) {
        console.error("Error getting session data")
    }
    return response.json()
}

export default function Header(props: IProfileProps){
    return (
        <>
         <div className={classes.headerContainer}>
            <div className={classes.headerLogo}>
                <Link href={"/"}><h2>50 States Tour</h2></Link>
            </div>
            <div className={classes.rightHeaderContent}>
                <Link href={"/about"}>About</Link>
                <Link href={"/upload"}>Upload</Link>
                <Profile {...props}/>
            </div>
        </div>
        </>

    )
}


