"use client"
import Header from "../components/header";
import classes from './dashboard.module.css';
import Image from "next/image";
import example from '../../../public/patch.jpeg';
import accept from '../../../public/icons8-check.svg';
import decline from '../../../public/icons8-close-window-48.png';
import { useEffect, useState } from "react";
import { Patch } from "../api/upload/route";



async function fetchPatchData():Promise<any> {
    const response =  await fetch('api/database/patches')
    if(!response.ok) {
        console.error("Error fetching patch data:")
    }

    return response.json()
}




export default function Dashboard() {
    const [data , setData] = useState<Patch[]>([])


    const getPatchData = async () => {
            const results:Patch[] = await fetchPatchData()
            console.log(results)
            setData(results)
    }

    useEffect(() => {
        getPatchData()
    } , [])


    return (
        <>
           <Header/>
           <div className={classes.dashboardHeader}>
                <h2>Dashboard</h2>
           </div>
           <div className={classes.photoCardsContainer}>
                {data ?   data.map((patch , index) => {
                    return (
                        <div className={classes.photoCardContainer}>
                           <div className={classes.photoCardImageContainer}>
                           <div className={classes.photoCardImage}>
                               <Image src={patch.imageUrl as string} fill={true} alt="patch photo"/>
                           </div>
                           </div>
                           <div className={classes.photoCardInfoContainer}>
                               <p>{patch.Author.username}</p>
                               <div className={classes.controlsContainer}>
                                   <Image alt="accept" src={accept} width={25} height={25}/>
                                   <Image alt="decline" src={decline} width={28} height={28}/>
                               </div>
                           </div>  
                       </div> 
                    )
                }): null
                }
           </div>
        </>        
    )
}