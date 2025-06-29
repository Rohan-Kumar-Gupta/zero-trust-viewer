import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { usePoliciesSearchStore } from "../../store/Policies/policySearchStore";
import { usePoliciesDetailsStore } from "../../store/Policies/policyDetailStore";
import { usePoliciesDeleteStore } from "../../store/Policies/policyDeleteStore";
import { Policy } from "../../api/PoliciesApi";

const PoliciesTable = () => {
  const searchStore = usePoliciesSearchStore();
  const detailsStore = usePoliciesDetailsStore();
  const deleteStore = usePoliciesDeleteStore();

  /* ---------- data ---------- */
  const rows = searchStore.result.rows as Policy[];
  const { page, pageSize } = searchStore.form;

  /* ---------- handlers ---------- */
  const handleView = (row: Policy) => detailsStore.openDialog(false, row);
  const handleEdit = (row: Policy) => detailsStore.openDialog(true, row);
  const handleDelete = (id: string | number) => {
    if (window.confirm("Are you sure?")) deleteStore.deletePolicy(id);
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    // TablePagination is zero-based; store is one-based
    searchStore.setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newSize = parseInt(event.target.value, 10);
    searchStore.setPageSize(newSize);
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 120 }}>ID</TableCell>
                <TableCell sx={{ width: 250 }}>Name</TableCell>
                <TableCell sx={{ width: 300 }}>Criteria</TableCell>
                <TableCell sx={{ width: 140 }}>Precedence</TableCell>
                <TableCell sx={{ width: 160 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.slice((page - 1) * pageSize, page * pageSize).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.criteria}</TableCell>
                  <TableCell>{row.precedence}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleView(row)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="info"
                      size="small"
                      onClick={() => handleEdit(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No policies found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={searchStore.result.totalRows}
          rowsPerPage={pageSize}
          page={page - 1} /* convert to zero-based */
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </Box>
  );
};

export default PoliciesTable;
