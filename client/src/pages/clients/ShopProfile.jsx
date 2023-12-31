import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { USERAPI } from "utils/api";
import Axios from "axios";
import Navbar from "components/client/Navbar/Navbar";
import Breadcrumb from "components/client/Breadcrumb/Breadcrumb";
import Shop from "components/client/Shop/Shop";
import Products from "components/client/Products/Products";
import Footer from "components/client/Footer/Footer";
const ShopProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${USERAPI}shop?id=${id}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.DATA);
        console.log(response.data.DATA);
      })
      .catch((error) => {
        navigate("/server-error");
      });
  }, []);

  return (
    <>
      <Navbar active={"SHOPS"} />
      <Breadcrumb path={["Shops", data.name]} />
      <Shop data={data} />
      <Products data={data.products} />
      <Footer />
    </>
  );
};

export default ShopProfile;
