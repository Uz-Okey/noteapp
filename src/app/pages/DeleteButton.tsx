'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrash } from "@fortawesome/free-solid-svg-icons";
export default function DeleteButton({ id }: { id: string }) {


    async function handleDelete() {
        try {
            const req = await fetch(`/api/note/${id}`,
                {
                    method: "DELETE",
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            window.location.reload()
            if (!req.ok) throw new Error('unable to delete item')
        } catch (err) {
            console.error(err, 'unable to delete')
        }

    }


    return (
        <div>
            <button onClick={handleDelete} className="border hover:shadow-2xl border-green-500 rounded-sm px-2 mt-2 hover:bg-gray-300 cursor-pointer"><FontAwesomeIcon icon={faTrash} /></button>
        </div>
    )
}