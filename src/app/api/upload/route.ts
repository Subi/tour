import { File } from "buffer";
import { NextRequest, NextResponse } from "next/server";
import {v2 as Cloudinary, UploadApiErrorResponse, UploadApiResponse, UploadStream} from 'cloudinary';
import { Readable } from "stream";
import {prisma } from "@/lib/prisma";
import { handler } from "../discord/route";
import path from "path";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";

let cloudinary = Cloudinary;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


export interface Patch {
    id: number | null
    state: string | undefined
    date: string;
    imageUrl?: string
    isApproved: boolean | null; 
    Author: {
        username: string | undefined
        email: string | undefined
        isBanned: boolean
        avatarUrl: string | undefined
    }
}

export async function POST(req: NextRequest, res:NextResponse) {
    const form:FormData = await req.formData()
    
    const state:FormDataEntryValue | null =  form.get("state");
    const file:FormDataEntryValue | null = form.get('file');
    const username: FormDataEntryValue | null = form.get('username');
    const email: FormDataEntryValue | null = form.get('email');
    const avatarUrl:FormDataEntryValue | null = form.get('avatar');
    const date = new Date()



    const patch:Patch = await createPatchData(state?.toString(), file, date.toLocaleDateString() , username?.toString() , email?.toString() , avatarUrl?.toString())
    if(patch) {
        const savedPatch:Patch = await savePatch(patch)
        handler(savedPatch)
    } else {
        console.error("Error creating patch data from upload form.")
    }
}


const createPatchData = async (state: string | undefined, file: FormDataEntryValue | null , date: string , username: string | undefined, email: string | undefined , avatarUrl: string | undefined  ):Promise<Patch> => {
        return {
            id: null,
            state: state,
            date: date,
            imageUrl: await generatePatchImageUrl(file),
            isApproved: null,
            Author: {
                username: username,
                email: email,
                isBanned: false,
                avatarUrl: avatarUrl
            }
        }     
}


const generatePatchImageUrl = async (file: FormDataEntryValue | null):Promise<string | undefined> => {
    const readable = await fileToBuffer(file)
    return new Promise<string | undefined>((resolve , reject) => {
        let uploadStream: UploadStream = cloudinary.uploader.upload_stream(
            { folder: "dev" , background_removal: "cloudinary_ai",  transformation:[{width: 500 , height: 500 , gravity:"center" , crop: "fit"}]}
            ,(err , res) => {
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

    return new Readable({
        read() {
            this.push(buffer)
            this.push(null)
        }
    
    })
}



const savePatch = async (patch:Patch):Promise<any> => {
    return await prisma.patch.create({
        data: {
            state: patch.state,
            date: patch.date,
            imageUrl: patch.imageUrl,
            isApproved: patch.isApproved,
            Author: {
                connectOrCreate: {
                    where: {
                        username: patch.Author.username
                    },
                    create: {
                        username: patch.Author.username,
                        email: patch.Author.email,
                        isBanned: patch.Author.isBanned,
                        avatarUrl: patch.Author.avatarUrl
                    }
                },
            },
        },
        include : {
            Author : true
        }
    })
}