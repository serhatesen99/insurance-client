import React, { useState, useEffect } from "react";

const Support = ({ onNext }) => {
  const [supportOption, setSupportOption] = useState("Müşteri Hizmetlerinden destek almak istiyorum."); 
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [healthInfoAccepted, setHealthInfoAccepted] = useState(false);
  const [error, setError] = useState("");
  const [fiyat, setFiyat] = useState(0);
  const [insuranceDetails, setInsuranceDetails] = useState({
    name: "Serhat Esen",
    travelDate: "03/08/24-09/09/25",
    region: "Avrupa",
    reason: "Eğitim",
  });

  useEffect(() => {
    // Fiyatı sessionStorage'dan alın
    const storedPrice = sessionStorage.getItem("fiyat");
    if (storedPrice) {
      setFiyat(parseFloat(storedPrice) || 0);
    }

    // Sigorta detaylarını sessionStorage'dan alın
    const storedDetails = JSON.parse(sessionStorage.getItem("insuranceDetails"));
    if (storedDetails) {
      setInsuranceDetails(storedDetails);
    }
  }, []);

  const handleSubmit = () => {
    let errorMessages = [];

    if (!termsAccepted) {
      errorMessages.push("Mesafeli Satış Sözleşmesi'ni onaylamanız gerekiyor.");
    }

    if (!healthInfoAccepted) {
      errorMessages.push("Seyahat Sağlık Bilgilendirme Formu'nu onaylamanız gerekiyor.");
    }

    if (errorMessages.length > 0) {
      setError(errorMessages.join(" "));
    } else {
      setError("");
      onNext();
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    textAlign: "center",
  };

  const sectionStyle = {
    margin: "10px 0",
  };

  const buttonStyle = {
    margin: "20px 0",
    padding: "10px 20px",
    backgroundColor: "#007AB3",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  };

  const priceStyle = {
    color: "#007AB3",
    margin: "10px 0",
    fontSize: "55px",
    fontWeight: "bold",
  };

  const infoSummaryStyle = {
    textAlign: "left",
    paddingTop: "10px",
    width: "100%",
    maxWidth: "none",
    margin: "0",
    padding: "0 10px",
  };

  const sectionSeparator = {
    borderBottom: "1px solid #ccc",
    paddingBottom: "30px",
    marginBottom: "10px",
    borderRadius: "4px",
  };

  const titleStyle = {
    color: "#007AB3", 
    borderBottom: "1px solid #ccc", 
    paddingBottom: "10px",
    marginBottom: "40px",
    marginTop: "30px",
  };

  const travelInfoStyle = {
    marginTop: "20px",
    marginBottom: "20px",
  };

  const supportOptionsContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  const sigortalininAdiStyle = {
    marginTop: "25px",
  };

  const optionStyle = {
    padding: "10px",
    margin: "0 10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    minWidth: "250px",
    textAlign: "left",
    flex: "1",
  };

  const selectedOptionStyle = {
    ...optionStyle,
    borderColor: "#007AB3",
    backgroundColor: "#f0f8ff",
  };

  const agencyInfoStyle = {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "80%",
    textAlign: "left",
    marginRight: "18%",
  };

  const checkboxStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    cursor: "pointer",
  };

  const checkboxLabelStyle = {
    marginLeft: "10px",
    color: "#333",
  };

  const linkStyle = {
    color: "#007AB3",
    textDecoration: "underline",
    cursor: "pointer",
  };

  const errorStyle = {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
    textAlign: "left",
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "#005f8a";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#007AB3";
  };

  return (
    <div style={containerStyle}>
      <h2 style={sectionStyle}>
        {insuranceDetails.name || "Sigortalının Bilgileri"}, size özel teklifimiz:
      </h2>
      <h1 style={priceStyle}>{fiyat}₺</h1> 
      <div style={sectionStyle}>
        <div style={checkboxStyle}>
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label
            htmlFor="terms"
            style={checkboxLabelStyle}
            onClick={() =>
              window.open(
                "https://www.allianz.com.tr/tr_TR/faydali-bilgiler-ve-linkler/izin-metinleri/kullanicisozlesmesi-ve-gizlilik-politikasi.html",
                "_blank"
              )
            }
          >
            <span style={linkStyle}>
              Mesafeli Satış Sözleşmesi'ni okudum, onaylıyorum.
            </span>
          </label>
        </div>
        {!termsAccepted && <div style={errorStyle}>Mesafeli Satış Sözleşmesi'ni onaylamanız gerekiyor.</div>}

        <div style={checkboxStyle}>
          <input
            type="checkbox"
            id="health-info"
            checked={healthInfoAccepted}
            onChange={(e) => setHealthInfoAccepted(e.target.checked)}
          />
          <label
            htmlFor="health-info"
            style={checkboxLabelStyle}
            onClick={() =>
              window.open(
                "https://www.allianz.com.tr/tr_TR/faydali-bilgiler-ve-linkler/izin-metinleri/kullanicisozlesmesi-ve-gizlilik-politikasi.html",
                "_blank"
              )
            }
          >
            <span style={linkStyle}>
              Seyahat Sağlık Bilgilendirme Formu'nu okudum, onaylıyorum.
            </span>
          </label>
        </div>
        {!healthInfoAccepted && <div style={errorStyle}>Seyahat Sağlık Bilgilendirme Formu'nu onaylamanız gerekiyor.</div>}
      </div>
      <button
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleSubmit}
      >
        ONLINE SATIN AL
      </button>
      <h3 style={{ 
        color: "#000", 
        borderBottom: "none", 
        marginTop: "40px" 
      }}>
        Satış sonrası desteğinizi nasıl almak istersiniz?
      </h3>
      <div style={supportOptionsContainerStyle}>
        <div
          style={
            supportOption === "Müşteri Hizmetlerinden destek almak istiyorum."
              ? selectedOptionStyle
              : optionStyle
          }
          onClick={() => setSupportOption("Müşteri Hizmetlerinden destek almak istiyorum.")}
        >
          <input
            type="radio"
            id="customer-service"
            name="support-option"
            value="Müşteri Hizmetlerinden destek almak istiyorum."
            checked={
              supportOption === "Müşteri Hizmetlerinden destek almak istiyorum."
            }
            onChange={() => setSupportOption("Müşteri Hizmetlerinden destek almak istiyorum.")}
          />
          <label htmlFor="customer-service">
            <strong>Müşteri Hizmetlerinden destek almak istiyorum.</strong>
            <p>Allianz Müşteri Hizmetleri’nden destek alabilirsiniz.</p>
          </label>
        </div>
        <div
          style={
            supportOption === "Acenteden destek almak istiyorum."
              ? selectedOptionStyle
              : optionStyle
          }
          onClick={() => setSupportOption("Acenteden destek almak istiyorum.")}
        >
          <input
            type="radio"
            id="agency"
            name="support-option"
            value="Acenteden destek almak istiyorum."
            checked={supportOption === "Acenteden destek almak istiyorum."}
            onChange={() => setSupportOption("Acenteden destek almak istiyorum.")}
          />
          <label htmlFor="agency">
            <strong>Acenteden destek almak istiyorum.</strong>
            <p>
              Seçeceğiniz acenteniz ile iletişime geçebilir veya Allianz Müşteri Hizmetleri’nden destek alabilirsiniz.
            </p>
          </label>
        </div>
      </div>
      {/* Acenta Bilgileri */}
      {supportOption === "Acenteden destek almak istiyorum." && (
        <div style={agencyInfoStyle}>
          <h3 style={{ color: "#007AB3" }}>Acente Bilgileriniz</h3>
          <p>
            <strong>MAKUL SİGORTA ARACILIK HİZMETLERİ LTD.ŞTİ.</strong>
          </p>
          <p>Derin Sokak SOK. NO:51B Akşemsettin / EYÜP / İSTANBUL</p>
          <p>5516006173</p>
        </div>
      )}
      {/* Bilgi Özetiniz */}
      <div style={infoSummaryStyle}>
        <h3 style={titleStyle}>Bilgi Özetiniz</h3>

        {/* Sigortalının Bilgileri */}
        <div style={sectionSeparator}>
          <h3>Sigortalının Bilgileri</h3>
          <h5 style={sigortalininAdiStyle}>{insuranceDetails.name}</h5>
        </div>

        {/* Seyahat Bilgileri */}
        <div style={travelInfoStyle}>
          <h3>Seyahat Bilgileri</h3>
          <h5>Seyahat Tarihi: {insuranceDetails.travelDate}</h5>
          <h5>Seyahat Yeri: {insuranceDetails.region}</h5>
          <h5>Seyahat Sebebi: {insuranceDetails.reason}</h5>
        </div>
      </div>
    </div>
  );
};

export default Support;



