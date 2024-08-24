import React, { useState, useEffect } from "react";
import Barcode from "react-barcode";
import allianzLogo from "../assets/allianzLogo.png";

const PolicyDetails = () => {
  const [policyNumber, setPolicyNumber] = useState("");

  useEffect(() => {
    const generatePolicyNumber = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };

    setPolicyNumber(generatePolicyNumber());
  }, []);

  const policyData = {
    insuranceCompany: "Allianz Sigorta",
    insurancePhone: "0850 399 9999",
    insuredName: "Serhat",
    insuredSurname: "Esen",
    insuredEmail: "serhatesen39@gmail.com",
    insuredPhone: "5468583981",
    insuredID: "43********",
    insuredBirthDate: "03/08/2004",
    startDate: "11/07/2024",
    endDate: "18/07/2024",
    policyNumber: policyNumber,
    amountPaid: "1010",
    amountType: "Peşin Ödeme",
    travelLocation: "Avrupa",
    travelReason: "Eğitim",
    cardNumber: "0000000000000000",
    cardDate: "6 / 25",
    cvc: "333",
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={allianzLogo} alt="Allianz Sigorta" style={styles.logo} />
        <div style={styles.policyNumber}>
          <div style={styles.policyNumberText}>
            Poliçe Numarası: {policyData.policyNumber}
          </div>
          <div style={styles.barcode}>
            <Barcode value={policyData.policyNumber} />
          </div>
        </div>
      </div>
      <h2 style={styles.title}>Seyahat Sağlık Sigortası Poliçesi</h2>
      <div style={styles.section}>
        <h2 style={styles.sectionTitleLarge}>Poliçe Bilgileri</h2>
        <p><strong>Sigorta Şirketi:</strong> {policyData.insuranceCompany}</p>
        <p><strong>Telefon:</strong> {policyData.insurancePhone}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitleLarge}>Sigortalı Bilgileri</h2>
        <p><strong>İsim:</strong> {policyData.insuredName}</p>
        <p><strong>Soyisim:</strong> {policyData.insuredSurname}</p>
        <p><strong>E-posta:</strong> {policyData.insuredEmail}</p>
        <p><strong>Cep Telefonu:</strong> {policyData.insuredPhone}</p>
        <p><strong>TC Kimlik Numarası:</strong> {policyData.insuredID}</p>
        <p><strong>Doğum Tarihi:</strong> {policyData.insuredBirthDate}</p>
        <p><strong>Sigorta Başlangıç Tarihi:</strong> {policyData.startDate}</p>
        <p><strong>Sigorta Bitiş Tarihi:</strong> {policyData.endDate}</p>
        <p><strong>Seyahat Yeri:</strong> {policyData.travelLocation}</p>
        <p><strong>Seyahat Sebebi:</strong> {policyData.travelReason}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitleLarge}>Ödeme Bilgileri</h2>
        <p><strong>Kart Numarası:</strong> {policyData.cardNumber}</p>
        <p><strong>Son Kullanma Tarihi:</strong> {policyData.cardDate}</p>
        <p><strong>Güvenlik Kodu:</strong> {policyData.cvc}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitleLarge}>Ödenen Tutar Bilgileri</h2>
        <p><strong>Ödenen Tutar (TL):</strong> {policyData.amountPaid}</p>
        <p><strong>Ödeme Türü:</strong> {policyData.amountType}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fdfdfd",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  logo: {
    height: "40px",
    marginBottom: "120px",
  },
  policyNumber: {
    textAlign: "right",
  },
  policyNumberText: {
    fontWeight: "bold",
  },
  barcode: {
    marginTop: "10px",
    border: "1px solid #000",
    padding: "10px",
    display: "inline-block",
    textAlign: "center",
  },
  title: {
    textAlign: "left",
    marginBottom: "50px",
    marginTop: "-80px",
    fontSize: "23px",
    fontWeight: "bold",
    color: "#003781",
  },
  section: {
    marginBottom: "40px", 
  },
  sectionTitleLarge: {
    fontWeight: "bold",
    fontSize: "22px", 
    marginBottom: "20px",
  },
};

export default PolicyDetails;


