'use client';
import Header from '../components/header';
import styles from './upload.module.css';

import Image from 'next/image';
import ExitButton from '../../../public/exit_button.png'
import Folder from '../../../public/folder.svg'
import Earth from '../../../public/earth.png';
import Logo from '../../../public/carlsjr.png'
import gif from '../../../public/upload.gif'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function Upload(){
    const {data: session} = useSession()
    const router = useRouter()


    const [selectedState , setSelectedState] = useState('')
    const [uploadedFile , setUploadedFile] = useState<Blob>()



    const uploadFile = async ():  Promise<void> => {
        if(!uploadedFile) return ;
        if(!session) {
            alert("Please sign in to upload a photo")
            return
        }
        if(selectedState === "") {
            alert("Please select a state before uploading a photo")
            return
        }
        const form : FormData =  new FormData();

        form.append('username' , session?.user?.name as string)
        form.append('email' , session?.user?.email as string)
        form.append('avatar' , session?.user?.image as string)
        form.append('file' , uploadedFile)
        form.append('state' , selectedState)
        
        await fetch('api/upload' , {
            method: "POST",
            body: form,
        })
    } 

    const states:string[] = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

    const openFile = ():void => {
        document.getElementById('file_upload')?.click()
    }
    

    const uploadFileHandler = (target:EventTarget & HTMLInputElement) => {
        const blob =  target.files?.[0] as Blob
        setUploadedFile(blob)
        // setPreviewFile(URL.createObjectURL(blob))  //
    }

    return (
        <>
        <div id={styles.wrapper}>
        <div id={styles.header}>
            <div id={styles.headerLogo}>
                    <Image src={Logo} width={75} height={75} alt='Header Logo'/>
            </div>
            <div id={styles.headerName}>
                    <h4>50 STATES TOUR</h4>
                </div>
        </div>
        <div id={styles.overlay}>
            <div className={styles.uploadDialog}>
                <div className={styles.uploadArea}>
                    <div className={styles.imageAreaContainer}>
                    <Image alt='upload gif' src={gif} layout='fill'/>
                    </div>
                </div>
                <Image className={styles.exitButton} src={ExitButton} alt='exit button' width={48} height={40} onClick={() => {router.push('/')}}/>
                <div className={styles.uploadActionContainer}>
                    <div className={styles.uploadActionHeader}>
                        <p onClick={() => {openFile()}}>Upload a Patch</p>
                    </div>
                    <input type='file' id='file_upload' hidden={true} onChange={(e) => {uploadFileHandler(e.target)}}/>
                    <div className={styles.actionButtonsContainer}>
                    <select name='states'className={styles.stateDropdown} onChange={(e) => {setSelectedState(e.target.value)}}>
                    <option>Select a state</option>
                    {states.map((state , i) => {
                        return <option key={i}value={state}>{state}</option>
                    })}
                    </select>
                        <button className={styles.uploadButton} onClick={() => uploadFile()}>Upload</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}