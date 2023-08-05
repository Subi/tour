"use client";
import styles from './patches.module.css'
import Image  from 'next/image'
import patchlogo from '../../../public/patch-removebg.png'
import questionMarkLogo from '../../../public/question_mark.png'
import { useEffect, useState } from 'react';
import { Patch } from '../api/upload/route';
// Test build out patch card 


// Fetch all patches from the database.
async function fetchPatchData():Promise<any> {
    const response =  await fetch('api/database/patches')
    if(!response.ok) {
        console.error("Error fetching patch data:")
    }

    return response.json()
}


export default function videoReel() {
    const patchesArr = new Array(50).fill({})
    const [patches , setPatches] =  useState<Patch[] >([])
    
    const loadAvailablePatches = async ():Promise<void> => {
        const data =  await fetchPatchData()
        for(let i = 0; i < patchesArr.length; i++) {
            patchesArr[i] = data[i]
        }
        setPatches(patchesArr)
    }


    useEffect(() => {
        loadAvailablePatches()
    } , [])


    return (
        <section id={styles.patchCardContainer}>
            {patches.map((patch:Patch , index:number) => {
                if(patch == undefined) {
                    return (
                        <div className={styles.emptyCard}>
                        <Image src={questionMarkLogo} alt='patch' width={15} height={15} /> 
                    </div> 
                    )
                }
                return (
                <div className={styles.profileCard}>
                    <div className={styles.profileCardInner}>
                        <div className={styles.profileCardFront}>
                            <div className={styles.cardHeader}>
                                <p>{index + 1 < 10 ? `0${index + 1}` : index}</p>
                            </div>
                                <Image src={patchlogo} alt='patch' width={185} height={230} />
                        </div>
                        <div className={styles.profileCardBack}>
                        </div>
                    </div>

                </div> 
                )
            })}
        </section>
    )
}