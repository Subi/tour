import Link from 'next/link'
import classes from './header.module.css'
import { useEffect, useState } from 'react'
import {DefaultSession, Session} from 'next-auth'
import Profile from './profile'
import { IProfileProps } from './profile'


async function getSession() {
    const response = await fetch('api/session')
    if(!response.ok) {
        console.error("Error getting session data")
    }
    return response.json()
}

export default function Header():JSX.Element {
    const  [session , setSession] = useState<Session>()


    const getSessionData = async() => {
        const  data =  await getSession()
        setSession(data.session)
    }

    useEffect(() => {
        getSessionData()
    }, [])


    return (
        <>
         <div className={classes.headerContainer}>
            <div className={classes.headerLogo}>
                <Link href={"/"}><h2>50 States Tour</h2></Link>
            </div>
            <div className={classes.rightHeaderContent}>
                <Link href={"/about"}>About</Link>
                <Link href={"/upload"}>Upload</Link>
                <Profile {...session}/>
            </div>
        </div>
        </>

    )
}


