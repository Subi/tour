import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    const {data} = await req.json()
    const results = await prisma.author.findUnique({
        where : {
            username: data.username
        },
    })
    return NextResponse.json(results)
}