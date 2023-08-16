"use client";
import { useEffect, useRef, useState } from 'react';
import styles from  './landingPage.module.css'




export default function LandingPage(){
    const [isVisable , setIsVisable] = useState<boolean>(true)


    useEffect(() => {
        if(hasEntered()) {
            setIsVisable(false)
            localStorage.setItem("entered" , JSON.stringify(true))
        } else {
            localStorage.setItem("entered" , JSON.stringify(false))
        }
    }, [])
 
    const hasEntered = () => {
        const storedValue: string = window.localStorage.getItem("entered") as string
        console.log(storedValue)
        return storedValue ? true : false
    }

    return (
    <main id={isVisable ? `${styles.mainWrapper}` : `${styles.hidden}`} >
        <h1>50 STATES TOUR</h1>
        <p onClick={() => setIsVisable(false)}>Enter</p>
    </main>
    )
}