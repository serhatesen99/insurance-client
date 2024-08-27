import React, { useState, useEffect } from "react";
import axios from "axios";
import Barcode from "react-barcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import allianzLogo from "../assets/allianzLogo.png";

const PolicyDetails = () => {
  const [policyData, setPolicyData] = useState(null);
  

  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        const customerId = sessionStorage.getItem("customerId");
        if (!customerId) {
          console.error("Müşteri ID'si bulunamadı.");
          return;
        }
        console.log(`Müşteri ID: ${customerId}`);
  
        const response = await axios.get(`https://localhost:7226/api/Musteri/Home/${customerId}`);
        console.log("API yanıtı:", response);
  
        const data = response.data;
  
        setPolicyData({
          insuranceCompany: "Allianz Sigorta",
          insurancePhone: "0850 399 9999",
          insuredName: data.isim,
          insuredSurname: data.soyisim,
          insuredEmail: data.eposta,
          insuredPhone: data.tel,
          insuredID: data.tc,
          insuredBirthDate: data.dogumTarih,
          startDate: data.startDate,
          endDate: data.endDate,
          policyNumber: generatePolicyNumber(),
          amountPaid: data.tutar,
          amountType: data.amountType,
          travelLocation: data.travelLocation,
          travelReason: data.travelReason,
          cardNumber: data.cardNumber,
        });
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
        console.error("Hata detayları:", error.response ? error.response.data : "Sunucuya erişilemiyor.");
      }
    };
  
    fetchPolicyData();
  }, []);
  

  const generatePolicyNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  if (!policyData) {
    return <div>Veri yükleniyor...</div>;
  }

  const downloadPDF = () => {
    const input = document.getElementById("policy-details");
    const downloadButton = document.getElementById("download-button");

    if (input && downloadButton) {
      downloadButton.style.display = "none";

      html2canvas(input, { scale: 3 })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");

          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          pdf.save(`policy_${policyData.policyNumber}.pdf`);

          downloadButton.style.display = "block";
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
          downloadButton.style.display = "block";
        });
    }
  };

  return (
    <div id="policy-details" style={styles.container}>
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
        <p><strong>Ödenen Tutar (TL):</strong> {policyData.amountPaid}</p>
        <p><strong>Ödeme Türü:</strong> {policyData.amountType}</p>
      </div>
      <button
        id="download-button"
        onClick={downloadPDF}
        style={styles.downloadButton}
      >
        PDF İndir
      </button>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
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
    marginBottom: "10px", 
  },
  logo: {
    height: "40px",
    marginBottom: "20px", 
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
    marginBottom: "20px", 
    marginTop: "-50px", 
    fontSize: "23px",
    fontWeight: "bold",
    color: "#003781",
  },
  section: {
    marginBottom: "30px", 
  },
  sectionTitleLarge: {
    fontWeight: "bold",
    fontSize: "22px",
    marginBottom: "10px", 
  },
  downloadButton: {
    display: "block",
    width: "100%",
    padding: "10px 0",
    backgroundColor: "#003781",
    color: "#fff",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PolicyDetails;





