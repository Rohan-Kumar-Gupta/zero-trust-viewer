export const deepSearch = (obj: any, searchTerm: string): boolean => {
  if (!searchTerm) return true;

  const search = searchTerm.toLowerCase();

  const searchValue = (value: any): boolean => {
    // Handle null/undefined
    if (value === null || value === undefined) {
      return false;
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return value.some((item) => searchValue(item));
    }

    // Handle objects
    if (typeof value === "object") {
      return Object.values(value).some((val) => searchValue(val));
    }

    // Handle primitive values (string, number, boolean)
    const stringValue = value.toString().toLowerCase();
    return stringValue.includes(search);
  };

  return searchValue(obj);
};

export const filterWithDeepSearch = <T>(data: T[], searchTerm: string): T[] => {
  if (!searchTerm.trim()) return data;

  return data.filter((item) => deepSearch(item, searchTerm));
};
