import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import tik from "../assets/tik.png";
import man from "../assets/man.png";
import tan from "../assets/tan.png";
import rapor from "../assets/rapor.png";
import ampul from "../assets/ampul.png";
import telefon from "../assets/telefon.png";

const WhyAllianz = () => {
  const benefits = [
    {
      iconSrc: tik,
      title: "Uzman ve güvenilir bir yol arkadaşı",
    },
    {
      iconSrc: man,
      title: "Geniş acente ve banka kanalı ile kolay erişilebilir",
    },
    {
      iconSrc: tan,
      title: "Hızlı ve yüksek standartlarda hizmet",
    },
    {
      iconSrc: rapor,
      title: "İhtiyacınıza yönelik veren geniş ürün skalası",
    },
    {
      iconSrc: ampul,
      title: "Yenilikçi anlayışıyla sektörde öncü bir lider",
    },
    {
      iconSrc: telefon,
      title: "Sürekli iyileştirilen dijital çözümler",
    },
  ];

  return (
    <div className="why-allianz">
      <h2>Neden Allianz?</h2>
      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-item">
            <img
              src={benefit.iconSrc}
              alt={benefit.title}
              className="benefit-icon"
            />
            <p>{benefit.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyAllianz;
