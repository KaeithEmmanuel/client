import React, { useState, useEffect } from "react";
import NavBar from "../components/Nav";
import Footer from "../components/Footer";
import Card from "../components/Card";
//import Carousel from "../components/Carousel";

function Home() {
  // Define state variables for food categories and food items
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  // Function to load data from the server
  const loadData = async () => {
    // Fetch food items data
    let resp1 = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    resp1 = await resp1.json();
    setFoodItem(resp1);

    // Fetch food categories data
    let resp2 = await fetch("http://localhost:5000/api/foodcategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    resp2 = await resp2.json();
    setFoodCat(resp2);
  };

  // Load data when component mounts
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?barbeque"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {/* Map through food categories */}
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3" key={data._id}>
                  {/* Display category name */}
                  <div className="fs-3 m-3" key={data._id}>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {/* Filter and map through food items belonging to current category */}
                  {foodItem !== []
                    ? foodItem
                        .filter(
                          (item) => (item.CategoryName === data.CategoryName) &&
                            item.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((filteritems) => {
                          return (
                            <div
                              className="col-12 col-md-6 col-lg-3 m-3 "
                              key={filteritems._id}
                            >
                              {/* Render Card component for each food item */}
                              <Card
                                foodItem={filteritems}
                                options={filteritems.options[0]}
                                
                              ></Card>
                            </div>
                          );
                        })
                    : ""}
                </div>
              );
            })
          : ""}
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
