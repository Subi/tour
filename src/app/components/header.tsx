import Link from 'next/link'
import styles from './header.module.css'
import Image from 'next/image'
import Logo from '../../../public/carlsjr.png'
import Profile, { IProfileProps } from './profile'


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
                    <Link href={"/upload"} className={styles.myLink}>Upload</Link>
                    <Link href={"/about"}  className={styles.myLink}>About</Link>
                </nav>
            <div className={styles.profileContainer}>
                <Profile {...props}/>
            </div>
            </div>
        </div>
        </>
    )
}


