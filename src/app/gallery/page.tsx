"use client"
import Image from "next/image"
import Star from '../../../public/404.gif'
import styles from './gallery.module.css';
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { useState } from "react";
import { SessionContextValue, useSession } from "next-auth/react";

export default function Gallery() {
    const  {data: session , status}:SessionContextValue= useSession()
    const [isClosed , setisClosed] = useState<boolean>(true)

    return (
        <>
        <Sidebar isClosed={isClosed} setIsClosed={setisClosed} session={session}/>
        <Header  isClosed={isClosed} setIsClosed={setisClosed} session={session}/>
        <section id={styles.placeholder}>
            <Image src={Star} alt="404" height={200} width={200}/>
            <span>Come back soon !</span>
        </section>
        </>
    
    )
}