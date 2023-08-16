"use client";
import { useEffect, useState } from 'react';
import styles from  './landingPage.module.css'




export default function LandingPage(){
    const [isVisable , setIsVisable] = useState<boolean>(true)

    return (
    <main id={isVisable ? `${styles.mainWrapper}` : `${styles.hidden}`} >
        <h1>50 STATES TOUR</h1>
        <p onClick={() => setIsVisable(false)}>Enter</p>
    </main>
    )
}