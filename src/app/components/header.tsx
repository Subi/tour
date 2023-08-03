import Link from 'next/link'
import styles from './header.module.css'
import Image from 'next/image'
import Logo from '../../../public/carlsjr.png'
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
        <div id={styles.header}>
            <div className={styles.headerLeft}>
                <div id={styles.headerLogo}>
                    <Image src={Logo} width={75} height={75} alt='Header Logo'/>
                </div>
                <div id={styles.headerName}>
                    <h4>50 STATES TOUR</h4>
                </div>
            </div>
            <div className={styles.headerRight}>
                <nav className={styles.headerNav}>
                    <Link href={"/gallery"} className={styles.myLink}>Gallery</Link>
                    <Link href={"/about"}  className={styles.myLink}>About</Link>
                    <Link href={"/upload"} className={styles.myLink}>Upload</Link>
                </nav>
            <div className={styles.profileContainer}>
                <button className={styles.discordButton}>
                    Login
                </button>
            </div>
            </div>
        </div>
         {/* <div className={classes.headerContainer}>
            <div className={classes.headerLogo}>
                <Link href={"/"}><h2>50 States Tour</h2></Link>
            </div>
            <div className={classes.rightHeaderContent}>
                <Link href={"/about"}>About</Link>
                <Link href={"/upload"}>Upload</Link>
                <Profile {...props}/>
            </div>
        </div> */}
        </>

    )
}


