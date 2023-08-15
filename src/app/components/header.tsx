"use client"
import Link from 'next/link'
import styles from './header.module.css'
import Image from 'next/image'
import Logo from '../../../public/carlsjr.png'
import HamburgerMenu from '../../../public/hamburger_menu.png';
import Profile, { IProfileProps } from './profile'
import { IButtonProps } from './sidebar.'
import { useState } from 'react'


export default function Header({isClosed , setIsClosed}: IButtonProps  ){


    return (
        <>
        <div id={styles.header}>
            <Link href={"/"}>
            <div className={styles.headerLeft}>
                <div id={styles.headerLogo}>
                    <Image src={Logo} width={75} height={75} alt='Header Logo'/>
                </div>
                <div id={styles.headerName}>
                    <h4>50 STATES TOUR</h4>
                </div>
            </div>
            </Link>
            <div className={styles.headerRight}>
                <div className={styles.mobileMenuIcon}>
                    <Image onClick={() => setIsClosed(false)} alt='mobileMenu' src={HamburgerMenu} width={28} height={28}/>
                </div>
            {/* <div className={styles.profileContainer}>
                <Profile {...props}/>
            </div>
                <nav>
                    <div className={styles.burgerMenu}> 
                        <div className={burger_class} onClick={updateMenu}></div>
                        <div className={burger_class} onClick={updateMenu}></div>
                        <div className={burger_class} onClick={updateMenu}></div>
                    </div>
                </nav>
                <div className={menu_class}></div> */}
                {/* <nav className={styles.headerNav}>
                    <Link href={"/gallery"} className={styles.myLink}>Gallery</Link>
                    <Link href={"/upload"} className={styles.myLink}>Upload</Link>
                    <Link href={"/about"}  className={styles.myLink}>About</Link>
                </nav> */}
            </div>
        </div>
        </>
    )
}


