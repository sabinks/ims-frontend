import { Input } from "../../components";
import { Inventory422Error } from "../../types";

export default function InventoryForm({ state, setState, errors }: any) {
  return (
    <>
      <div className="grid gap-3">
        <Input
          label="Entry Id"
          value={state.entryId}
          onChange={(e: { target: { value: string } }) =>
            setState({ ...state, entryId: e.target.value })
          }
          placeholder="Book Entry Id"
        />
        <p className="text-sm text-red-400">
          {
            errors?.find(
              (error: Inventory422Error) => error.property == "entryId"
            )?.message
          }
        </p>
        <Input
          label="Title"
          value={state.title}
          onChange={(e: { target: { value: string } }) =>
            setState({ ...state, title: e.target.value })
          }
          placeholder="Book Title"
        />
        <p className="text-sm text-red-400">
          {
            errors?.find(
              (error: Inventory422Error) => error.property == "title"
            )?.message
          }
        </p>
        <Input
          label="Author"
          value={state.author}
          onChange={(e: { target: { value: string } }) =>
            setState({ ...state, author: e.target.value })
          }
          placeholder="Book Author"
        />
        <p className="text-sm text-red-400">
          {
            errors?.find(
              (error: Inventory422Error) => error.property == "author"
            )?.message
          }
        </p>
        <Input
          label="Genre"
          value={state.genre}
          onChange={(e: { target: { value: string } }) =>
            setState({ ...state, genre: e.target.value })
          }
          placeholder="Book Genre"
        />
        <p className="text-sm text-red-400">
          {
            errors?.find(
              (error: Inventory422Error) => error.property == "genre"
            )?.message
          }
        </p>
        <Input
          label="Publication Date"
          type="date"
          value={state.publicationDate}
          onChange={(e: { target: { value: string } }) =>
            setState({ ...state, publicationDate: e.target.value })
          }
        />
        <p className="text-sm text-red-400">
          {
            errors?.find(
              (error: Inventory422Error) => error.property == "publicationDate"
            )?.message
          }
        </p>
        <Input
          label="ISBN"
          value={state.isbn}
          onChange={(e: { target: { value: string } }) =>
            setState({ ...state, isbn: e.target.value })
          }
          placeholder="Format: 978-3-16-148410-0"
        />
        <p className="text-sm text-red-400">
          {
            errors?.find((error: Inventory422Error) => error.property == "isbn")
              ?.message
          }
        </p>
      </div>
    </>
  );
}
