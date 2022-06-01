import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "./components/Table";
import { GlobalContext } from "./Contexts/GlobalContext";

function App() {
  const [products, setProducts] = useState([]);

  const { REACT_APP_API_URL } = process.env;
  const endpoint = REACT_APP_API_URL;

  const getData = async () => {
    await axios.get(endpoint).then((response) => {
      const data = response.data.data;
      setProducts(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <GlobalContext.Provider value={{ products, setProducts }}>
        <Table />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
