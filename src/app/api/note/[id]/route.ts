import { prisma } from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(request:NextRequest, context: {
  params: Promise<{ id: string }>;
}) {
  try{
 const { id } = await context.params;
 const deleteItem = await prisma.note.delete({
  where:{id}
 })

 return NextResponse.json(deleteItem, {status: 200})
  }catch(err){
    console.error(err, 'unable to delete')
        return NextResponse.json(
      { message: "Failed to delete note" },
      { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();
  const { title, content } = body;

  if (!title || !content) {
    return NextResponse.json(
      { message: "Title and content required" },
      { status: 400 }
    );
  }

  const newUpdate = await prisma.note.update({
    where: { id },
    data: { title, content },
  });

  return NextResponse.json(newUpdate, { status: 200 });
}
