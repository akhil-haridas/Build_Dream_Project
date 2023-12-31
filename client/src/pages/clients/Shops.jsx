import React, { useEffect, useState } from "react";
import Axios from "axios";
import { SHOPAPI, USERAPI } from "utils/api";

import Breadcrumb from "components/client/Breadcrumb/Breadcrumb";
import Footer from "components/client/Footer/Footer";
import SelectInput from "components/client/SelectInput/SelectInput";
import Navbar from "components/client/Navbar/Navbar";
import ShopProfile from "components/client/Shops/Shops";
import { useNavigate } from "react-router-dom";

const Shops = () => {
  const [locationFilter, setLocationFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [data, setData] = useState(null);
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [filter, setFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleLocationChange = (selectedOption) => {
    setLocationFilter(selectedOption);
  };

  const handleCategoryChange = (selectedOption) => {
    setCategoryFilter(selectedOption);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${SHOPAPI}getcategories`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
       
          setCategory(response.data.data);
     
      })
      .catch((error) => {
        navigate("/server-error");
      });
  }, []);
  const categoryOptions = category.map((item, index) => ({
    label: item,
    value: item,
  }));
  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${USERAPI}shops`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setData(response.data.DATA);
      })
      .catch((error) => {
        navigate("/server-error");
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${USERAPI}getlocationss`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setLocation(response.data.locationsAndDistricts);
      })
      .catch((error) => {
        navigate("/server-error");
      });
  }, []);

  const locations = location.map((location) => ({
    value: `${location.location}, ${location.district}`,
    label: `${location.location}, ${location.district}`,
  }));
  useEffect(() => {
    let filteredData = data;

    if (locationFilter) {
      filteredData = filteredData.filter(
        (professional) =>
          professional.location === locationFilter.value.split(", ")[0]
      );
    }

    if (categoryFilter) {
      filteredData = filteredData.filter(
        (professional) => professional.category === categoryFilter.value
      );

       const shopf = localStorage.getItem("shopf");
       if (shopf) {
         filteredData = filteredData.filter(
           (professional) => professional.category === shopf
         );
         localStorage.removeItem("shof");
       } 
    }

    if (searchQuery) {
      filteredData = filteredData.filter((professional) =>
        professional.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilter(filteredData);
  }, [data, locationFilter, categoryFilter, searchQuery]);

  return (
    <>
      <Navbar active={"SHOPS"} />
      <Breadcrumb path={["Shops"]} />
      <div className="bg-white_A700 flex flex-col font-rubik items-center justify-end mx-auto pt-[21px] sm:px-5 px-[21px] w-full">
        <div className="flex flex-col justify-end max-w-[1171px] mx-auto md:px-5 w-full">
          <div className="flex flex-col justify-start md:ml-[0] ml-[49px] mt-[38px] w-[96%] md:w-full">
            <input
              className="mb-[2rem] w-[50%] sm:w-[100%]"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
            />
            <div className="md:items-center md:justify-start w-full md:mb-4">
              <div className="w-full md:w-1/2 mb-[25px]">
                <SelectInput
                  options={locations}
                  onChange={handleLocationChange}
                  placeholder={"Select Location..."}
                />
              </div>
              <div className="w-full md:w-1/2 mb-[25px]">
                <SelectInput
                  options={categoryOptions}
                  onChange={handleCategoryChange}
                  placeholder={"Select Category"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section
        className="site-section section-team"
        style={{ background: "white" }}
        id="team"
      >
        <div className="sm:w-[95%] sm:ml-[10px]">
          <h2>FIND BEST SHOPS</h2>
          <p className="section-subtitle">
            <span>This is the team raedy to working with you</span>
          </p>
          <div className="team">
            <div className="row flex flex-wrap ml-[15px]">
              <ShopProfile data={filter} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Shops;
