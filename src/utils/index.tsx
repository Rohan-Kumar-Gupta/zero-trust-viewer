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



export const addParamToQuery = (queryParams: string, paramName: string, paramValue: string | number | null | undefined): string => {
  if (paramValue !== undefined && paramValue !== null && paramValue !== '') queryParams += `&${paramName}=${encodeURIComponent(String(paramValue))}`
  return queryParams
}

export const addSingleQueryParam = (paramName: string, paramValue: string | number | null | undefined): string | null => {
  if (paramName && paramValue !== undefined && paramValue !== null && paramValue !== '') return `${encodeURIComponent(paramName)}=${encodeURIComponent(String(paramValue))}`
  return null
}

export const buildQueryParams = (
  paramsArray: { paramName: string; paramValue: string | number | (string | number | null | undefined)[] | null | undefined }[]
): string => {
  const paramCouples = paramsArray
    .flatMap(({ paramName, paramValue }) => {
      if (Array.isArray(paramValue)) return paramValue.filter(v => v !== undefined && v !== null && v !== '').map(v => addSingleQueryParam(paramName, v))
      return addSingleQueryParam(paramName, paramValue)
    })
    .filter((x): x is string => Boolean(x))
  return paramCouples.length ? `?${paramCouples.join('&')}` : ''
}

export function getNewPage(oldPage: number, oldPageSize: number, newPageSize: number): number {
  const oldStartIndex = (oldPage - 1) * oldPageSize
  return Math.floor(oldStartIndex / newPageSize) + 1
}

export const assignColumnWidths = ({
  columns,
  tableWidth = 1300
}: {
  columns: { width?: number }[]
  tableWidth?: number
}) => {
  const totalDeclaredWidth = columns.reduce((sum, column) => sum + (column.width || 0), 0)
  if (totalDeclaredWidth === 0) return columns
  return columns.map(column => {
    const widthRatio = (column.width || 0) / totalDeclaredWidth
    const calculatedWidth = Math.floor(tableWidth * widthRatio)
    return { ...column, width: calculatedWidth }
  })
}
