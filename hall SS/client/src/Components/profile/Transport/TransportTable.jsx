import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Button, Dialog } from "@mui/material";
import { MdOutlineTune } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { addAPI, deleteAPI, getAPI } from "../../../service/api";
// import CreateOrEditPromoCode from "../../../dialog/course/createOrEditCourse";
import toast from "react-hot-toast";
import CreateUpdateBookingForm from "./createUpdateForm";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const TransportTable = () => {
  const [AllData, setAllData] = React.useState({});
  const [edit, setEdit] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCreateClickOpen = () => {
    setEdit(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function actionCellRenderer(params) {
    const handleButtonClick = (action) => {
      EditOrDelete(params.data, action); // Pass data and action to EditOrDelete function
    };
    return (
      <div className="flex h-full">
        <button
          class="action-button update flex justify-center w-full items-center h-full "
          data-action="update"
          onClick={() => handleButtonClick("update")}
        >
          <FaEdit />
        </button>
        <button
          class="action-button update flex justify-center w-full items-center h-full "
          data-action="update"
          onClick={() => handleButtonClick("delete")}
        >
          <FaTrash />
        </button>
      </div>
    );
  }
  const navigate = useNavigate();
  const gridRef = useRef();

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(
    () => ({ height: "500px", width: "100%", minWidth: "300px" }),
    []
  );
  const [rowData, setRowData] = useState([]);
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      "quickFilterText",
      document.getElementById("filter-text-box").value
    );
  }, []);
  const [columnDefs, setColumnDefs] = useState([
    { field: "name" },
    { field: "pickupLocation" },
    { field: "mobile" },
    //{ field: "totalVehicle" },

    {
      headerName: "action",
      minWidth: 150,
      cellRenderer: actionCellRenderer,
      editable: false,
      colId: "action",

      onCellClicked: (e) => EditOrDelete(e),
    },
  ]);
  function EditOrDelete(data, action) {
    if (action === "update") {
      setOpen(true);
      setEdit(true);
      setAllData(data);
      // Handle update action
    } else if (action === "delete") {
      console.log(data, "data");

      deleteAPI("transports/" + data._id)
        .then((resp) => {
          toast.success("Successfully deleted!");
          onGridReady();
          handleClose();
        })
        .catch((err) => toast.error("something went wrong."));
      // Handle delete action
      console.log("Delete action clicked for data:", data);
    }
  }
  const onBtnExport = useCallback(() => {
    console.log("d");
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Group",
      minWidth: 170,
      field: "athlete",
      valueGetter: (params) => {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      // headerCheckboxSelection: true,
      // cellRenderer: "agGroupCellRenderer",
      // cellRendererParams: {
      //   checkbox: true,
      // },
    };
  }, []);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    try {
      getAPI("transports")
        .then((resp) => {
          let sample = [];
          sample = resp.data;
          const flatData = sample.map((row) => ({
            ...row,
            // courseDescription:
            //   row.courseDescription && row.courseDescription.length > 10
            //     ? row.courseDescription.substring(0, 10) + "..."
            //     : row.courseDescription,
          }));
          setRowData(flatData);
        })
        .catch((err) => setRowData([]));
    } catch (error) {
      setRowData([]);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-between items-start sm:flex-row sm:items-center ">
        <div className="">
          <div
            style={{ width: "140px" }}
            className="text-gray-900  sm-px-5 sm-py-2.5 py-0 text-center inline-flex items-center  me-2 mb-2"
          >
            Transport
          </div>
        </div>

        <div className="">
          <button
            type="button"
            className=" text-black-900 bg-[#c7c7c7] hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 items-center flex justify-center"
            onClick={handleCreateClickOpen}
            style={{ width: "200px", background: "black", color: "#fff" }}
          >
            Add Transport
          </button>
        </div>
      </div>
      <div style={containerStyle}>
        <div
          class="flex items-center justify-between  "
          style={{ color: "black", fontSize: "14px" }}
        >
          <Button
            variant="outlined"
            startIcon={<MdOutlineTune />}
            style={{ color: "black", borderColor: "black" }}
          >
            Filter
          </Button>
          <div className="flex-1 p-5">
            <input
              type="text"
              placeholder="Search ...."
              class="filter-input w-full"
              onInput={onFilterTextBoxChanged}
              id="filter-text-box"
            />
          </div>
        </div>
        <br />
        <h2 className="text-[#828282] font-bold">
          {rowData && rowData.length} Result Found
        </h2>
        <br />
        <div style={gridStyle} className={"ag-theme-quartz"}>
          <AgGridReact
            suppressExcelExport={true}
            rowData={rowData}
            ref={gridRef}
            columnDefs={columnDefs}
            // autoGroupColumnDef={autoGroupColumnDef}
            defaultColDef={defaultColDef}
            // suppressRowClickSelection={true}
            // groupSelectsChildren={true}
            // rowSelection={"multiple"}
            // rowGroupPanelShow={"always"}
            // pivotPanelShow={"always"}
            pagination={true}
            onGridReady={onGridReady}
          />
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        style={{ zIndex: "9999" }}
        maxWidth="lg"
      >
        <CreateUpdateBookingForm
          handleClose={handleClose}
          edit={edit}
          AllData={AllData}
          onGridReady={onGridReady}
        />
      </Dialog>
    </div>
  );
};

export default TransportTable;
