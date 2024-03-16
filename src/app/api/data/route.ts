import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { createDataSchema } from "../../validationSchema";

export async function PATCH(req:NextRequest) {
    const body = await req.json();

    try {     
        if (body.parentId == 0) {
            const data = await prisma.metainfo.findMany({
               where:{
                   parentId:body.parentId
               }
            });
           return NextResponse.json(data,{status:200});
        } else {
            const data = await prisma.metainfo.findMany({})
            return NextResponse.json(data,{status:200})
        }
    
    } catch (error) {
        return new Response(JSON.stringify(error),{status:500})
    }
}

export async function POST(req:NextRequest) {

    try {
        const body = await req.json();
        const validation = createDataSchema.safeParse(body);
        if(!validation.success){
        return NextResponse.json(validation.error.format(),{status:400})
    }
        else{
            await prisma.metainfo.create({
               data:{
                   title: body.title,
                   description: body.description,
                   parentId: body.parentId
               }
           });
           console.log("Page Created")
           return NextResponse.json("Data Saved",{status:201});
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error),{status:500})
    }
}