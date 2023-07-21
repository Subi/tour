import { File } from "buffer";
import { NextRequest, NextResponse } from "next/server";
import {v2 as Cloudinary, UploadApiErrorResponse, UploadApiResponse, UploadStream} from 'cloudinary';
import { Readable } from "stream";
import { read } from "fs";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { test } from "node:test";

let cloudinary =  Cloudinary;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


interface Patch {
    state: string | undefined;
    date: string;
    imageUrl: string | undefined;
    isApproved: boolean;
}

export async function POST(req: NextRequest, res:NextResponse) {

    const form:FormData = await req.formData()
    const state:FormDataEntryValue | null =  form.get("state");
    const file:FormDataEntryValue | null = form.get('file')
    const date = Date()

    const patch:Patch = await createPatchData(state?.toString(),file,date.toString())

    
}


const createPatchData = async (state: string | undefined , file: FormDataEntryValue | null , date: string , ):Promise<Patch> => {
        const newPatch: Patch = {
            state: state,
            date: date,
            imageUrl: await generatePatchImageUrl(file),
            isApproved: false
        } 
        
        return newPatch
    
}


const generatePatchImageUrl = async (file: FormDataEntryValue | null):Promise<string | undefined> => {
    const readable = await fileToBuffer(file)

    return new Promise<string | undefined>((resolve , reject) => {
        let uploadStream: UploadStream = cloudinary.uploader.upload_stream({
            folder: "dev"
        }, (err , res) => {
            if(err) {
                return reject(err)
            } else {
                return resolve(res?.url)
            }
        })
        readable.pipe(uploadStream)
    })
}



const fileToBuffer = async (file: FormDataEntryValue | null):Promise<Readable> => {
    let newFile = file as Blob
    const buffer: ArrayBuffer = Buffer.from(await newFile.arrayBuffer())

    const readable = new Readable({
        read() {
            this.push(buffer)
            this.push(null)
        }
    
    })
    return readable
}