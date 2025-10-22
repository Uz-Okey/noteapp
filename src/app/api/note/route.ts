import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(notes);
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ message: "Error fetching notes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ message: "Title and content required" }, { status: 400 });
    }

    const newNote = await prisma.note.create({
      data: { title, content },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ message: "Error creating note" }, { status: 500 });
  }
}
