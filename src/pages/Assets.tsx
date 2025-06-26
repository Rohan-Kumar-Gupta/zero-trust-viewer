import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Paper,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { assetsData } from "../data/assets";
import Loader from "../components/Loader";
import { getAssetImpactColor, getAssetTypeIcon } from "../utils/utils";

const Assets = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const filteredData = assetsData.filter((asset) =>
    asset.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box>
      {loading && <Loader />}

      <Typography variant="h6" gutterBottom>
        Assets
      </Typography>

      <TextField
        fullWidth
        label="Search Assets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>Type</strong>
              </TableCell>
              <TableCell>
                <strong>Asset Name</strong>
              </TableCell>
              <TableCell>
                <strong>Tags</strong>
              </TableCell>
              <TableCell>
                <strong>OS Family</strong>
              </TableCell>
              <TableCell>
                <strong>Impact</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{getAssetTypeIcon(row.type)}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      sx={{
                        mr: 1,
                        backgroundColor: "#90a4ae",
                        color: "white",
                        borderRadius: "6px",
                      }}
                    />
                  ))}
                </TableCell>
                <TableCell>{row.os}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: getAssetImpactColor(row.impact),
                      fontWeight: "bold",
                    }}
                  >
                    {row.impact}
                  </Typography>
                </TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
};

export default Assets;
