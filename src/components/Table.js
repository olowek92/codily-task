import React from "react";

import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

export const Table = () => {
  const [products, setProducts] = useState([]);

  const endpoint = "https://reqres.in/api/products";

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
    searchProps: {
      onFocus: (e) => {
        e.target.type = "number";
      },
    },
    setRowProps: (row) => {
      const test = row[3];
      return {
        style: { background: test },
      };
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
