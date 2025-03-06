import { useState, useEffect } from "react";
import axios from "axios";
import colomboImage from '../assets/images/colombo.jpg';
import galleface from "../assets/images/galleface.jpg";
import museaum from "../assets/images/museaum.jpg";
import viharamahadevi from "../assets/images/viharamahadevi.jpg";
import gangaramaya from "../assets/images/gangaramaya.jpg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCloudSun, FaWind, FaThermometerHalf, FaTint } from "react-icons/fa";

import HotelsByLocation from './HotelsByLocation';
import RestaurantsByLocation from './RestaurentsByLocation';
import GuidesByLocation from './GuidesByLocation';
import ActivitiesByLocation from './ActivitiesByLocation';

function Colombo() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "d2397bf98ab1530ee42490fc5ef7049d";
  const city = "Colombo";

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
    <div className="colombo-page">
      <div className="relative">
        {/* Header Section */}
        <header
          className="relative bg-cover bg-center h-screen text-white flex items-center justify-center text-center overflow-hidden"
          style={{ backgroundImage: `url(${colomboImage})` }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black"
            style={{ zIndex: -1 }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          ></motion.div>

          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 2 }}
          ></motion.div>

          <div className="hero-content relative z-10 px-6">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              VIBRANT COLOMBO
            </motion.h1>

            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="text-lg md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto">
                Discover the bustling capital of Sri Lanka, where modern city life seamlessly blends with colonial charm. Explore its dynamic streets lined with colorful markets, luxurious shopping malls, and historic landmarks.
                Whether you are tasting local delicacies, visiting ancient temples, or enjoying the vibrant nightlife, Colombo promises an unforgettable experience.
              </p>
            </motion.div>
          </div>
        </header>
      </div>

      <section className="py-20 bg-gray-50">
        <h2 className="ml-4 text-8xl font-extrabold text-left mb-16 text-black"> COLOMBO .</h2>

        <div className="flex flex-wrap justify-center gap-12 lg:justify-between lg:flex-nowrap max-w-7xl mx-auto">
          {/* Map Section */}
          <div className="w-full lg:w-[48%] overflow-hidden ">
            <div className="p-6 mb-4 border rounded-lg bg-white shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-4xl text-gray-900 mb-4">WHERE IS <span className="font-bold">COLOMBO</span></h3>
              <p className="text-gray-700 leading-relaxed">
                Colombo is located on the west coast of Sri Lanka and is the countrys largest city. It is the center of commerce and culture, offering a rich combination of history, modernity, and tropical charm.
              </p>
            </div>
            <div className="rounded-xl border transform transition-transform hover:scale-105">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63367.83067430778!2d80.73974703635324!3d6.951449622712053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae380434e1554c7%3A0x291608404c937d9c!2sColombo!5e0!3m2!1sen!2slk!4v1734805576386!5m2!1sen!2slk"
                width="100%"
                height="400"
                style={{ border: '0', borderRadius: '0 0 10px 10px' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Weather Section */}
          <div className="w-full lg:w-[48%] bg-white shadow-lg rounded-xl border p-8">
            <h3 className="text-3xl text-center text-black mb-6">WEATHER NOW IN <span className="font-bold">COLOMBO</span></h3>

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
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-white">
        <h2 className="text-4xl text-center mb-12 text-gray-800">HIGHLIGHTS OF <span className="font-bold">COLOMBO</span></h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Highlight Card 1 */}
          <motion.div
            className="relative bg-white shadow-xl rounded-lg overflow-hidden w-80 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img src={galleface} alt="Galle Face" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-2xl font-bold mb-2">Galle Face Green</h3>
              <p className="text-gray-700 text-lg">
                A large urban park and beachfront where you can enjoy beautiful views, local street food, and vibrant city life.
              </p>
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
            <img src={museaum} alt="National Museum" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-2xl font-bold mb-2">National Museum of Colombo</h3>
              <p className="text-gray-700 text-lg">
                Discover Sri Lankas rich history, culture, and art at the largest museum in the country.
              </p>
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
            <img src={viharamahadevi} alt="Viharamahadevi Park" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-2xl font-bold mb-2">Viharamahadevi Park</h3>
              <p className="text-gray-700 text-lg">
                A beautiful park located near the heart of Colombo, perfect for relaxation and outdoor activities.
              </p>
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
            <img src={gangaramaya} alt="Viharamahadevi Park" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-2xl font-bold mb-2">Gangaramaya Temple</h3>
              <p className="text-gray-700 text-lg">
                One of Colombo most iconic landmarks, this temple is a stunning blend of architectural styles and a center for Buddhist learning and worship.
              </p>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Sections */}
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

      {/* Dynamic Content Sections */}
      {activeSection === "hotels" && <HotelsByLocation location="Colombo" />}
      {activeSection === "restaurants" && <RestaurantsByLocation location="Colombo" />}
      {activeSection === "guides" && <GuidesByLocation location="Colombo" />}
      {activeSection === "activities" && <ActivitiesByLocation location="Colombo" />}
    </div>
  );
}

export default Colombo;
