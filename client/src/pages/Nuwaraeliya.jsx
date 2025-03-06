import { useState, useEffect } from "react";
import axios from "axios";
import nuwaraImage from '../assets/images/nuwaraeliya.jpg';
import gregory from "../assets/images/gregory.jpg";
import horton from "../assets/images/horton.jpg";
import hakgala from "../assets/images/hakgala.jpg";
import loversleap from "../assets/images/loversleap.jpg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { FaCloudSun, FaWind, FaThermometerHalf, FaTint } from "react-icons/fa";

import HotelsByLocation from './HotelsByLocation';
import RestaurantsByLocation from './RestaurentsByLocation';
import GuidesByLocation from './GuidesByLocation';
import ActivitiesByLocation from './ActivitiesByLocation';



function NuwaraEliya() {


  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "d2397bf98ab1530ee42490fc5ef7049d";
  const city = "Nuwara Eliya";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.9,
  });

  const [activeSection, setActiveSection] = useState("hotels");

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { main, weather, wind } = weatherData;

  return (
    <div className="nuwaraeliya-page">

      <div className="relative">

        {/* Header Section */}
        <header
          className="relative bg-cover bg-center h-screen text-white flex items-center justify-center text-center overflow-hidden"
          style={{ backgroundImage: `url(${nuwaraImage})` }}
        >

          {/* Parallax Effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black"
            style={{ zIndex: -1 }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          ></motion.div>

          {/* Overlay */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 2 }}
          ></motion.div>

          {/* Hero Content */}
          <div className="hero-content relative z-10 px-6">
            {/* Title with Staggered Animation */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              SERENITY IN THE HILLS
            </motion.h1>

            {/* Description with Fade-In */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="text-lg md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto">
                Escape to the misty hills of Nuwara Eliya, where lush green
                landscapes, picturesque lakes, and botanical gardens await.
                Discover the tranquil beauty of Sri Lanka’s hill country, from the
                serene Gregory Lake to the mesmerizing Horton Plains. Perfect for
                those seeking peace amidst nature’s charm.
              </p>
            </motion.div>
          </div>

        </header>
      </div>


      <section className="py-20 bg-gray-50">
        <h2 className="ml-4 text-8xl font-extrabold text-left mb-16 text-black"> NUWARA ELIYA .</h2>

        <div className="flex flex-wrap justify-center gap-12 lg:justify-between lg:flex-nowrap max-w-7xl mx-auto">
          {/* Map Section */}
          <div className="w-full lg:w-[48%] overflow-hidden ">
            <div className="p-6 mb-4 border rounded-lg bg-white shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-4xl  text-gray-900 mb-4">WHERE IS <span className="font-bold">NUWARA ELIYA</span></h3>
              <p className="text-gray-700 leading-relaxed">
                Nuwara Eliya, also known as Little England, is a beautiful city nestled in the central hills of Sri Lanka. Known for its cool climate, lush greenery, and tea plantations, it offers a serene escape from the bustle of city life.
              </p>
            </div>
            <div className="rounded-xl border transform transition-transform hover:scale-105">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63367.83067430778!2d80.73974703635324!3d6.951449622712053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae380434e1554c7%3A0x291608404c937d9c!2sNuwara%20Eliya!5e0!3m2!1sen!2slk!4v1734805576386!5m2!1sen!2slk"
                width="100%"
                height="400"
                style={{ border: '0', borderRadius: '0 0 10px 10px' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>


          {/* Weather Section */}
          <div className="w-full lg:w-[48%] bg-white shadow-lg rounded-xl border  p-8">
            <h3 className="text-3xl  text-center text-black mb-6">WEATHER NOW IN <span className="font-bold">NUWARA ELIYA</span></h3>

            <div className="grid grid-cols-2 gap-6">
              {/* Temperature */}
              <div className="bg-white shadow-md rounded-lg border p-6 flex flex-col items-center transform transition-transform hover:scale-110">
                <FaThermometerHalf className="text-3xl text-black mb-2" />
                <p className="text-lg font-medium text-gray-600">Temperature</p>
                <p className="text-2xl font-bold text-black">{main.temp}°C</p>
              </div>
              {/* Humidity */}
              <div className="bg-white shadow-lg rounded-lg border p-6 flex flex-col items-center transform transition-transform hover:scale-110">
                <FaTint className="text-3xl text-black mb-2" />
                <p className="text-lg font-medium text-gray-600">Humidity</p>
                <p className="text-2xl font-bold text-black">{main.humidity}%</p>
              </div>
              {/* Wind Speed */}
              <div className="bg-white shadow-lg rounded-lg border p-6 flex flex-col items-center transform transition-transform hover:scale-110">
                <FaWind className="text-3xl text-black mb-2" />
                <p className="text-lg font-medium text-gray-600">Wind Speed</p>
                <p className="text-2xl font-bold text-black">{wind.speed} km/h</p>
              </div>
              {/* Weather Condition */}
              <div className="bg-white shadow-lg rounded-lg border p-6 flex flex-col items-center transform transition-transform hover:scale-110">
                <FaCloudSun className="text-3xl text-black mb-2" />
                <p className="text-lg font-medium text-gray-600">Condition</p>
                <p className="text-2xl font-bold text-black">{weather[0].description}</p>
              </div>
            </div>

            <div className="text-center mt-8 flex justify-center">
            </div>

          </div>
        </div>
      </section>


      {/* Highlights Section */}
      <section className="py-20 bg-white">
        <h2 className="text-4xl text-center mb-12 text-gray-800">HIGHLIGHTS OF <span className="font-bold">NUWARA ELIYA</span></h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Highlight Card 1 */}
          <motion.div
            className="relative bg-white shadow-xl rounded-lg overflow-hidden w-80 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img src={gregory} alt="Gregory Lake" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-center px-4 py-6">Gregory Lake: Enjoy boat rides and a stroll around this picturesque lake surrounded by mountains.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4 hover:text-blue-600">Gregory Lake</h3>
              <p className="text-center text-gray-600">Enjoy boat rides and a stroll around this picturesque lake surrounded by mountains.</p>
            </div>
          </motion.div>

          {/* Highlight Card 2 */}
          <motion.div
            className="relative bg-white shadow-xl rounded-lg overflow-hidden w-80 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img src={horton} alt="Horton Plains" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-center px-4 py-6">Horton Plains National Park: Explore the beautiful landscapes, including World’s End, and enjoy a scenic hike.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4 hover:text-blue-600">Horton Plains National Park</h3>
              <p className="text-center text-gray-600">Explore the beautiful landscapes, including World’s End, and enjoy a scenic hike.</p>
            </div>
          </motion.div>

          {/* Highlight Card 3 */}
          <motion.div
            className="relative bg-white shadow-xl rounded-lg overflow-hidden w-80 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img src={hakgala} alt="Botanical Garden" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-center px-4 py-6">Hakgala Botanical Garden: Relax in the peaceful atmosphere of this sprawling botanical garden with exotic plants and flowers.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4 hover:text-blue-600">Hakgala Botanical Garden</h3>
              <p className="text-center text-gray-600">Relax in the peaceful atmosphere of this sprawling botanical garden with exotic plants and flowers.</p>
            </div>
          </motion.div>

          {/* Highlight Card 4 */}
          <motion.div
            className="relative bg-white shadow-xl rounded-lg overflow-hidden w-80 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img src={loversleap} alt="Botanical Garden" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-center px-4 py-6">
                St. Clair Waterfall: Known as the Little Niagara of Sri Lanka this majestic waterfall cascades through lush green tea estates, offering a serene and picturesque escape.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4 hover:text-blue-600">
                St. Clair Waterfall
              </h3>
              <p className="text-center text-gray-600">
                Admire the stunning views of one of the widest waterfalls in Sri Lanka, surrounded by breathtaking tea plantations and natural beauty.
              </p>
            </div>

          </motion.div>

        </div>
      </section>


      <div>
        {/* Buttons to toggle between sections */}
        <div className="sticky top-0 z-10 bg-white p-2 flex items-center justify-center">
          <div className="flex justify-center mb-6">
            <button
              onClick={() => handleButtonClick("hotels")}
              className={`px-6 py-3 mr-4 rounded ${activeSection === "hotels" ? "bg-black text-white" : "bg-gray-200"}`}
            >
              Hotels
            </button>
            <button
              onClick={() => handleButtonClick("restaurants")}
              className={`px-6 py-3 mr-4 rounded ${activeSection === "restaurants" ? "bg-black text-white" : "bg-gray-200"}`}
            >
              Restaurants
            </button>
            <button
              onClick={() => handleButtonClick("guides")}
              className={`px-6 py-3 mr-4 rounded ${activeSection === "guides" ? "bg-black text-white" : "bg-gray-200"}`}
            >
              Guides
            </button>
            <button
              onClick={() => handleButtonClick("activities")}
              className={`px-6 py-3 rounded ${activeSection === "activities" ? "bg-black text-white" : "bg-gray-200"}`}
            >
              Activities
            </button>
          </div>
        </div>

        {/* Conditional rendering based on active section */}
        {activeSection === "hotels" && (
          <HotelsByLocation location="Nuwaraeliya" />
        )}
        {activeSection === "restaurants" && (
          <RestaurantsByLocation location="Nuwaraeliya" />
        )}
        {activeSection === "guides" && (
          <GuidesByLocation location="Nuwaraeliya" />
        )}
        {activeSection === "activities" && (
          <ActivitiesByLocation location="Nuwaraeliya" />
        )}
      </div>



    </div>
  );
}

export default NuwaraEliya;

