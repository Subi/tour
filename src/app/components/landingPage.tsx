"use client";
import { useEffect, useState } from 'react';
import styles from  './main.module.css'




export default function LandingPage(){
    const [isVisable , setIsVisable] = useState<boolean>(true)

    const getVisibleState = ():string => {

        switch(isVisable){
            case true:
                return ""
            case false:
                return "none"
        }
    }
    useEffect(() => {
        getVisibleState()
    } , [isVisable])

    return (
    <main id={styles.mainWrapper} style={{display: getVisibleState()}}>
        <h1>50 STATES TOUR</h1>
        <p onClick={() => setIsVisable(false)}>Enter</p>
    </main>
    )
}