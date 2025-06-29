import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { usePoliciesDetailsStore } from "../../store/Policies/policyDetailStore";
import { usePoliciesAddStore } from "../../store/Policies/policyAddStore";
import { usePoliciesUpdateStore } from "../../store/Policies/policyUpdateStore";

const getPolicyFromState = (
  state: ReturnType<typeof usePoliciesDetailsStore.getState>
) => ({
  id: state.id,
  name: state.name,
  criteria: state.criteria,
  description: state.description,
  score: { current: 0, max: 0 },
  precedence: parseInt(state.precedence) || 0,
  templates: [],
  namedNet: "",
});

const PolicyDetails = () => {
  const detailsState = usePoliciesDetailsStore();
  const { addPolicy } = usePoliciesAddStore();
  const { updatePolicy } = usePoliciesUpdateStore();
  const [addRequested, setAddRequested] = useState(false);
  const [updateRequested, setUpdateRequested] = useState(false);

  useEffect(() => {
    if (addRequested) {
      if (
        !detailsState.nameError &&
        !detailsState.criteriaError &&
        !detailsState.descriptionError &&
        !detailsState.precedenceError
      ) {
        const policy = getPolicyFromState(detailsState);
        addPolicy(policy);
        detailsState.closeDialog();
      }
      setAddRequested(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addRequested]);

  useEffect(() => {
    if (updateRequested) {
      if (
        !detailsState.nameError &&
        !detailsState.criteriaError &&
        !detailsState.descriptionError &&
        !detailsState.precedenceError
      ) {
        const policy = getPolicyFromState(detailsState);
        updatePolicy(policy.id, policy);
        detailsState.closeDialog();
      }
      setUpdateRequested(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateRequested]);

  const handleAdd = (event: React.MouseEvent) => {
    event.preventDefault();
    setAddRequested(true);
    detailsState.validateForm();
  };

  const handleUpdate = (event: React.MouseEvent) => {
    event.preventDefault();
    setUpdateRequested(true);
    detailsState.validateForm();
  };

  const handleCancel = (_: unknown, reason?: string) => {
    if (reason === "backdropClick") return;
    detailsState.closeDialog();
    detailsState.resetDetailFormFields();
  };

  return (
    <Drawer
      anchor="right"
      open={detailsState.isOpened}
      onClose={handleCancel}
      PaperProps={{ sx: { width: ["100%", 400] } }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {detailsState.editMode && detailsState.id !== ""
            ? `Policy Details: ${detailsState.id}`
            : "Policy Details"}
        </Typography>
        <TextField
          fullWidth
          label="Name"
          value={detailsState.name}
          onChange={(event) => detailsState.setName(event.target.value)}
          sx={{ mb: 3 }}
          disabled={!detailsState.editMode}
          error={detailsState.nameError}
          helperText={detailsState.nameError ? "Required" : ""}
        />
        <TextField
          fullWidth
          label="Criteria"
          value={detailsState.criteria}
          onChange={(event) => detailsState.setCriteria(event.target.value)}
          sx={{ mb: 3 }}
          disabled={!detailsState.editMode}
          error={detailsState.criteriaError}
          helperText={detailsState.criteriaError ? "Required" : ""}
        />
        <TextField
          fullWidth
          label="Description"
          value={detailsState.description}
          onChange={(event) => detailsState.setDescription(event.target.value)}
          sx={{ mb: 3 }}
          disabled={!detailsState.editMode}
          error={detailsState.descriptionError}
          helperText={detailsState.descriptionError ? "Required" : ""}
        />
        <TextField
          fullWidth
          label="Precedence"
          type="number"
          value={detailsState.precedence}
          onChange={(event) => detailsState.setPrecedence(event.target.value)}
          sx={{ mb: 3 }}
          disabled={!detailsState.editMode}
          error={detailsState.precedenceError}
          helperText={detailsState.precedenceError ? "Must be >0" : ""}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          {detailsState.editMode ? (
            detailsState.id === "" ? (
              <Button variant="contained" onClick={handleAdd}>
                Add New
              </Button>
            ) : (
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            )
          ) : null}
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default PolicyDetails;
