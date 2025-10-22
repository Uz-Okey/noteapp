import { prisma } from "@/app/utils/db"
import Link from "next/link"

interface props {
    params: { id: string }
}


export default async function Content({ params }: props) {




    const data = await prisma.note.findUnique({
        where: { id: params.id }
    })

    if (!data) {
        return (
            <>Page not found</>
        )
    }



    return (
        <div className="max-w-100 mx-auto">
            <Link href='/' className="hover:underline">back to home</Link>

            <h1 className="text-3xl font-bold text-green-600 mb-4">{data.title}</h1>
            <p className="bg-gray-100 p-4 rounded">{data.content}</p>
            <p className="mt-4 text-gray-500">
                Created: {data.createdAt?.toLocaleString()}
            </p>

        </div>
    )
}
