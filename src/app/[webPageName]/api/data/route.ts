import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function PATCH(req:NextRequest,{params}:{params:{webPageName:string}}) {
    try {
        const title = params?.webPageName;

        const web = await prisma.metainfo.findUnique({
            where:{
                title,
                parentId: 0
            }
        })

        const data = await prisma.metainfo.findMany({
            where:{
                parentId:web?.id
            }
        });
       return NextResponse.json(data,{status:200});
    } catch (error) {
        return new Response(JSON.stringify(error),{status:500})
    }

}

export async function POST(req:NextRequest) {

    try {
        const body = await req.json();

        const data = await prisma.metainfo.findUnique({
            where:{
                title:body.webPageName,
                parentId: 0
            }
        })
        
            await prisma.metainfo.create({
               data:{
                   title: body.title,
                   description: body.description,
                   parentId: data?.id as number
               }
           });
           console.log("Page Created")
           return NextResponse.json("Data Saved",{status:201});
        
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error),{status:500})
    }
}