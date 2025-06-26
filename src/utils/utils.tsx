import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CloudIcon from "@mui/icons-material/Cloud";

export const getAssetTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "computer":
    case "server":
      return <ComputerIcon />;
    case "mobile":
      return <SmartphoneIcon />;
    case "cloud":
      return <CloudIcon />;
    default:
      return null;
  }
};

export  const getAssetImpactColor = (impact: string): string => {
  switch (impact) {
    case "Critical":
      return "red";
    case "High":
      return "orange";
    case "Low":
      return "green";
    default:
      return "gray";
  }
};

export  const getCriteriaColor = (criteria: string) => {
  if (criteria.startsWith("User")) return "primary";
  if (criteria.startsWith("App")) return "success";
  if (criteria.startsWith("Device")) return "warning";
  return "default";
};
