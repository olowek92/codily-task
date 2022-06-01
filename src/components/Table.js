import React from "react";

import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CustomInput from "./CustomInput";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

export const Table = () => {
  const [products, setProducts] = useState([]);

  const { REACT_APP_API_URL } = process.env;
  const endpoint = REACT_APP_API_URL;

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

  const getData = async () => {
    await axios.get(endpoint).then((response) => {
      const data = response.data.data;
      setProducts(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

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
