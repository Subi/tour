'use client';
import styles from './upload.module.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Image from 'next/image';
import { useState } from 'react';
import { SessionContextValue, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Author } from '@prisma/client';


const fetchUserData = async (username:string):Promise<Author> => {
    const response = await fetch('api/database/user' , {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "data":  {username}
        })
    })
    if(!response.ok) {
        console.error("Error fetching user data:" , response.statusText)
    }
    return await response.json()
}

 export default function Upload(){
    const {data: session}:SessionContextValue = useSession()
    const router = useRouter()


    const [selectedState , setSelectedState] = useState('')
    const [uploadedFile , setUploadedFile] = useState<Blob>()
    const [previewImage , setPreviewImage] = useState<string>("");
    const [errorMessage , setErrorMessage] = useState<string>("");
    const [successMessage , setSuccessMessage] = useState<string>("");
    const [isClosed , setIsClosed] = useState<boolean>(true)
    

    const isBanned = async():Promise<boolean> => {
        const username =  session?.user?.name as string
        const user = await fetchUserData(username)
        if(!user) {
            return false
        }
        return user.isBanned
    }   


    const uploadFile = async ():  Promise<void> => {
        if(!uploadedFile) return ;
        if(!session) {
            setErrorMessage("Please sign in to upload a photo")
            return
        }
        if(await isBanned()) {
            setErrorMessage("Permission denied")
            return
        }
        if(uploadedFile.type != "image/jpeg") {
                setErrorMessage("File type is not supported")
                return
        }
        if(selectedState === "Select a state" || selectedState === "") {
            setErrorMessage("Please select a state before uploading a photo")
            return
        }
        setSuccessMessage("File uploaded")
        
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

    const states:string[] = [ // move this to another file 
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ]



    const openFile = ():void => {
        document.getElementById('file_upload')?.click()
    }
    

    const uploadFileHandler = (target:EventTarget & HTMLInputElement) => {
        const blob =  target.files?.[0] as Blob
        const urlObj = URL.createObjectURL(blob)
        setUploadedFile(blob)
        setPreviewImage(urlObj)
        
    }


    return (
        <>
         <Sidebar isClosed={isClosed} setIsClosed={setIsClosed} session={session}/>
         <Header {...session} isClosed={isClosed} setIsClosed={setIsClosed} session={session}/>
            <section id={styles.uploadContainer}>
                <div className={styles.uploadPreview}>
                {!previewImage ? "" :  <Image alt='preview image' src={previewImage} fill={true}/> }
                </div>
                <div className={styles.info}>
                <span onClick={() => {router.push("/how-to-upload")}}>upload guide</span>
                <span className={errorMessage != "" ? `${styles.error}` : `${styles.success}`}>{errorMessage != "" ? errorMessage : successMessage}</span>
                </div>
                <div className={styles.actionButtonContainer}>
                <button className={styles.selectButton} onClick={() => {openFile()}}>
                            Choose a photo
                </button>
                <input type='file' id='file_upload' accept="image/*" hidden={true} onChange={(e) => {uploadFileHandler(e.target)}}/>
                <select name='states'className={styles.stateDropdown} onChange={(e) => {setSelectedState(e.target.value)}}>
                    <option value={"selectCard"}>Select a state</option>
                    {states.map((state , i) => {
                        
                        return <option key={i} value={state}>{state}</option>
                    })}
                    </select>
                </div>
                <button className={styles.uploadButton} onClick={() => uploadFile()}>Upload</button>
            </section>
        </>
    )
}