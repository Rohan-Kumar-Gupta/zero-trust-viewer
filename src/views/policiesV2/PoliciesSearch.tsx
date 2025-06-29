import { useEffect, useMemo } from "react";
import { TextField } from "@mui/material";
import CustomSearchTemplate from "../../components/CustomSearchTemplate";
import { usePoliciesSearchStore } from "../../store/Policies/policySearchStore";

const IdentifierField = () => {
  const { form, setIdentifier } = usePoliciesSearchStore();
  return (
    <TextField
      size="small"
      fullWidth
      label="ID"
      value={form.id}
      onChange={(event) => setIdentifier(event.target.value)}
    />
  );
};

const NameField = () => {
  const { form, setName } = usePoliciesSearchStore();
  return (
    <TextField
      size="small"
      fullWidth
      label="Name"
      value={form.name}
      onChange={(event) => setName(event.target.value)}
    />
  );
};

const CriteriaField = () => {
  const { form, setCriteria } = usePoliciesSearchStore();
  return (
    <TextField
      size="small"
      fullWidth
      label="Criteria"
      value={form.criteria}
      onChange={(event) => setCriteria(event.target.value)}
    />
  );
};

const PrecedenceField = () => {
  const { form, setPrecedence } = usePoliciesSearchStore();
  return (
    <TextField
      size="small"
      fullWidth
      label="Precedence"
      value={form.precedence}
      onChange={(event) => setPrecedence(event.target.value)}
    />
  );
};

const searchFieldGrid = {
  id: { element: <IdentifierField />, position: [0, 0] },
  name: { element: <NameField />, position: [0, 1] },
  criteria: { element: <CriteriaField />, position: [0, 2] },
  precedence: { element: <PrecedenceField />, position: [0, 3] },
};

const PolicySearch = () => {
  const store = usePoliciesSearchStore();
  const fields = useMemo(
    () =>
      Object.entries(searchFieldGrid).map(([key, configuration]) => ({
        key,
        row: configuration.position[0],
        column: configuration.position[1],
        element: configuration.element,
      })),
    []
  );

  const labelCreators = {
    id: (value: string) => `ID: ${value}`,
    name: (value: string) => `Name: ${value}`,
    criteria: (value: string) => `Criteria: ${value}`,
    precedence: (value: string) => `Precedence: ${value}`,
  };

  const searchChips = Object.entries(store.form)
    .filter(
      ([key, value]) => !["page", "pageSize"].includes(key) && value !== ""
    )
    .map(([key, value]) => ({
      key,
      label: (labelCreators as any)[key](value as string),
    }));

  const executeSearch = () => {
    store.rebuildQueryParametersFromState();
    store.searchPolicies();
  };

  useEffect(() => {
    executeSearch();
  }, []);

  const resetAllFields = () => {
    store.resetSearchFormFields();
    executeSearch();
  };

  const fieldResetMap: Record<string, (value: string) => void> = {
    id: store.setIdentifier,
    name: store.setName,
    criteria: store.setCriteria,
    precedence: store.setPrecedence,
  };

  const handleDeleteSearchChip = (key: string) => {
    fieldResetMap[key]("");
    executeSearch();
  };

  return (
    <CustomSearchTemplate
      title="Policy Search"
      fields={fields}
      searchChips={searchChips}
      onSearch={executeSearch}
      onReset={resetAllFields}
      onDeleteSearchChip={handleDeleteSearchChip}
      columnSpans={[2, 4, 3, 3]}
      toggleExpand={store.toggleSearch}
      uiState={store}
    />
  );
};

export default PolicySearch;
