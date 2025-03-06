import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import img1 from "../assets/images/1.jpg";
import img2 from "../assets/images/2.jpg";
import img3 from "../assets/images/3.jpg";
import { FaPlay } from "react-icons/fa";

import nuwaraeliya_home from "../assets/images/nuwaraeliya_home.jpg";
import ella_home from "../assets/images/ella_home.jpg";
import unawatuna_home from "../assets/images/unawatuna_home.webp";
import anuradhapura_home from "../assets/images/anuradhapura_home.jpg";
import jaffna_home from "../assets/images/jaffna_home.jpg";
import trinco_home from "../assets/images/trinco_home.jpg";
import yala_home from "../assets/images/yala_home.jpg";
import colombo_home from "../assets/images/colombo_home.jpg";

import act from "../assets/images/act.jpg";
import map from "../assets/images/map.jpg";
import virtual from "../assets/images/virtual.jpg";

import sunset from "../assets/images/sunset.jpg";
import blog from "../assets/images/blog.jpg";
import top from "../assets/images/top.jpg";

import plan from "../assets/images/plan2.jpg";

import a from "../assets/images/10.webp";
import b from "../assets/images/20.jpg";
import c from "../assets/images/30.jpg";
import d from "../assets/images/40.jpg";
import e from "../assets/images/50.avif";
import f from "../assets/images/60.jpg";
import g from "../assets/images/70.png";
import h from "../assets/images/80.jpg";


const letters = ["G", "O", "C", "E", "Y", "L", "O", "N"];


