export default function PostForm() {
  return (
    <form className="flex flex-col gap-3">
      <label className="text-xs">Title</label>
      <input
        type="text"
        placeholder="Title"
        className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
      />
      <label className="text-xs">Yap here</label>
      <textarea
        rows={10}
        cols={10}
        placeholder="Content"
        className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
      />
      <input
        type="submit"
        value={"Submit"}
        className="rounded-lg bg-gray-900 text-white py-1 hover:bg-gray-800 cursor-pointer"
      />
    </form>
  );
}
