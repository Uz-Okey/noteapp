import { prisma } from "@/app/utils/db"
import { NextResponse } from "next/server"

export async  function POST(req: Request){
    try{
const {title, content} = await req.json()

if(!title || !content){
    return(
        NextResponse.json({message: "can't locate the backend server"}, {status: 400})
    )
}

const newNote = await prisma.note.create({
    data:{
        content,
        title
    }
})
 return(
    NextResponse.json(newNote, {status: 200})
 )
    }catch(err){
        console.error(err, 'unable to locate the server')
        return(
            NextResponse.json({message: 'invalid'}, {status: 500})
        )
    }


}


export async function GET(){
    try{
        const Note = await prisma.note.findMany()
        return NextResponse.json(Note)
    }catch(err){
        console.error(err, 'unable to create a read')
        return(
            NextResponse.json({message: 'not working'}, {status: 501})
        )
    }
}