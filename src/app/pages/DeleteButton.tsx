'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    try {
      const res = await fetch(`/api/note/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Delete failed");
      router.refresh();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="border hover:shadow-2xl border-green-500 rounded-sm px-2 mt-2 hover:bg-gray-300 cursor-pointer"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}
