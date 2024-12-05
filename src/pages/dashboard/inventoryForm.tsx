import { Input } from "../../components";

export default function InventoryForm({ state, setState, error }: any) {
  return (
    <>
      <div className="grid gap-3">
        <Input
          label="Entry id"
          value={state.entryId}
          onChange={(e: { target: { value: string } }) =>
            setState({ ...state, entryId: e.target.value })
          }
        />
        <p className="text-sm text-red-400">{error.entryId}</p>

        <Input
          label="Title"
          value={state.title}
          onChange={(e: { target: { value: string } }) =>
            setState({ ...state, title: e.target.value })
          }
        />
        <p className="text-sm text-red-400">{error.title}</p>

        <Input
          label="Author"
          value={state.author}
          onChange={(e: { target: { value: string } }) =>
            setState({ ...state, author: e.target.value })
          }
        />
        <p className="text-sm text-red-400">{error.author}</p>

        <Input
          label="Genre"
          value={state.genre}
          onChange={(e: { target: { value: string } }) =>
            setState({ ...state, genre: e.target.value })
          }
        />

        <p className="text-sm text-red-400">{error.genre}</p>
        <Input
          label="Publication Date"
          type="date"
          value={state.publicationDate}
          onChange={(e: { target: { value: string } }) =>
            setState({ ...state, publicationDate: e.target.value })
          }
        />
        <p className="text-sm text-red-400">{error.publicationDate}</p>

        <Input
          label="ISBN"
          value={state.isbn}
          onChange={(e: { target: { value: string } }) =>
            setState({ ...state, isbn: e.target.value })
          }
        />
        <p className="text-sm text-red-400">{error.isbn}</p>
      </div>
    </>
  );
}
