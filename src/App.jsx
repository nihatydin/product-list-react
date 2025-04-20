import {useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as faSolidStar} from "@fortawesome/free-solid-svg-icons";
import {faStarHalfStroke} from "@fortawesome/free-solid-svg-icons";
import {faStar as faRegularStar} from "@fortawesome/free-regular-svg-icons";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    fetch("https://product-list-api-5wsd.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        const initialColors = {};
        data.forEach((_, i) => (initialColors[i] = "yellow"));
        setSelectedColors(initialColors);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  console.log(products);

  const handleColorChange = (index, color) => {
    setSelectedColors((prev) => ({
      ...prev,
      [index]: color,
    }));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {slidesToShow: 3},
      },
      {
        breakpoint: 640,
        settings: {slidesToShow: 1},
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-10 py-8 font-montserratblack">
      {products ? (
        <h1 className="text-center text-3xl mb-8 font-montserratblack">
          Product List
        </h1>
      ) : (
        <h3 className="text-center text-3xl mb-8">No Product</h3>
      )}
      <Slider {...settings}>
        {products &&
          products.map((item, i) => {
            const stars = (item.popularityScore * 5).toFixed(1);

            const currentColor = selectedColors[i] || "yellow";

            return (
              <div key={i} className="p-4">
                <div className="bg-gray-100 rounded-lg p-4 flex flex-col">
                  <img
                    src={item.images[currentColor]}
                    alt={item.name}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <p className="text-md font-medium font-montserratblack text-gray-950 mb-0">
                    {item.name}
                  </p>
                  <p className="text-md text-gray-950 mb-3">
                    ${item.price} USD
                  </p>

                  <div className="flex space-x-2">
                    {["yellow", "rose", "white"].map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(i, color)}
                        className={`w-6 h-6 rounded-full border-2 ${
                          selectedColors[i] === color
                            ? "border-black"
                            : "border-transparent"
                        }`}
                        style={{
                          // outline: "1px solid black",
                          // outlineOffset: "1px",
                          backgroundColor:
                            color === "yellow"
                              ? "#e6ca97"
                              : color === "rose"
                              ? "#e1a4a9"
                              : "#d9d9d9",
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-sm capitalize mt-1">
                    {currentColor} Gold
                  </div>

                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, starIndex) => {
                      const full = starIndex + 1 <= Math.floor(stars);
                      const half = starIndex + 0.5 === parseFloat(stars);
                      return (
                        <span
                          key={starIndex}
                          className="text-yellow-500 text-lg"
                        >
                          {full ? (
                            <FontAwesomeIcon
                              color="#e6ca97"
                              icon={faSolidStar}
                            />
                          ) : half ? (
                            <FontAwesomeIcon
                              color="#e6ca97"
                              icon={faStarHalfStroke}
                            />
                          ) : (
                            <FontAwesomeIcon
                              color="#e6ca97"
                              icon={faRegularStar}
                            />
                          )}
                        </span>
                      );
                    })}
                    <span className="ml-2 text-sm text-gray-500">
                      ({stars})
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
}

export default App;
