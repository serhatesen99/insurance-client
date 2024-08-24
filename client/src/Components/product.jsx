import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import heart from "../assets/heart.png";
import people from "../assets/people.png";
import steteskop from "../assets/steteskop.png";
import car from "../assets/car.png";
import road from "../assets/road.png";
import house from "../assets/house.png";
import plane from "../assets/plane.png";

const Button = ({ label, iconSrc, onClick }) => {
  return (
    <button className="button d-flex align-items-center" onClick={onClick}>
      {iconSrc && (
        <img
          src={iconSrc}
          alt={label}
          className="me-2"
          style={{ width: "30px", height: "30px" }}
        />
      )}
      {label}
    </button>
  );
};

const OnlineProductsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="header">Allianz Sigorta / Emeklilik</h2>
      <h1 className="title">Online Ürünlerimiz</h1>
      <h2 className="title">Tıklayın, Hızlı Teklif Alın</h2>
      <div className="buttons-container">
        <Button label="TAMAMLAYICI SAĞLIK" iconSrc={heart} />
        <Button label="BİREYSEL EMEKLİK" iconSrc={people} />
        <Button label="DİJİTAL DOKTORUM" iconSrc={steteskop} />
        <Button label="KASKO SİGORTASI" iconSrc={car} />
        <Button label="TRAFİK SİGORTASI" iconSrc={road} />
        <Button label="DASK SİGORTASI" iconSrc={house} />
        <Button
          label="SEYAHAT SAĞLIK"
          iconSrc={plane}
          onClick={() => navigate("./teklifAl")}
        />
      </div>
      <div className="contact-container"></div>
    </div>
  );
};

export default OnlineProductsSection;
