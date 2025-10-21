import { prisma } from "../utils/db"

async function getData() {
    const data = await prisma.note.findMany({
        select: {
            title: true,
            content: true,
            id: true,
            createdAt: true,
            updatedAt: true,
        }
    })

    return data
}

export default async function Display() {

    const data = await getData()

    return (
        <div>
            hello display page
            {data.map((item) => (
                <div key={item.id}>
                    <h1>Title: {item.title}</h1>
                    <p>{item.content}</p>
                    <p>{item.createdAt?.toLocaleString()}</p>
                </div>
            ))}
        </div>
    )
}