import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CloudIcon from "@mui/icons-material/Cloud";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import StorageIcon from "@mui/icons-material/Storage";

export const getAssetTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "computer":
    case "laptop":
      return <ComputerIcon />;
    case "mobile":
      return <SmartphoneIcon />;
    case "cloud":
      return <CloudIcon />;
    case "tablet":
      return <TabletMacIcon />;
    case "server":
      return <StorageIcon />;
    default:
      return <WebAssetIcon />;
  }
};

export const getAssetImpactColor = (impact: string): string => {
  switch (impact) {
    case "Critical":
      return "red";
    case "High":
      return "orange";
    case "Medium":
      return "gold";
    case "Low":
      return "green";
    default:
      return "gray";
  }
};

export const getCriteriaColor = (criteria: string) => {
  if (criteria.startsWith("User")) return "primary";
  if (criteria.startsWith("App")) return "success";
  if (criteria.startsWith("Device")) return "warning";
  if (criteria.startsWith("Role")) return "secondary";
  if (criteria.startsWith("Location")) return "info";
  return "default";
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "resolved":
    case "success":
      return "success";

    case "investigating":
    case "in progress":
    case "warning":
      return "warning";

    case "failed":
    case "error":
    case "critical":
      return "error";

    case "pending":
    case "queued":
      return "info";

    default:
      return "default";
  }
};
