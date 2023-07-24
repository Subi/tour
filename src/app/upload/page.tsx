'use client';
import Header from '../components/header';
import classes from './upload.module.css';
import Image from 'next/image';
import Folder from '../../../public/folder.svg'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
export default function Upload(){
    const {data: session} = useSession()

    const [selectedState , setSelectedState] = useState('')
    const [uploadedFile , setUploadedFile] = useState<Blob | undefined>(undefined)
    const [previewFile , setPreviewFile] = useState<string>("");


    const uploadFile = async ():  Promise<void> => {
        if(!uploadedFile) return ;
        if(!session) {
            alert("Please sign in to upload a photo")
        }
        if(!selectedState) {
            console.log("Please select a state before uploading a photo")
        }
        const form : FormData =  new FormData();

        form.append('username' , session?.user?.name as string)
        form.append('email' , session?.user?.email as string)
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

    return (
        <>
        <Header />
        <div className={classes.uploadContainer}>
            <div className={classes.uploadFormContainer}>
                <div className={classes.uploadFormHeader}>
                    <h3>Upload File</h3>
                </div>
                <div className={classes.uploadFileContainer}>
                    <div className={classes.uploadFileImage}>
                    <Image alt={"upload photo"} src={Folder} width={70} height={70} onClick={() => {openFile()}}/>
                    <input type='file' id='file_upload' hidden={true} onChange={(e) => {setUploadedFile(e.target.files?.[0])}}/>
                    </div>
                    <p>Choose a <u><b>File</b></u> to upload</p>
                </div>
                <div className={classes.filePropertiesContainer}>
                </div>
                <div className={classes.submitContainer}>
                <select name='states'className={classes.stateDropdown} onChange={(e) => {setSelectedState(e.target.value)}}>
                    <option>Select a state</option>
                    {states.map((state , i) => {
                        return <option key={i}value={state}>{state}</option>
                    })}
                </select>
                    <div className={classes.rightSideSubmitContent}>
                    <button className={classes.cancelButton}>Cancel</button>
                    <button className={classes.socialButton} onClick={() => {uploadFile()}}>Upload</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}