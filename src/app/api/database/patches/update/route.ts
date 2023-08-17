import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/lib/prisma';
import {NextApiResponse } from "next";


export async function POST(req:NextRequest, res:NextApiResponse) {
    const {data} = await req.json()

    const result =  await prisma.patch.update({
        where : {
            id: data.id
        },
        data: {
            isApproved: true
        }
    })
    console.log(result)
}