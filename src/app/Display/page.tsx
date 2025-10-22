export const dynamic = "force-dynamic";

import { prisma } from "../utils/db";
import Link from "next/link";
import DeleteButton from "../pages/DeleteButton";
import EditButton from "../pages/EditButton";
import { AnimateText } from "@/components/ui/animated-text";

async function getData() {
  const data = await prisma.note.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return data;
}

export default async function Display() {
  const data = await getData();

  return (
    <div>
      <Link href="/">
        <AnimateText
          text="Create a Note"
          className="font-serif text-center text-green-500"
          type="blink"
          custom={1}
        />
      </Link>

      <div className="grid mx-auto p-8 sm:grid-cols-2 gap-4 md:grid-cols-3">
        {data.map((item) => (
          <div key={item.id} className="mt-2">
            <div className="text-black shadow-2xl flex flex-col min-h-80 border border-green-500 gap-4 space-y-3 mx-auto p-3">
              <h1 className="bg-white underline text-shadow-2xs p-2 rounded-sm font-bold text-2xl text-black">
                Title: {item.title}
              </h1>

              <p className="bg-gray-300 flex-1 p-2 rounded-sm line-clamp-3">{item.content}</p>

              <Link href={`/Display/${item.id}`}>view full Note</Link>

              <div className="flex items-center justify-between">
                <p className="text-black">{item.createdAt?.toLocaleString()}</p>

                <div className="flex items-center space-x-2">
                  <DeleteButton id={item.id} />
                  <EditButton id={item.id} title={item.title ?? ''} content={item.content ?? ''} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
