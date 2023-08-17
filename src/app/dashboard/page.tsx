"use client"
import Header from "../components/header";
import classes from './dashboard.module.css';
import Image from "next/image";
import accept from '../../../public/icons8-check.svg';
import decline from '../../../public/icons8-close-window-48.png';
import { Patch } from "../api/upload/route";
import { SessionContextValue, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {redirect} from 'next/navigation';


async function updatePatchData(patch:Patch):Promise<void> {
    const response =  await fetch('api/database/patches/update' , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"data": patch})
        })
        if(!response.ok){
            console.error("Error occured updating patch status" , response.statusText)
        }
}

async function deletePatchData(patch:Patch):Promise<void> {
    const response =  await fetch('api/database/patches/delete' , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"data": patch})
        })
        if(!response.ok){
            console.error("Error occured updating patch status" , response.statusText)
        }
}


async function getPatchData() {
    const response = await fetch('api/database/patches')
    if(!response.ok) {
        console.error("Error occured fetching patch data")
    }
    return response.json()
}


export default function Dashboard() {
    const {data: session , status}:SessionContextValue = useSession()
    const [isClosed , setisClosed] = useState<boolean>(true)

    const [data , setData] = useState<Patch[]>([]);

    const getData = async () => {
        const patchData:Patch[] =  await getPatchData()
        console.log(patchData)
        setData(patchData.filter(patch => patch.isApproved === null))
    }

    useEffect(() => { 
        getData()
    } , [session])


    if(status === "loading") return null

    if(session?.user?.email != "negus.dev@gmail.com") {
        redirect("/")
    }


    return ( 
        <>
           <Header isClosed={isClosed} setIsClosed={setisClosed} session={session}/>
           <div className={classes.dashboardHeader}>
                <h2>Dashboard</h2>
           </div>
           <div className={classes.photoCardsContainer}>
                {data ?  data.map((patch:Patch , index) => {
                    return (
                        <div className={classes.photoCardContainer}>
                           <div className={classes.photoCardImageContainer}>
                           <div className={classes.photoCardImage}>
                               <Image src={patch.imageUrl as string} fill={true} alt="patch photo"/>
                           </div>
                           </div>
                           <div className={classes.photoCardInfoContainer}>
                               <p>{patch.state}</p>
                               <p>{patch.Author.username}</p>
                               <div className={classes.controlsContainer}>
                                   <Image alt="accept" src={accept} width={25} height={25} onClick={() => {updatePatchData(patch)}}/>
                                   <Image alt="decline" src={decline} width={28} height={28} onClick={() => {deletePatchData(patch)}}/>
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