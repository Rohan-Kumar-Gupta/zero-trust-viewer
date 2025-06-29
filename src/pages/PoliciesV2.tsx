/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";

import PolicySearch from "../views/policiesV2/PoliciesSearch";
import PoliciesTable from "../views/policiesV2/PoliciesTable";
import PolicyDetails from "../views/policiesV2/PoliciesDetails";

import { usePoliciesSearchStore } from "../store/Policies/policySearchStore";
import { usePoliciesAddStore } from "../store/Policies/policyAddStore";
import { usePoliciesUpdateStore } from "../store/Policies/policyUpdateStore";
import { usePoliciesDeleteStore } from "../store/Policies/policyDeleteStore";
import { usePoliciesDetailsStore } from "../store/Policies/policyDetailStore";
import { FAILED, SUCCEEDED } from "../store/storeState";
import { Policy } from "../api/PoliciesApi";

const PoliciesPage = () => {
  const searchStore = usePoliciesSearchStore();
  const addStore = usePoliciesAddStore();
  const updateStore = usePoliciesUpdateStore();
  const deleteStore = usePoliciesDeleteStore();
  const detailsStore = usePoliciesDetailsStore();

  const executeSearch = () => {
    searchStore.rebuildQueryParametersFromState();
    searchStore.searchPolicies();
  };

  /* ---------------- success / error toasts ---------------- */
  useEffect(() => {
    if (addStore.addStatus === SUCCEEDED) {
      toast.success("Policy added successfully!");
      addStore.resetAddStatus();
      detailsStore.closeDialog();
      searchStore.resetSearchFormFields();
      executeSearch();
    } else if (addStore.addStatus === FAILED) {
      toast.error(addStore.addError || "Add failed");
    }
  }, [addStore.addStatus]);

  useEffect(() => {
    if (updateStore.updateStatus === SUCCEEDED) {
      toast.success("Policy updated successfully!");
      updateStore.resetUpdateStatus();
      detailsStore.closeDialog();
      searchStore.resetSearchFormFields();
      executeSearch();
    } else if (updateStore.updateStatus === FAILED) {
      toast.error(updateStore.updateError || "Update failed");
    }
  }, [updateStore.updateStatus]);

  useEffect(() => {
    if (deleteStore.deleteStatus === SUCCEEDED) {
      toast.success("Policy deleted successfully!");
      deleteStore.resetDeleteStatus();
      searchStore.resetSearchFormFields();
      executeSearch();
    } else if (deleteStore.deleteStatus === FAILED) {
      toast.error(deleteStore.deleteError || "Delete failed");
    }
  }, [deleteStore.deleteStatus]);

  /* ---------------- add-new handler ---------------- */
  const handleAddButtonClick = () => {
    const newPolicy: Policy = {
      id: "",
      name: "",
      criteria: "",
      description: "",
      score: { current: 0, max: 0 },
      precedence: 0,
      templates: [],
      namedNet: "",
    };
    detailsStore.openDialog(true, newPolicy);
  };

  return (
    <Card sx={{ p: 2 }}>
      {/* top row: search + button (responsive) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "flex-start" },
          gap: 2,
          mb: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <PolicySearch />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: 200 },
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            endIcon={<AddIcon />}
            onClick={handleAddButtonClick}
          >
            Add New
          </Button>
        </Box>
      </Box>

      <PoliciesTable />
      <PolicyDetails />
    </Card>
  );
};

export default PoliciesPage;
