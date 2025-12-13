import logo from "../assets/frontend_assets/logo.png";

function Footer() {
  return (
    <footer className="bg-white text-gray-700 mt-20">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-10">
          {/* Column 1: Logo + About */}
          <div>
            <img className="mb-5 w-32" src={logo} alt="Logo" />
            <p className="w-full md:w-2/3 text-gray-600 text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              ea.
            </p>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600 text-sm sm:text-base">
              <li className="cursor-pointer hover:text-black transition-colors">Home</li>
              <li className="cursor-pointer hover:text-black transition-colors">About us</li>
              <li className="cursor-pointer hover:text-black transition-colors">Delivery</li>
              <li className="cursor-pointer hover:text-black transition-colors">Policy</li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <p className="text-xl font-medium mb-5">CONTACT</p>
            <ul className="flex flex-col gap-2 text-gray-600 text-sm sm:text-base">
              <li>+123-352-23-355</li>
              <li>dummy@email.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200">
        <p className="py-5 text-sm text-center text-gray-500">
          &copy; 2024 Forever.com - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
