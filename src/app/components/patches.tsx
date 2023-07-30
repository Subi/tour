'use client'
import { ReactNode, useEffect, useState } from 'react';
import classes from './/patches.module.css';
import { StaticImageData } from 'next/image';
 

async function fetchPatchData():Promise<any> {
    const response =  await fetch('api/database/patches')
    if(!response.ok) {
        console.error("Error fetching patch data:")
    }

    return response.json()
}

export default function Patches() {
    const [patches , setPatches] = useState<StaticImageData[]>([])

    const generatePatches = async ():Promise<void> => {
        const data = await fetchPatchData()
        setPatches(data)
    }
    useEffect(() => {
        generatePatches()
    } , [])

    return (
        <div className={classes.patchesContainer}>
            <div className={classes.patchesCarousel}>
                <div className={classes.row6}>
                    {patches.map((patch:any, index:number) => {
                        if(index < 6 && patch.isApproved) {
                            return <div className={classes.patchContainer}>
                                <img src={patch.imageUrl} width={160} height={160}/>
                            </div>
                        }
                    })}
                </div>
                <div className={classes.row5}>
                {patches.map((patch:StaticImageData, index:number) => {
                        if(index > 5 && index < 11) {
                            return <div className={classes.patchContainer}>
                                <img src={patch.src} width={160} height={160}/>
                            </div>
                        }
                    })}
                </div>
                <div className={classes.row6}>
                    {patches.map((patch:StaticImageData, index:number) => {
                        if(index > 10 && index < 17) {
                            return <div className={classes.patchContainer}>
                                <img src={patch.src} width={160} height={160}/>
                            </div>
                        }
                    })}
                </div>
                <div className={classes.row5}>
                {patches.map((patch:StaticImageData, index:number) => {
                        if(index > 16 && index < 22) {
                            return <div className={classes.patchContainer}>
                                <img src={patch.src} width={160} height={160}/>
                            </div>
                        }
                    })}
                </div>
                <div className={classes.row6}>
                    {patches.map((patch:StaticImageData, index:number) => {
                        if(index > 21 && index < 28) {
                            return <div className={classes.patchContainer}>
                                <img src={patch.src} width={160} height={160}/>
                            </div>
                        }
                    })}
                </div>
                <div className={classes.row5}>
                {patches.map((patch:StaticImageData, index:number) => {
                        if(index > 27 && index < 33) {
                            return <div className={classes.patchContainer}>
                                <img src={patch.src} width={160} height={160}/>
                            </div>
                        }
                    })}
                </div>
                <div className={classes.row6}>
                    {patches.map((patch:StaticImageData, index:number) => {
                        if(index > 32 && index < 39) {
                            return <div className={classes.patchContainer}>
                                <img src={patch.src} width={160} height={160}/>
                            </div>
                        }
                    })}
                </div>
                <div className={classes.row5}>
                {patches.map((patch:StaticImageData, index:number) => {
                        if(index > 38 && index < 44) {
                            return <div className={classes.patchContainer}>
                                <img src={patch.src} width={160} height={160}/>
                            </div>
                        }
                    })}
                </div>
                <div className={classes.row6}>
                    {patches.map((patch:StaticImageData, index:number) => {
                        if(index > 43 && index < 50) {
                            return <div className={classes.patchContainer}>
                                <img src={patch.src} width={160} height={160}/>
                            </div>
                        }
                    })}
                </div>
            </div>
        </div>
    )
}