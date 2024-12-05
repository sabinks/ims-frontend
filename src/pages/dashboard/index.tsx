import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { getQueryData } from "../../api";
import { Button, NewTable, PageTitle, SidePanel } from "../../components";
import { Inventory, Inventory422Error } from "../../types";
import { PencilIcon, SaveIcon, TrashIcon } from "@heroicons/react/outline";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import "react-toastify/dist/ReactToastify.css";
import {
  allInventoryList,
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
  const [formerrors, setFormErrors] = React.useState<Inventory422Error[]>([]);

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
      onSuccess: (res: any) => {
        setTableData(res.data);
      },
    }
  );

  const { refetch: refetchExportData, isFetching: isFetchingExportData } =
    useQuery(["inventories"], allInventoryList, {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data: any) => {
        const rows = [
          "Id",
          "Entry ID",
          "Title",
          "Author",
          "Genre",
          "Publication Date",
          "ISBN",
        ];

        let csvContent = "data:text/csv;charset=utf-8,";
        let columns = rows.join(",");
        csvContent += columns + "\r\n";

        data.forEach((rowArray: any) => {
          let values = Object.values(rowArray);
          let row = values.join(",");
          csvContent += row + "\r\n";
        });
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "inventory_data.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
      },
    });

  const { isLoading: creatingInventory, mutate } = useMutation<any, Error>(
    async () => {
      return await postInventory(state);
    },
    {
      onSuccess: () => {
        refetch();
        setFormErrors([]);
        setState({
          entryId: "",
          title: "",
          author: "",
          genre: "",
          publicationDate: "",
          isbn: "",
        });
        toggleIsVisible(false);
      },
      onError: (err: any) => {
        const { status } = err.response;

        if (status == 422) {
          const {
            data: {
              response: { message },
            },
          } = err.response;

          setFormErrors(message);
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
        setFormErrors([]);
        setState({
          entryId: "",
          title: "",
          author: "",
          genre: "",
          publicationDate: "",
          isbn: "",
        });
        setIsEdit(!isEdit);
      },
      onError: (err: any) => {
        const { status } = err.response;

        if (status == 422) {
          const {
            data: {
              response: { message },
            },
          } = err.response;

          setFormErrors(message);
        } else {
          console.log("Inventory Error: ", err);
        }
      },
    }
  );

  const { mutate: mutateDeleteInventory } = useMutation<any, Error>(
    async (inventoryId: any) => {
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
  const handleEdit = (id: any) => {
    setIsEdit(!isEdit);
    const inventory = tableData.find(
      (inventory: Inventory) => inventory.id == id
    );
    setInventoryId(inventory.id);
    setState({ ...inventory });
  };

  const inventoryColumns = [
    columnHelper.accessor("entryId", {
      header: "Entry ID",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("author", {
      header: "Author",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("genre", {
      header: "Genre",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("isbn", {
      header: "ISBN",
      cell: (info: any) => info.getValue(),
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
              onClick={() => handleEdit(el.row.original.id)}
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
        <div className="flex space-x-2">
          <Button
            label="Add New Inventory"
            onClick={() => {
              toggleIsVisible(true);
              setState(initialState);
            }}
            loading={isFetching}
          />
          <Button
            buttonType="secondary"
            label="Export Data"
            onClick={() => {
              refetchExportData();
            }}
            icon={<SaveIcon />}
            loading={isFetchingExportData}
          />
        </div>
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
          setFormErrors([]);
        }}
        title="Add New Inventory"
        primaryButtonAction={async () => {
          await mutate();
        }}
        primaryButtonLoading={creatingInventory}
      >
        <React.Suspense fallback="loading">
          <InventoryForm
            state={state}
            setState={setState}
            errors={formerrors}
          />
        </React.Suspense>
      </SidePanel>
      <SidePanel
        isVisible={isEdit}
        onClose={() => {
          setIsEdit(!isEdit);
          setFormErrors([]);
        }}
        title="Update Inventory"
        TertiaryButtonAction={async () => {
          setFormErrors([]);
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
        <InventoryForm state={state} setState={setState} errors={formerrors} />
      </SidePanel>
    </>
  );
}
