import { prisma } from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (err) {
    console.error("PATCH Error:", err);
    return NextResponse.json({ message: "Error updating note" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.note.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json({ message: "Error deleting note" }, { status: 500 });
  }
}
