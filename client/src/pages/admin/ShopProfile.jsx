import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminAPI } from "utils/api";
import ShopProfilePage from "components/admin/ShopProfile/ShopProfile";
import Navbar from "components/admin/Navbar/Navbar";
import Sidebar from "components/admin/Sidebar/Sidebar";
const ShopProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${AdminAPI}getshop?id=${id}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.DATA);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Sidebar active={"Shops"} />
      <section id="content">
        <Navbar />
        <ShopProfilePage data={data} />
      </section>
    </>
  );
};

export default ShopProfile;
