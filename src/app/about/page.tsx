"use client"
import styles from './page.module.css'
import star from '../../../public/star.png'
import Image from 'next/image'
import ReactPlayer from 'react-player/youtube'
import dynamic from 'next/dynamic'
import Header from '../components/header'

export default function About() {
    const ReactPlayer = dynamic(() => import('react-player/lazy') , {ssr: false})
    return (
        <>
        <Header/>
        <div id={styles.aboutContainer}>
            <h1>About</h1>
            <section>
                <p>
                    Hello, thank you for coming it means a lot to me. The main purpose of the site was to create a place to showcase all the patches
                    from the <b>50 STATE TOUR</b> by Asspizza but also work on my skills by building something that interest me but also would serve to 
                    other people in the community and maybe even people not in the community who may not know about this amazing tour.
                </p>
                <p>
                    I personally enjoyed my time at the <b>Tampa , FL</b> pop up and it was beautiful sight to see everyone come together and just share similar interest and even different ones.
                    I think asspizza shares a great message about being yourself because you do that well and most of all to <b style={{color: "red"}}>Follow your dreams.</b> 
                    <Image src={star} alt='star' width={25} height={25}/>
                </p>
            </section>
            <div className={styles.player}>
            <ReactPlayer playing={true} url="https://www.youtube.com/watch?v=TxsE4ePRJZA&ab_channel=47Films"/>
            </div>
        </div>
        </>
    
    )
}