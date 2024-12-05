import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { getQueryData } from "../../api";
import { Button, NewTable, PageTitle, SidePanel } from "../../components";
import { Inventory } from "../../types";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteInventory,
  postInventory,
  updateInventory,
} from "../../api/inventory";
import { format, parse } from "date-fns";
import Search from "../../components/search";
import InventoryForm from "./inventoryForm";

const initialState = {
  entryId: "",
  title: "",
  author: "",
  genre: "",
  publicationDate: "",
  isbn: "",
};

export default function Dashboard() {
  const [query, setQuery] = React.useState<string>("");
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "entryId",
      desc: true,
    },
  ]);
  const [page, setPage] = React.useState<number>(1);
  const [isEdit, setIsEdit] = React.useState(false);
  const [inventoryId, setInventoryId] = React.useState(null);
  const [isVisible, toggleIsVisible] = React.useState(false);
  const [tableData, setTableData] = React.useState<any>([]);
  const [formerrors, setFormErrors] = React.useState<any>({});

  const {
    isLoading,
    data: result,
    refetch,
    isFetching,
  } = useQuery(
    [
      "inventory",
      query,
      sorting[0].id,
      sorting[0].desc ? "desc" : "asc",
      page,
      5,
    ],
    getQueryData,
    {
      onSuccess: (res) => {
        setTableData(res.data);
      },
    }
  );
  console.log(result);

  const { isLoading: creatingInventory, mutate } = useMutation<any, Error>(
    async () => {
      return await postInventory(state);
    },
    {
      onSuccess: () => {
        refetch();
        toggleIsVisible(false);
      },
      onError: (err: any) => {
        const { status, data } = err.response;
        if (status == 422) {
          setFormErrors(data);
        } else {
          console.log("Inventory Error: ", err);
        }
      },
    }
  );
  const { isLoading: updatingInventory, mutate: updateMutate } = useMutation<
    any,
    Error
  >(
    async () => {
      return await updateInventory(inventoryId, state);
    },
    {
      onSuccess: () => {
        refetch();
        setIsEdit(!isEdit);
      },
      onError: (err: any) => {
        const { status, data } = err.response;
        if (status == 422) {
          setFormErrors(data);
        } else {
          console.log("Course Form Error: ", err);
        }
      },
    }
  );

  const { mutate: mutateDeleteInventory } = useMutation<any, Error>(
    async (inventoryId) => {
      return await deleteInventory(inventoryId);
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );
  const [state, setState] = React.useState<Inventory>(initialState);
  const handleSearch = (value: string) => {
    setPage(1);
    setQuery(value);
  };
  const columnHelper = createColumnHelper<Inventory>();
  const handelEdit = (e: any) => {
    setIsEdit(!isEdit);
    setInventoryId(result.data.data[e].id);
    let editdata = { ...result?.data.data[e] };
    setState(editdata);
  };

  const inventoryColumns = [
    columnHelper.accessor("entryId", {
      header: "Entry ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("author", {
      header: "Author",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("genre", {
      header: "Genre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isbn", {
      header: "ISBN",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("publicationDate", {
      header: "Publication Date",
      cell: (info: any) => {
        const { publicationDate } = info.row.original;
        if (publicationDate != "") {
          const date = parse(`${publicationDate}`, "yyyy-MM-dd", new Date());
          return format(date, "MM/dd/yyyy");
        } else return "-";
      },
    }),
    {
      header: "Action",
      cell: (el: any) => (
        <div className="flex flex-row space-x-2">
          {
            <Button
              icon={<PencilIcon />}
              buttonType="success"
              label=""
              tooltipMsg="Edit Inventory"
              onClick={() => handelEdit(el.row.id)}
            />
          }
          {
            <Button
              buttonType="danger"
              icon={<TrashIcon />}
              label=""
              onClick={() => mutateDeleteInventory(el.row.original.id)}
            />
          }
        </div>
      ),
    },
  ];

  const handlePaginationActon = (currentPage: any | void) => {
    setPage(currentPage.selected + 1);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <PageTitle title="Inventory" />
        {
          <Button
            label="Add New Inventory"
            onClick={() => {
              toggleIsVisible(true);
              setState(initialState);
            }}
          />
        }
      </div>
      <div className="flex flex-col sm:px-6 lg:px-8">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full ">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Search
                query={query}
                placeholder="Search Inventory..."
                handleSearch={handleSearch}
              />

              <NewTable
                data={tableData}
                columns={inventoryColumns}
                sorting={sorting}
                setSorting={setSorting}
                pageCount={result?.meta?.lastPage}
                handlePaginationActon={handlePaginationActon}
                isloading={isFetching}
                Page={page}
              />
            </div>
          </div>
        </div>
      </div>
      <SidePanel
        isVisible={isVisible}
        onClose={() => {
          toggleIsVisible(!isVisible);
          setFormErrors({});
        }}
        title="Add New Inventory"
        primaryButtonAction={async () => {
          setFormErrors({});
          await mutate();
          setState({
            entryId: "",
            title: "",
            author: "",
            genre: "",
            publicationDate: "",
            isbn: "",
          });
        }}
        primaryButtonLoading={creatingInventory}
      >
        <React.Suspense fallback="loading">
          <InventoryForm state={state} setState={setState} error={formerrors} />
        </React.Suspense>
      </SidePanel>
      <SidePanel
        isVisible={isEdit}
        onClose={() => {
          setIsEdit(!isEdit);
          setFormErrors({});
        }}
        title="Update Inventory"
        TertiaryButtonAction={async () => {
          setFormErrors({});
          await updateMutate();
          setState({
            entryId: "",
            title: "",
            author: "",
            genre: "",
            publicationDate: "",
            isbn: "",
          });
        }}
        primaryButtonLoading={updatingInventory}
      >
        <InventoryForm state={state} setState={setState} error={formerrors} />
      </SidePanel>
    </>
  );
}
