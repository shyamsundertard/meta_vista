import { NextRequest } from "next/server";
import prisma from "../../../../../../prisma/prisma";

export async function GET(req:NextRequest,{params}:{params?:{pagename?:string, webPageName?:string}}){
    const title =params?.pagename;
    const webPageName =params?.webPageName;

    try {
      const info = await prisma.metainfo.findUnique({
        where:{
          title:webPageName,
          parentId:0
        }
      })
        const data = await prisma.metainfo.findUnique({
            where:{
                title:title,
                parentId: info?.id as number
            }
        });
        return new Response(JSON.stringify(data),{status:200});
    } catch (error) {
        return new Response(JSON.stringify(error),{status:500})
    }
};

export async function PATCH(req:NextRequest,{params}:{params?:{pagename?:string, webPageName?:string}}){
    const title=params?.pagename;
    const webPageName =params?.webPageName;

    const body = await req.json();
    try {
      const data = await prisma.metainfo.findUnique({
        where:{
          title:webPageName,
          parentId:0
        }
      })
        await prisma.metainfo.update({
            where:{
                title:title,
                parentId:data?.id
            },
            data:{
                description:{
                    push:{
                        heading: body.heading,
                        detail: body.detail
                    }
                }
            },
        });
        return new Response(JSON.stringify("Section added successfully"),{status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: "Failed to add Section"}),{status:500})  
    }
};

export async function PUT(req:NextRequest,{params}:{params?:{pagename?:string, webPageName?:string}}){
    const title=params?.pagename;
    const webPageName =params?.webPageName;
    const body = await req.json();
    try {
      const data = await prisma.metainfo.findUnique({
        where:{
          title:webPageName,
          parentId:0
        }
      })
        const existingData = await prisma.metainfo.findUnique({
          where: {
            title: title,
            parentId:data?.id
          },
          select: {
            description: true,
          },
        });
    
        if (!existingData) {
          return new Response(JSON.stringify({ error: "Record not found" }), { status: 404 });
        }
    
        const updatedDescription = existingData.description.map((item, index) => {
          if (index === body.index) {
            return {
              heading: body.heading,
              detail: body.detail,
            };
          }
          return item;
        });
    
        await prisma.metainfo.update({
          where: {
            title: title,
            parentId:data?.id
          },
          data: {
            description: {
              set: updatedDescription.filter((item): item is Exclude<typeof item, null> => item !== null), // Cast null to Exclude<typeof item, null>
            },
          },
        });
        return new Response(JSON.stringify("Section added successfully"),{status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: "Failed to add Section"}),{status:500})  
    }
};

export async function DELETE(req: NextRequest, { params }: { params?: { pagename?: string, webPageName?:string } }) {
    const title = params?.pagename;
    const webPageName =params?.webPageName;
    const body = await req.json();
  
    try {
      const data = await prisma.metainfo.findUnique({
        where:{
          title:webPageName,
          parentId:0
        }
      })
      const existingData = await prisma.metainfo.findUnique({
        where: {
          title: title,
          parentId:data?.id
        },
        select: {
          description: true,
        },
      });
  
      if (!existingData) {
        return new Response(JSON.stringify({ error: "Record not found" }), { status: 404 });
      }
  
      const updatedDescription = existingData.description
        .map((item, index) => (index === body.index ? null : item)) // Mark the item at the specified index as null
        .filter((item): item is Exclude<typeof item, null> => item !== null); // Filter out null values
  
      await prisma.metainfo.update({
        where: {
          title: title,
          parentId:data?.id
        },
        data: {
          description: {
            set: updatedDescription,
          },
        },
      });
  
      return new Response(JSON.stringify("Section deleted successfully"), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to delete Section" }), { status: 500 });
    }
  };