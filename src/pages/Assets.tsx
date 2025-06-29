import { useEffect, useState } from "react";
import { Chip, Typography, Box } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { assetsData } from "../data/assets";
import Loader from "../components/Loader";
import { getAssetImpactColor, getAssetTypeIcon } from "../utils";
import EnhancedDataGrid from "../components/EnhancedDataGrid";
import { LOADER_DELAY_TIME } from "../utils/constants";

const Assets = () => {
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
      field: "type",
      headerName: "Type",
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {getAssetTypeIcon(params.value)}
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Asset Name",
      width: 200,
      flex: 1,
      minWidth: 150,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {params.value.map((tag: string, index: number) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                backgroundColor: "#90a4ae",
                color: "white",
                borderRadius: "6px",
              }}
            />
          ))}
        </Box>
      ),
    },
    {
      field: "os",
      headerName: "OS",
      width: 100,
    },
    {
      field: "osFamily",
      headerName: "OS Family",
      width: 100,
    },
    {
      field: "impact",
      headerName: "Impact",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          sx={{
            color: getAssetImpactColor(params.value),
            fontWeight: "bold",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          sx={{
            color: params.value === "Active" ? "#008080" : "#8B8589",
            fontWeight: "bold",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "attackSurfaceSecurity",
      headerName: "Security",
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography sx={{ color: "#90a4ae" }}>{params.value}</Typography>
      ),
    },
    {
      field: "attackSurfaceStatus",
      headerName: "Surface Status",
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          sx={{
            color: params.value === "Unmonitored" ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "breachImpact",
      headerName: "Breach Impact",
      width: 130,
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <EnhancedDataGrid
      rows={assetsData}
      columns={columns}
      title="Assets"
      loading={loading}
      searchPlaceholder="Search Assets..."
      pageSize={10}
      checkboxSelection={true}
      onRowSelectionModelChange={(selectionModel) => {
        console.log("Selected assets:", selectionModel);
      }}
    />
  );
};

export default Assets;