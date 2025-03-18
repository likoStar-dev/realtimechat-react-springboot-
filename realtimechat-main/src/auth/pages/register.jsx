/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useStore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const registerWithCredentials = useUserStore(
    (state) => state.registerWithCredentials,
  );
  const [formData, setFormData] = useState({
    username: "",
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.log(formData);
      alert("Password does not match");
      return;
    } else if (formData.email && formData.username) {
      const user = await registerWithCredentials(formData);
      if (user) {
        navigate("/");
      } else {
        alert("Some error !");
      }
    } else {
      console.log(formData);
      alert("Please fill all the fields in the form");
    }
  };

  return (
    <div className="sm:flex">
      <div className="relative lg:w-[580px] md:w-96 w-full p-10 min-h-screen bg-white shadow-xl flex items-center pt-10 dark:bg-slate-900 z-10">
        <div
          className="w-full lg:max-w-sm mx-auto space-y-10"
          uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
        >
          <a href="#">
            {" "}
            <img
              src="assets/images/logo.png"
              className="w-28 absolute top-10 left-10 dark:hidden"
              alt=""
            />
          </a>
          <a href="#">
            {" "}
            <img
              src="assets/images/logo-light.png"
              className="w-28 absolute top-10 left-10 hidden dark:!block"
              alt=""
            />
          </a>

          <div className="hidden">
            <img
              className="w-12"
              src="assets/images/logo-icon.png"
              alt="Socialite html template"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-1.5">
              {" "}
              Sign up to get started{" "}
            </h2>
            <p className="text-sm text-gray-700 font-normal">
              If you already have an account,
              <Link to="/sign-in" className="text-blue-700">
                {" "}
                Login here!
              </Link>
            </p>
          </div>

          <form
            className="space-y-7 text-sm text-black font-medium dark:text-white"
            uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
            onSubmit={onSubmit}
          >
            <div className="grid grid-cols-2 gap-4 gap-y-7">
              <div>
                <label htmlFor="firstName" className="">
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={handleInputChange}
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    required
                    className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="">
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={handleInputChange}
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    required
                    className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label htmlFor="username" className="">
                  Username
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={handleInputChange}
                    id="username"
                    name="username"
                    type="text"
                    autoFocus
                    placeholder="First name"
                    required
                    className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label htmlFor="email" className="">
                  Email address
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={handleInputChange}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="">
                  Password
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={handleInputChange}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="***"
                    className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="">
                  Confirm Password
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={handleInputChange}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="***"
                    className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="inline-flex items-center" id="rememberme">
                  <input
                    type="checkbox"
                    id="accept-terms"
                    className="!rounded-md accent-red-800"
                  />
                  <span className="ml-2">
                    you agree to our{" "}
                    <a href="#" className="text-blue-700 hover:underline">
                      terms of use{" "}
                    </a>{" "}
                  </span>
                </label>
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="button bg-primary text-white w-full"
                >
                  Get Started
                </button>
              </div>
            </div>

            <div className="text-center flex items-center gap-6">
              <hr className="flex-1 border-slate-200 dark:border-slate-800" />
              Or continue with
              <hr className="flex-1 border-slate-200 dark:border-slate-800" />
            </div>

            <div
              className="flex gap-2"
              uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 400 ;repeat: true"
            >
              <a
                href="#"
                className="button flex-1 flex items-center gap-2 bg-primary text-white text-sm"
              >
                {" "}
                <ion-icon
                  name="logo-facebook"
                  className="text-lg"
                ></ion-icon>{" "}
                facebook{" "}
              </a>
              <a
                href="#"
                className="button flex-1 flex items-center gap-2 bg-sky-600 text-white text-sm"
              >
                {" "}
                <ion-icon name="logo-twitter"></ion-icon> twitter{" "}
              </a>
              <a
                href="#"
                className="button flex-1 flex items-center gap-2 bg-black text-white text-sm"
              >
                {" "}
                <ion-icon name="logo-github"></ion-icon> github{" "}
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="flex-1 relative bg-primary max-md:hidden">
        <div
          className="relative w-full h-full"
          tabIndex={-1}
          uk-slideshow="animation: slide; autoplay: true"
        >
          <ul className="uk-slideshow-items w-full h-full">
            <li className="w-full">
              <img
                src="/images/post/img-3.jpg"
                alt=""
                className="w-full h-full object-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left"
              />
              <div className="absolute bottom-0 w-full uk-tr ansition-slide-bottom-small z-10">
                <div
                  className="max-w-xl w-full mx-auto pb-32 px-5 z-30 relative"
                  uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
                >
                  <img
                    className="w-12"
                    src="/images/logo-icon.png"
                    alt="Socialite html template"
                  />
                  <h4
                    className="!text-white text-2xl font-semibold mt-7"
                    uk-slideshow-parallax="y: 600,0,0"
                  >
                    {" "}
                    Connect With Friends{" "}
                  </h4>
                  <p
                    className="!text-white text-lg mt-7 leading-8"
                    uk-slideshow-parallax="y: 800,0,0;"
                  >
                    {" "}
                    This phrase is more casual and playful. It suggests that you
                    are keeping your friends updated on what’s happening in your
                    life.
                  </p>
                </div>
              </div>
              <div className="w-full h-96 bg-gradient-to-t from-black absolute bottom-0 left-0"></div>
            </li>
            <li className="w-full">
              <img
                src="/images/post/img-2.jpg"
                alt=""
                className="w-full h-full object-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left"
              />
              <div className="absolute bottom-0 w-full uk-tr ansition-slide-bottom-small z-10">
                <div
                  className="max-w-xl w-full mx-auto pb-32 px-5 z-30 relative"
                  uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
                >
                  <img
                    className="w-12"
                    src="/images/logo-icon.png"
                    alt="Socialite html template"
                  />
                  <h4
                    className="!text-white text-2xl font-semibold mt-7"
                    uk-slideshow-parallax="y: 800,0,0"
                  >
                    {" "}
                    Connect With Friends{" "}
                  </h4>
                  <p
                    className="!text-white text-lg mt-7 leading-8"
                    uk-slideshow-parallax="y: 800,0,0;"
                  >
                    {" "}
                    This phrase is more casual and playful. It suggests that you
                    are keeping your friends updated on what’s happening in your
                    life.
                  </p>
                </div>
              </div>
              <div className="w-full h-96 bg-gradient-to-t from-black absolute bottom-0 left-0"></div>
            </li>
          </ul>

          <div className="flex justify-center">
            <ul className="inline-flex flex-wrap justify-center  absolute bottom-8 gap-1.5 uk-dotnav uk-slideshow-nav">
              {" "}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
