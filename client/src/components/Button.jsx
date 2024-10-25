import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ styles }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/registrasi"); // Navigate to the registration form page
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
    >
      Daftar Sekarang
    </button>
  );
};

export default Button;