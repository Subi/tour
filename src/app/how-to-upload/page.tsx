"use client"
import '../globals.css'
import styles from './how-to.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/carlsjr.png'
import correctExample1 from '../../../public/patch.jpeg';
import convertedExample1 from '../../../public/patch-removebg.png';
import { getServerSession } from 'next-auth';
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import { useState } from 'react'
import { SessionContextValue, useSession } from 'next-auth/react'

export default function Guide(){
    const  {data: session , status}:SessionContextValue = useSession()
    const [isClosed , setisClosed] = useState<boolean>(true)

    return (
        <>
         <Sidebar isClosed={isClosed} setIsClosed={setisClosed} session={session}/>
        <Header isClosed={isClosed} setIsClosed={setisClosed} session={session}/>
        <div className={styles.titleContainer}>
                <h1>Upload Standard Guide</h1>
            </div>
            <section className={styles.photoExamplesContainer}>
                <section className={styles.exampleRowOne}>
                <Image src={correctExample1} alt='correct example' height={250} width={275}/>
                {/* <Image src={arrow} alt='arrow'/> */}
                <Image src={convertedExample1} alt='converted example one' height={260} width={275}/>
                </section>
            </section>
            <div className={styles.infoSection}>
                <p>To ensure the best chance of your submitted photo to be accepted and displayed on homepage, we 
                encourage you to follow the examples provided below. </p>
                <p> Patches that dont follow the guidelines can result in them being declined.</p>
                <ul>
                    <li>
                        Please make sure the patch is taken at an appropriate distance to capture the details of the patch.
                    </li>
                    <li>
                        Ensure that there is nothing other than the patch within your photo submission as this may interfere  with the 
                    processing of the patch submission.
                    </li>
                    <li>
                        Please only submit pictures of patches from the <b style={{color: "red"}}>50 States Tour</b>
                    </li>
                </ul>
            </div>
        </>
            
    )
}