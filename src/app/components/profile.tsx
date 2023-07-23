import { DefaultSession, ISODateString, Session } from "next-auth";
import { signIn } from 'next-auth/react'
import classes from './header.module.css'


interface IProfileProps {
    user?: {
        name?: string | null
        email?: string | null
        image?: string | null
      }
}


export default function Profile(props: IProfileProps) {
    if(!props.user) {
        return (
            <button onClick={() => signIn("discord")} className={classes.socialButton}>
                    <i></i>
                    Login with Discord
             </button>
        )
    }
    return (
        <span className={classes.profileContainer}>
                    {props?.user?.name}
                    <img src={props?.user?.image as string}/>
        </span>
    )

}