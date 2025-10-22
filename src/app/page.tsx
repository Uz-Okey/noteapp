'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface formValue {
  title: string;
  content: string;
}

export default function Home() {
  const [error, setError] = useState("");
  const router = useRouter();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<formValue>();

  async function handleSubmitForm(data: formValue) {
    try {
      const req = await fetch("/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!req.ok) throw new Error("Post failed");
      reset();
      router.push("/Display");
    } catch (err) {
      console.error(err);
      setError("Unable to post data");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="w-[400px] shadow-2xl rounded-sm my-10 justify-center h-dvh items-center flex flex-col mx-auto space-y-4 border border-green-500">
      <p>{error}</p>
      <h1 className="font-sans font-bold text-3xl text-shadow-2xs text-green-500">Create A Note</h1>

      <label className="text-2xl font-bold font-sans">Title</label>
      <input className="border border-green-500 p-2 w-80" placeholder="Enter title" {...register("title", { required: true })} />
      {errors.title && <p>Title is required</p>}

      <label className="text-2xl font-bold font-sans">Content</label>
      <textarea className="border border-green-500 p-2 w-80" placeholder="Enter content" {...register("content", { required: true })} />
      {errors.content && <p>Content is required</p>}

      <input type="submit" className="bg-green-500 text-white rounded-sm p-2 cursor-pointer hover:shadow-2xl" />
    </form>
  );
}
