// component displays the logo and theme implementation.

// Library imports
import React from "react";
import { useEffect, useState } from "react";

// Assets
import logo from "../../assets/logo1.png";

const Header = () => {
  const [theme, setTheme] = useState("light");
  const element = document.documentElement;

  const options = [
    {
      icon: "🌞",
      text: "light",
    },
    {
      icon: "🌙",
      text: "dark",
    },
  ];

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        break;

      case "light":
        element.classList.remove("dark");
        break;

      default:
        break;
    }
  }, [theme]);
  return (
    <div className="shadow-md  p-1 flex items-center justify-between ">
      <img
        className="w-60 mx-auto p-1 bg-light-fill rounded "
        src={logo}
        alt="cryptocurrency dashboard"
      />

      {/* Light/dark theme implementation */}
      <div className="mx-8 top-2 right-10 flex duration-100">
        {options.map((option) => (
          <button
            key={option.text}
            onClick={() => setTheme(option.text)}
            className={`text-l rounded-lg mx-1 bg-light-button dark:bg-dark-button hover:bg-light-button-hover dark:hover:bg-dark-button-hover ${
              theme === option.text &&
              "bg-light-list-selected dark:bg-dark-list-selected hover:bg-light-list-hover dark:hover:bg-dark-list-hover"
            }`}
          >
            {option.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