const Home = () => {

  const navigate = useNavigate();

  const images1 = [a, b, c, d, e, f, g, h];


  const images = [img1, img2, img3];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);


    return () => clearInterval(interval);
  },);


  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Parallax Section 1 */}
      <section
        className="h-screen bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: `url('${images[currentImageIndex]}')`,
        }}
      >
        <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
          <h2 className="text-6xl font-extrabold text-white drop-shadow-2xl transform transition-all duration-500 hover:scale-105 hover:opacity-80 tracking-wider">
            DISCOVER AMAZING SRI LANKA
          </h2>

        </div>

        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg hover:bg-opacity-75 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-8 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg hover:bg-opacity-75 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </section>

      {/* Popular Destinations Section */}
      <main className="p-8 bg-gray-100">
        <section className="mb-16">
          <h2 className="text-5xl mb-6 text-center">THE SRI LANKAN <span className="font-bold">WANDERLUST</span> </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 " onClick={() => navigate("/nuwaraeliya")}>

              <img
                src={nuwaraeliya_home}
                alt="Destination 1"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">SERENITY IN THE HILLS</h3>
              <p className="text-gray-700">Escape to the misty hills of Nuwara Eliya</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img
                src={ella_home}
                alt="Destination 2"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">THE ELLA ESCAPADE</h3>
              <p className="text-gray-700">Embark on an unforgettable adventure in Ella</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img
                src={unawatuna_home}
                alt="Destination 3"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">COASTAL CHARM</h3>
              <p className="text-gray-700">From the colonial charm of Galle Fort to the idyllic shores of Unawatuna</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img
                src={anuradhapura_home}
                alt="Destination 4"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">LEGACY OF KINGS</h3>
              <p className="text-gray-700">Step back in time and explore the ancient wonders of Sri Lanka&apos;s cultural heartland</p>
            </div>


            {/* Card 6 */}
            <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img
                src={jaffna_home}
                alt="Destination 6"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">NORTHERN MYSTIQUE</h3>
              <p className="text-gray-700">Venture to the enchanting north of Sri Lanka, where rich Tamil culture and hidden gems await</p>
            </div>

            {/* Card 8 */}
            <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img
                src={yala_home}
                alt="Destination 6"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">WILD WONDERS</h3>
              <p className="text-gray-700">Embark on a safari adventure across Sri Lanka’s most famous national parks</p>
            </div>
            {/* Card 9 */}
            <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img
                src={trinco_home}
                alt="Destination 6"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">TRANQUIL SHORES & HERITAGE</h3>
              <p className="text-gray-700">Relax and rejuvenate on the peaceful shores of Trincomalee, where golden beaches meet ancient temples</p>
            </div>
            {/* Card 10 */}
            <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105" onClick={() => navigate("/colombo")}>
              <img
                src={colombo_home}
                alt="Destination 6"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">VIBRANT COLOMBO</h3>
              <p className="text-gray-700">Discover the bustling capital of Sri Lanka, where modern city life meets colonial charm</p>
            </div>

          </div>
        </section>
      </main>

      <section className="mb-16 mx-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl text-black sm:text-4xl lg:text-5xl pt-8">
            EXPLORE <span className="font-bold">OUR FEATURES</span>
          </h2>
          <p className="text-gray-800 mt-4 text-lg max-w-3xl mx-auto">
            Discover the various exciting features that make your travel experience seamless and enjoyable.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Interactive Map Card */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden group">
            <div
              className="h-48 bg-cover bg-center rounded-t-xl"
              style={{ backgroundImage: `url(${map})` }}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-center text-black mb-4 transition-transform group-hover:text-black hover:font-bold">
                Interactive Map
              </h3>
              <p className="text-black text-center text-base transition-transform group-hover:text-black">
                Explore the island with our interactive map to help you navigate through various attractions.
              </p>
            </div>
          </div>

          {/* Activities Card */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden group">
            <div
              className="h-48 bg-cover bg-center rounded-t-xl group-hover:opacity-90"
              style={{ backgroundImage: `url(${act})` }}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-center text-black mb-4 transition-transform group-hover:text-text-black hover:font-bold">
                Activities
              </h3>
              <p className="text-black text-center text-base transition-transform group-hover:text-black">
                Discover a wide range of activities to make your trip more exciting and fun.
              </p>
            </div>
          </div>

          {/* Virtual Tours Card */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden group">
            <div
              className="h-48 bg-cover bg-center rounded-t-xl group-hover:opacity-90"
              style={{ backgroundImage: `url(${virtual})` }}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-center text-black mb-4 transition-transform group-hover:text-text-black hover:font-bold">
                Virtual Tours
              </h3>
              <p className="text-black text-center text-base transition-transform group-hover:text-black">
                Experience Sri Lanka from the comfort of your home with our immersive virtual tours.
              </p>
            </div>
          </div>

        </div>
      </section>




      {/* Parallax Section 2 */}
      <section
        className="h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${plan})` }}>

        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-t from-black via-transparent to-black">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-6 md:mb-8">
            FIND YOUR DREAM DESTINATION
          </h2>

          {/* Start Here Button */}
          <button
            className={`px-6 py-3 text-lg font-semibold border-2 flex items-center space-x-2 justify-center transition-all duration-300 ease-in-out relative
    bg-white text-black border-black hover:bg-black hover:text-white hover:scale-105`}
            onClick={() => {
            }}
          >
            <span className="text-xl"><FaPlay /></span>
            <span>START HERE</span>
          </button>


        </div>
      </section>



      {/* Explore Section */}
      <section className="p-8 bg-gray-100">
        <section className="py-8 mx-auto">
          <div className="mx-auto flex justify-center object-center px-4 py-16">
            <div className="flex justify-center object-center flex-col gap-12">
              <h2 className="text-6xl tracking-tight text-gray-950">
                DISCOVER THE WANDERS, GO <span className="font-bold">CEYLON !</span>
              </h2>

              <div className="flex justify-center gap-6 mb-8">
                {letters.map((letter, index) => (
                  <div
                    key={index}
                    className="group h-80 w-44 [perspective:1000px] flex justify-center items-center"
                  >
                    <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      {/* Front Face - Letter */}
                      <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden] flex justify-center items-center bg-black">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{letter}</span>
                      </div>

                      {/* Back Face - Image */}
                      <div
                        className="absolute inset-0 h-full w-full rounded-xl bg-black/80 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]"
                        style={{
                          backgroundImage: `url(${images1[index]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hover to Discover Text and Icon */}
              <div className="text-center mt-6">
                <div className="animate-bounce text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 15l-7-7-7 7"
                    />
                  </svg>

                </div>
                <p className="text-xl text-gray-700 font-semibold mb-2">
                  Hover to Discover
                </p>

              </div>
            </div>
          </div>
        </section>
      </section>



      <section className="bg-gray-100 py-16">
        <div className="max-w-screen-xl mx-auto text-center px-4">
          <h2 className="text-5xl  text-black mb-8">JOIN OUR <span className="font-bold">TRAVEL COMMUNITY</span> </h2>
          <p className="text-lg text-gray-800 mb-8">Share your travel experiences, tips, and stories with fellow travelers around the world. Explore exciting adventures, ask questions, and connect with like-minded explorers.</p>

          {/* User-Generated Content Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card for Travel Story/Blog */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
              <img src={blog} alt="Travel Story" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">My Adventure in Sri Lanka</h3>
              <p className="text-gray-600 mb-4">Join me as I explore the beautiful landscapes and rich culture of Sri Lanka. A journey filled with amazing adventures and unforgettable experiences.</p>
              <a href="#" className="text-gray-800 hover:text-black">Read More</a>
            </div>

            {/* Card for User Photos */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
              <img src={sunset} alt="User Photo" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">A Sunset at the Beach</h3>
              <p className="text-gray-600 mb-4">Captured this breathtaking sunset while relaxing at a beautiful beach in Maldives. The colors were simply stunning!</p>
              <a href="#" className="text-gray-800 hover:text-black">See Full Gallery</a>
            </div>

            {/* Card for Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
              <img src={top} alt="Top Rated Destinations" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Rated Destinations</h3>
              <p className="text-gray-600 mb-4">Check out the best destinations recommended by fellow travelers. Read their reviews, tips, and experiences.</p>
              <a href="#" className="text-gray-800 hover:text-black">Explore Reviews</a>
            </div>
          </div>

          {/* Call-to-Action: Join the Community */}
          <div className="mt-12">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Become Part of the Community</h3>
            <p className="text-lg text-gray-600 mb-6">Have a story or photo to share? Want to ask fellow travelers for tips? Join now and be a part of our vibrant community!</p>
            <button className="bg-white border border-black text-black text-xl py-3 px-8  shadow-lg hover:bg-black hover:text-white transition duration-300">
              Join Now
            </button>
          </div>
        </div>
      </section>






      {/* Footer Section */}
      <footer className="bg-black text-white py-8 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="text-lg font-semibold mb-4 md:mb-0">
              <p>&copy; 2025 GO CEYLON. All rights reserved.</p>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-6">
              <a href="#" className="hover:text-gray-200 transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-gray-200 transition duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-gray-200 transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-gray-200 transition duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul>
                <li><a href="#" className="hover:text-gray-200">About Us</a></li>
                <li><a href="#" className="hover:text-gray-200">Careers</a></li>
                <li><a href="#" className="hover:text-gray-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Explore</h3>
              <ul>
                <li><a href="#" className="hover:text-gray-200">Destinations</a></li>
                <li><a href="#" className="hover:text-gray-200">Activities</a></li>
                <li><a href="#" className="hover:text-gray-200">Guides</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul>
                <li><a href="#" className="hover:text-gray-200">FAQ</a></li>
                <li><a href="#" className="hover:text-gray-200">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-200">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
