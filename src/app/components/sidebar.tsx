"use client"
import styles from './sidebar.module.css'
import sidebarExit from '../../../public/sidebar_exit.png';
import Image from 'next/image';
import Link from 'next/link'
import { SetStateAction, useEffect, useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';


export interface IButtonProps {
    isClosed: boolean;
    setIsClosed: (val:boolean) => void;
    session: Session | null
}



export default function Sidebar({isClosed , setIsClosed , session}:IButtonProps){
    return (
        <div id={!isClosed ? `${styles.sidebar}` : `${styles.hidden}`}>
            <header className={styles.sidebarHeader}>
                <Image  src={sidebarExit} onClick={() => setIsClosed(true)} alt='sidebar close button' width={21} height={21}/>
            </header>
            <div id={styles.sidebarContent}>
            <span onClick={() => {signIn("discord")}}>{session == undefined ? "Login" : session.user?.name}</span>
            <ul>
                <li><Link href={"/gallery"}>Gallery</Link></li>
                <li><Link href={"/upload"}>Upload</Link></li>
                <li><Link href={"/about"}>About</Link></li>
            </ul>
            <span id={!session ? `${styles.hidden}` : ""} onClick={() => {signOut()}}>Logout</span>
            </div>
        </div>
    )
}