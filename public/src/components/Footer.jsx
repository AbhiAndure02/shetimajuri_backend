import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">शेतीमजूरी.इन</h3>
            <p className="text-green-200">
              आधुनिक शेतीसाठी आधुनिक उपाय. शेतकऱ्यांसाठी शेतकऱ्यांद्वारे
              चालवलेली संकल्पना.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">द्रुत दुवे</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-green-200 hover:text-white transition"
                >
                  मुख्यपृष्ठ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-200 hover:text-white transition"
                >
                  आमच्याविषयी
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-200 hover:text-white transition"
                >
                  सेवा
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-200 hover:text-white transition"
                >
                  उत्पादने
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-200 hover:text-white transition"
                >
                  संपर्क
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">संपर्क</h4>
            <address className="not-italic text-green-200">
              <p>१२३, शेती नगर</p>
              <p>कृषी रोड, पुणे</p>
              <p>महाराष्ट्र, भारत</p>
              <p className="mt-2">📞 +९१ ९८७६५४३२१०</p>
              <p>✉️ info@shetimajuri.in</p>
            </address>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">बातम्या</h4>
            <p className="text-green-200 mb-4">
              ताज्या शेती बातम्यांसाठी आमच्या न्यूझलेटरसाठी सदस्यता घ्या
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="तुमचा ईमेल"
                className="bg-green-800 text-white px-4 py-2 rounded-l-lg focus:outline-none w-full"
              />
              <button className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-500 transition">
                →
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-300">
          <p>© {new Date().getFullYear()} शेतीमजूरी.इन. सर्व हक्क राखीव.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
