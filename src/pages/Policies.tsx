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
  IconButton,
  Typography,
  Paper,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { policiesData } from "../data/policies";
import Loader from "../components/Loader";
import { getCriteriaColor } from "../utils/utils";

const Policies = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // mocked loading for 2 seconds
  }, []);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset to page 1 on new search
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const filteredData = policiesData.filter((policy) =>
    policy.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  console.log("debouncedSearch", debouncedSearch);

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box>
      {loading && <Loader />}

      <Typography variant="h6" gutterBottom>
        Policies
      </Typography>

      <TextField
        fullWidth
        label="Search Policies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Criteria</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Score</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Chip
                    label={row.criteria}
                    color={getCriteriaColor(row.criteria)}
                    sx={{ borderRadius: "8px" }}
                  />
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  {row.score.current} / {row.score.max}
                </TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
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

export default Policies;
