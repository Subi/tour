'use client';
import Header from '../components/header';
import classes from './upload.module.css';
import Image from 'next/image';
import Folder from '../../../public/folder.svg'
import { useState } from 'react';
export default function Upload(){
    const [selectedState , setSelectedState] = useState('')
    const [uploadedFile , setUploadedFile] = useState<Blob | undefined>(undefined)
    
    const uploadFile = async ():  Promise<void> => {
        if(!uploadedFile) return ;

        const form : FormData =  new FormData();
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
        <Header/>
        <div className={classes.uploadContainer}>
            <div className={classes.uploadFormContainer}>
                <div className={classes.uploadFormHeader}>
                    <h3>Upload File</h3>
                    {/* <span>x</span> */}
                </div>
                <div className={classes.uploadFileContainer}>
                    <div className={classes.uploadFileImage}>
                    <Image alt={"upload photo"} src={Folder} width={50} height={50} onClick={() => {openFile()}}/>
                    <input type='file' id='file_upload' hidden={true} onChange={(e) => {setUploadedFile(e.target.files?.[0])}}/>
                    </div>
                    <p>Choose a <u><b>File</b></u> to upload</p>
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