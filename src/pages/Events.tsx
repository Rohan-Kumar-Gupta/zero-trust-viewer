import { useEffect, useState } from "react";
import { Chip, Box } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { eventsData } from "../data/event";
import Loader from "../components/Loader";
import { getStatusColor } from "../utils";
import EnhancedDataGrid from "../components/EnhancedDataGrid";
import { LOADER_DELAY_TIME } from "../utils/constants";

const Events = () => {
  const [loading, setLoading] = useState(true);
  const delay = LOADER_DELAY_TIME;

  useEffect(() => {
    setTimeout(() => setLoading(false), delay);
  }, [delay]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      type: "number",
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      width: 180,
    },
    {
      field: "eventType",
      headerName: "Event Type",
      width: 150,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "sourceIP",
      headerName: "Source IP",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ fontFamily: "monospace" }}>{params.value}</Box>
      ),
    },
    {
      field: "user",
      headerName: "User",
      width: 130,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          sx={{ fontWeight: "bold", borderRadius: "6px" }}
          size="small"
        />
      ),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <EnhancedDataGrid
      rows={eventsData}
      columns={columns}
      title="Events"
      loading={loading}
      searchPlaceholder="Search Events..."
      pageSize={10}
      checkboxSelection={true}
      onRowSelectionModelChange={(selectionModel) => {
        console.log("Selected events:", selectionModel);
      }}
    />
  );
};

export default Events;