import { useState } from 'react';
import { Link } from 'react-router-dom';
import farmerImg from '../assets/farmer.png'; // adjust path if needed

const HomePage = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-4">ShetMajuri वर स्वागत आहे</h2>
            <p className="text-lg mb-6">
              आधुनिक शेतीसाठी आधुनिक उपाय. आमच्यासोबत आपल्या शेतीच्या यशासाठी सर्वोत्तम साधने आणि मार्गदर्शन मिळवा.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition">
                आता सहभागी व्हा
              </button>
              <button className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                अधिक जाणून घ्या
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white/20 p-6 rounded-2xl shadow-2xl">
              <img
                src={farmerImg}
                alt="शेतकरी प्रतिमा"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* ... (your existing services code) ... */}

      {/* Footer */}
      {/* ... (your existing footer code) ... */}
    </div>
  );
};

export default HomePage;
