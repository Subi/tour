import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest , res:NextApiRequest) {
    const {data} = await req.json()
    const results = await prisma.author.findUnique({
        where : {
            username: data.username
        },
    })
    return NextResponse.json(results)
}