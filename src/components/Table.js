import React from "react";

import { useContext } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CustomInput from "./CustomInput";
import { GlobalContext } from "../Contexts/GlobalContext";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

export const Table = () => {
  const { products } = useContext(GlobalContext);

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              backgroundColor: "#FF0000",
            },
          },
        },
      },
    });

  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "NAME",
      options: {
        searchable: false,
      },
    },
    {
      name: "year",
      label: "YEAR",
      options: {
        searchable: false,
      },
    },
    {
      name: "color",
      label: "COLOR",
      options: {
        searchable: false,
        display: false,
      },
    },
  ];

  const options = {
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    rowsPerPageOptions: [5],
    rowsPerPage: 5,
    responsive: "standard",
    selectableRowsHideCheckboxes: true,
    setRowProps: (row) => {
      const rowColor = row[3];
      return {
        style: { background: rowColor },
      };
    },
    customSearchRender: (searchText, handleSearch, hideSearch, options) => {
      return (
        <CustomInput
          searchText={searchText}
          onSearch={handleSearch}
          onHide={hideSearch}
          options={options}
        />
      );
    },
  };

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Products:"}
          data={products}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
  );
};
