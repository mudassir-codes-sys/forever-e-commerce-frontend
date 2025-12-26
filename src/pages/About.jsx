import React from "react";
import Title from "../components/Title";
import about from "../assets/frontend_assets/about_img.png";
import NewsLetterBox from "../components/NewsLetterBox";
function About() {
  return (
    <div>
      <div className="text-2xl text-center  pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={about} className="w-full md:max-w-[450px]" alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            dolor nulla alias officiis ipsa.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic
            doloribus voluptate reiciendis animi nulla.
          </p>
          <b className="text=gray-800"> Our Mission </b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            repellendus id tempore officiis facere?
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col  md:flex-row text-sm mb-20">
        <div className="border px-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus ipsa
            blanditiis cum nam.
          </p>
        </div>
        <div className="border px-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus ipsa
            blanditiis cum nam.
          </p>
        </div>
        <div className="border px-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus ipsa
            blanditiis cum nam.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}

export default About;
