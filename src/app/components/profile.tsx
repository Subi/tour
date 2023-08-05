"use client"
import { signIn } from 'next-auth/react'
import classes from './header.module.css'


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
            <button onClick={() => signIn("discord")} className={classes.discordButton}>
                    <i></i>
                    Login
             </button>
        )
    }
    return (
        <span>
                    {user.name}
                    <img src={user.image as string}/>
        </span>
    )

}