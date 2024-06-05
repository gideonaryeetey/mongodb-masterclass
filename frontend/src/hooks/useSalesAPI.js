import axios from "axios";
import { useState, useEffect } from "react";

const { VITE_API_URL: API_URL } = import.meta.env;

const useSalesAPI = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPurchaseMethod, setSelectedPurchaseMethod] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (purchaseMethod) => {
    setLoading(true);
    axios
      .get(
        `${API_URL}/sales${purchaseMethod ? `?purchaseMethod=${purchaseMethod}` : ""
        }`
      )
      .then((response) => {
        setSales(response?.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

  const deleteSalesOrder = (id) => {
    axios
      .delete(`${API_URL}/sales/${id}`)
      .then((response) => {
        alert("Sale deleted successfully");
        fetchData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFilter = (e, value) => {
    setSelectedPurchaseMethod(value);
    fetchData(value);
  };

  return { sales, loading, deleteSalesOrder, handleFilter, selectedPurchaseMethod }
};

export default useSalesAPI;