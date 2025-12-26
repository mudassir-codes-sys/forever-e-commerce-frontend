import React from "react";
import Title from "../components/Title";
import contact from "../assets/frontend_assets/contact_img.png";
function Contact() {
  return (
    <div>
      <div className="text-center  text-2xl pt-10 border-t">
        <Title text1={"Contact"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center  md:flex-row gap-10 mb-28">
        <img src={contact} className="w-full md:max-w-[480px]" alt="" />
        <div className="flex flex-col justify-center items-start  gap-6">
          <p className=" font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            55470 Willms Station <br /> Suite 352, Washington, USA{" "}
          </p>
          <p className="text-gray-500">
            Tel (415) 565-0132 <br /> Email : dummy@gmail.com{" "}
          </p>
          <p className=" font-semibold text-xl text-gray-600">
            Careeres at Foreve
          </p>
          <p>Learn more</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
