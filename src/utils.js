export function formatDate(timestamp) {
  if (!timestamp) {
    return ""
  }

  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
}

export function sortEmployees({ employees, sortColumn, sortOrder }) {
  return employees.sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    const sortOrderFactor = sortOrder === "asc" ? 1 : -1;

    if (sortColumn === "startDate" || sortColumn === "birthDay") {
      return sortOrderFactor * (new Date(aValue) - new Date(bValue));
    }

    if (aValue < bValue) {
      return sortOrderFactor * -1;
    } else if (aValue > bValue) {
      return sortOrderFactor * 1;
    } else {
      return 0;
    }
  });
}