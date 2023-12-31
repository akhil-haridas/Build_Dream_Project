import React, { useState, useEffect } from "react";
import Axios from "axios";
import WorksPage from "components/professional/Works/Works";
import Navbar from "components/professional/Navbar/Navbar";
import { PROFESSIONALAPI } from "utils/api";
import Sidebar from "components/professional/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
const Works = () => {
  const [data, setData] = useState([]);
const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${PROFESSIONALAPI}getdetails`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.data.works);
      })
      .catch((error) => {
         navigate("/server-error");
        console.log(error);
      });
  }, []);

  const updateData = (deletedItemId) => {
    setData((prevData) => {
      // Filter out the deleted item from the data array
      const updatedData = prevData.filter((item) => item._id !== deletedItemId);
      // Return the updated data
      return updatedData;
    });
  };

  return (
    <>
      <Sidebar active={"Works"} />
      <section id="content">
        <Navbar />
        <WorksPage data={data} updateData={updateData} />
      </section>
    </>
  );
};

export default Works;
