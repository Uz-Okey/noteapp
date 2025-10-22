import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedNote = await prisma.note.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedNote, { status: 200 });
  } catch (err) {
    console.error("Error deleting note:", err);
    return NextResponse.json(
      { message: "Failed to delete note" },
      { status: 500 }
    );
  }
}


export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json(); // get new title and content
    const { title, content } = body;

    // ✅ check if title or content is missing
    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    // ✅ update the note
    const updatedNote = await prisma.note.update({
      where: { id: params.id },
      data: { title, content },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (err) {
    console.error("Error updating note:", err);
    return NextResponse.json(
      { message: "Failed to update note" },
      { status: 500 }
    );
  }
}