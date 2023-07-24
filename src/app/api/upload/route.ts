import { File } from "buffer";
import { NextRequest, NextResponse } from "next/server";
import {v2 as Cloudinary, UploadApiErrorResponse, UploadApiResponse, UploadStream} from 'cloudinary';
import { Readable } from "stream";
import {prisma } from "@/lib/prisma";

let cloudinary = Cloudinary;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


interface Patch {
    state: string | undefined
    date: string;
    imageUrl?: string
    isApproved: boolean;
    Author: {
        username: string | undefined
        email: string | undefined
        isBanned: boolean
    }
}

export async function POST(req: NextRequest, res:NextResponse) {
    const form:FormData = await req.formData()
    
    const state:FormDataEntryValue | null =  form.get("state");
    const file:FormDataEntryValue | null = form.get('file')
    const username: FormDataEntryValue | null = form.get('username');
    const email: FormDataEntryValue | null = form.get('email')
    const date = Date() 

    const patch:Patch = await createPatchData(state?.toString(),file,date.toString() , username?.toString() , email?.toString())
    console.log(savePatch(patch))

}


const createPatchData = async (state: string | undefined, file: FormDataEntryValue | null , date: string , username: string | undefined, email: string | undefined  ):Promise<Patch> => {
        return {
            state: state,
            date: date,
            imageUrl: await generatePatchImageUrl(file),
            isApproved: false,
            Author: {
                username: username,
                email: email,
                isBanned: false
            }
        }     
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

const savePatch = async (patch:Patch):Promise<any> => {
    const savedPatch = await prisma.patch.create({
        data: {
            state: patch.state,
            date: patch.date,
            image_url: patch.imageUrl,
            isApproved: patch.isApproved,
            Author: {
                create: {
                    username: patch.Author.username,
                    email: patch.Author.email,
                    isBanned: patch.Author.isBanned
                }
            }
        }
    })
    return savedPatch
}