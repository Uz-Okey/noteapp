'use client'

import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface EditFormValues {
  title: string
  content: string
}

export default function EditButton({ id, title, content }: { id: string; title: string; content: string }) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm<EditFormValues>({
    defaultValues: {
      title,
      content,
    },
  })

  async function onSubmit(data: EditFormValues) {
    try {
      setLoading(true)
      const res = await fetch(`/api/note/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to update note")
      window.location.reload()
    } catch (err) {
      console.error("Error updating note:", err)
    } finally {
      setLoading(false)
      setIsEditing(false)
      reset(data)
    }
  }

  function handleEditButton() {
    setIsEditing(true)
  }

  return (
    <div className=" border border-green-500 rounded-md mt-2">
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
          <input
            {...register("title")}
            className="border p-2 m-2 rounded-md"
          />
          <textarea
            {...register("content")}
            className="border p-2 m-2 rounded-md"
            rows={4}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 m-2 text-white p-2 rounded-md"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      ) : (
        <button
          onClick={handleEditButton}
          disabled={loading}
          className=" text-black  hover:bg-gray-300 cursor-pointer px-2 rounded-md"
        >
        <FontAwesomeIcon icon={faEdit} />
        </button>
      )}
    </div>
  )
}
