"use client";
import styles from './patches.module.css';
import Image  from 'next/image';
import questionMarkLogo from '../../../public/question_mark.png';
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


export default function Patches() {
    const patchesArr = new Array(50).fill({})
    const [patches , setPatches] =  useState<Patch[] >([])
    
    const loadAvailablePatches = async ():Promise<void> => {
        const data:Patch[] =  await fetchPatchData()
        const filteredPatchData = data.filter(patch => patch.isApproved)
        for(let i = 0; i < patchesArr.length; i++) {
            patchesArr[i] = filteredPatchData[i]
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
                                <Image src={patch.imageUrl as string} alt='patch' width={200} height={210} />
                        </div>
                        <div className={styles.profileCardBack}>
                            <div className={styles.cardBackAvatarContainer}>
                                <img src={patch.Author.avatarUrl}/>
                            </div>
                            <div className={styles.cardBackUsername}>
                                <p>{patch.Author.username}</p>
                            </div>
                        </div>
                    </div>

                </div> 
                )
            })}
        </section>
    )
}