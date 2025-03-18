/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginWithCredentials = useUserStore(
    (state) => state.loginWithCredentials
  );
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.usernameOrEmail) {
      const user = await loginWithCredentials({
        username: formData.usernameOrEmail,
        password: formData.password,
      });
      if (user) {
        navigate("/");
      } else {
        alert("Wrong credentials");
      }
    } else {
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
            <img
              src="/images/logo.png"
              className="w-28 absolute top-10 left-10 dark:hidden"
              alt=""
            />
          </a>
          <a href="#">
            <img
              src="/images/logo-light.png"
              className="w-28 absolute top-10 left-10 hidden dark:!block"
              alt=""
            />
          </a>

          <div className="hidden">
            <img
              className="w-12"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600"
              alt="Socialite html template"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-1.5">
              {" "}
              Sign in to your account{" "}
            </h2>
            <p className="text-sm text-gray-700 font-normal">
              If you haven’t signed up yet.{" "}
              <Link to="/sign-up" className="text-blue-700">
                Register here!
              </Link>
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-7 text-sm text-black font-medium dark:text-white"
            uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
          >
            <div>
              <label htmlFor="usernameOrEmail" className="">
                Email address or Username
              </label>
              <div className="mt-2.5">
                <input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  autoFocus
                  placeholder="Email"
                  required
                  onChange={handleInputChange}
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="">
                Password
              </label>
              <div className="mt-2.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="***"
                  onChange={handleInputChange}
                  className="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <input id="rememberme" name="rememberme" type="checkbox" />
                <label htmlFor="rememberme" className="font-normal">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-blue-700">
                Forgot password{" "}
              </a>
            </div>

            <div>
              <button
                type="submit"
                className="button bg-primary text-white w-full"
              >
                Sign in
              </button>
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
                <ion-icon name="logo-facebook" className="text-lg"></ion-icon>
                facebook
              </a>
              <a
                href="#"
                className="button flex-1 flex items-center gap-2 bg-sky-600 text-white text-sm"
              >
                <ion-icon name="logo-twitter"></ion-icon> twitter
              </a>
              <a
                href="#"
                className="button flex-1 flex items-center gap-2 bg-black text-white text-sm"
              >
                <ion-icon name="logo-github"></ion-icon> github
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
