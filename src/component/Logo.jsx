import React from "react";

const Logo = ({ className = "h-24" }) => {
  // Pastikan file 'rdo_logo.jpg' (atau nama yang sesuai) ada di folder /public
  return (
    <img
      src="/rdo_logo.png"
      alt="Logo LabsSquad RDO"
      className={`object-contain mx-auto drop-shadow-2xl ${className}`}
    />
  );
};

export default Logo;
