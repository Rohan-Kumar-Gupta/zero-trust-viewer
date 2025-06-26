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
import { eventsData } from "../data/event";
import Loader from "../components/Loader";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "critical":
      return "error";
    default:
      return "default";
  }
};

const Events = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const filteredData = eventsData.filter((event) =>
    event.eventType.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // simulate loading
  }, []);

  return (
    <Box>
      {loading && <Loader />}

      <Typography variant="h6" gutterBottom>
        Events
      </Typography>

      <TextField
        fullWidth
        label="Search Events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>Timestamp</strong>
              </TableCell>
              <TableCell>
                <strong>Event Type</strong>
              </TableCell>
              <TableCell>
                <strong>Source IP</strong>
              </TableCell>
              <TableCell>
                <strong>User</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>{row.eventType}</TableCell>
                <TableCell>{row.sourceIP}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={getStatusColor(row.status)}
                    sx={{ fontWeight: "bold", borderRadius: "6px" }}
                  />
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

export default Events;
