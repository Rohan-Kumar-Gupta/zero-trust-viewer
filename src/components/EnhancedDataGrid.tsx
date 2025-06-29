import { useState, useMemo, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Box, TextField, Typography, Paper } from "@mui/material";
import { filterWithDeepSearch } from "../utils/searchUtils";

interface EnhancedDataGridProps {
  rows: any[];
  columns: GridColDef[];
  title: string;
  loading?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  checkboxSelection?: boolean;
  disableRowSelectionOnClick?: boolean;
  onRowSelectionModelChange?: (selectionModel: GridRowSelectionModel) => void;
}

function CustomToolbar() {
  return <GridToolbar />;
}

const EnhancedDataGrid = ({
  rows,
  columns,
  title,
  loading = false,
  searchPlaceholder = "Search...",
  pageSize = 10,
  checkboxSelection = false,
  disableRowSelectionOnClick = true,
  onRowSelectionModelChange,
}: EnhancedDataGridProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize,
  });

   // Debounce logic
   useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const filteredRows = useMemo(() => {
    console.log("debouncedSearchKey", debouncedSearch);
    return filterWithDeepSearch(rows, debouncedSearch);
  }, [rows, debouncedSearch]);

  const enhancedColumns = useMemo(() => {
    return columns.map((col) => ({
      ...col,
      sortable: true,
      filterable: true,
      // Add some default styling
      headerAlign: col.headerAlign || ("left" as const),
      align: col.align || ("left" as const),
    }));
  }, [columns]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <TextField
        fullWidth
        label={searchPlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Paper sx={{ height: 600, width: "100%", overflow: "hidden" }}>
        <DataGrid
          rows={filteredRows}
          columns={enhancedColumns}
          loading={loading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          checkboxSelection={checkboxSelection}
          disableRowSelectionOnClick={disableRowSelectionOnClick}
          onRowSelectionModelChange={onRowSelectionModelChange}
          slots={{
            toolbar: CustomToolbar,
          }}
          sx={{
            border: 0,
            "& .MuiDataGrid-main": {
              overflow: "hidden",
            },
            "& .MuiDataGrid-virtualScroller": {
              overflow: "auto",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              borderBottom: "2px solid #e0e0e0",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              "&:focus": {
                outline: "none",
              },
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              borderRight: "1px solid #e0e0e0",
              "&:focus": {
                outline: "none",
              },

              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
            },
            "& .MuiDataGrid-row": {
              "&:hover": {
                backgroundColor: "#f8f9fa",
              },
            },
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              flex: 1,
              display: "flex", 
              alignItems: "center", 
              overflow: "hidden",
              justifyContent: "center",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "2px solid #e0e0e0",
              backgroundColor: "#f5f5f5",
            },
          }}
          // Enable advanced features
          columnHeaderHeight={66}
          rowHeight={62}
          // Disable column resizing
        //   disableColumnResize={true}
          // Enable row selection
          keepNonExistentRowsSelected={false}
          // Auto height adjustments
          autoHeight={false}
          // Disable virtual scrolling issues
          scrollbarSize={7}
        />
      </Paper>
    </Box>
  );
};

export default EnhancedDataGrid;
