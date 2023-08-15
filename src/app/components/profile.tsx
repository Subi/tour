"use client"
import { signIn, signOut } from 'next-auth/react'
import styles from './header.module.css'
import Image from 'next/image'
import discordButtonLogo from '../../../public/black_logo.jpg'
import { sign } from 'crypto'


export interface IProfileProps {
    expires?: string | undefined
    user?: {
        name?: string | null | undefined
        email?: string | null | undefined
        image?: string | null | undefined
      }
}

export default function Profile({user}: IProfileProps) {
    if(!user) {
        return (
            <>
            <button onClick={() => signIn("discord")} className={styles.discordButton}>
                    <i></i>
                    Login
             </button>
            </>
        )
    }
    return (
        <div className={styles.profile}>
                    {user.name}
                    <img className={styles.profileImg}src={user.image as string}/>
                    <span className={styles.signOut} onClick={() => {signOut()}}>Logout</span>
        </div>
        
    )
}