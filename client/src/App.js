import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Components/header";
import OnlineProductsSection from "./Components/product";
import WhyAllianz from "./Components/why";
import Footer from "./Components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InsuranceForm from "./Components/main";
import TravelInfo from "./Components/travel";
import SigortaTeklifTablosu from "./Components/offer";
import Support from "./Components/support";
import PaymentForm from "./Components/payment";
import PolicyDetails from "./Components/finale";

import {
  Stepper,
  Step,
  StepLabel,
  Container,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import seyahatLogo from "./assets/seyahat.jpeg";

import { Provider } from "react-redux";
import store from "./Components/store";


const steps = [
  "Genel Bilgiler",
  "Seyahat Bilgileri",
  "Teklif",
  "Destek ve Özet",
  "Ödeme",
  "Sonuç",
];

const headingStyle = {
  color: "black",
};

const HeroSection = () => {
  return (
    <section className="hero">
      <h1 style={headingStyle}>
        {" "}
        Kasko Sigortanızı Online Yaptırın, 1000TL'ye Varan Migros Çeki Kazanın
      </h1>
      <button>Detaylı Bilgi</button>
    </section>
  );
};

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    tcNo: "",
  });

  const handleNext = (formData = {}) => {
    if (formData.firstName && formData.lastName && formData.tcNumber) {
      setPersonalInfo({
        name: `${formData.firstName} ${formData.lastName}`,
        tcNo: formData.tcNumber,
      });
    }
    setCompletedSteps((prev) => Math.max(prev, activeStep + 1));
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= completedSteps) {
      setActiveStep(stepIndex);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <InsuranceForm onNext={handleNext} />;
      case 1:
        return <TravelInfo personalInfo={personalInfo} onNext={handleNext} />;
      case 2:
        return <SigortaTeklifTablosu onNext={handleNext} />;
      case 3:
        return <Support onNext={handleNext} />;
      case 4:
        return <PaymentForm onNext={handleNext} />;
      case 5:
        return <PolicyDetails />;
      default:
        return <div>Adım Bulunamadı</div>;
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <HeroSection />
                <OnlineProductsSection />
                <WhyAllianz />
                <Footer />
              </>
            }
          />

          <Route
            path="/teklifAl"
            element={
              <>
                <Header />
                <Container maxWidth="md">
                  <Box
                    sx={{
                      position: "relative",
                      width: "100vw",
                      height: "300px",
                      overflow: "hidden",
                      margin: "0 -50vw",
                      left: "50%",
                    }}
                  >
                    <img
                      src={seyahatLogo}
                      alt="Seyahat Logo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#fff",
                        fontWeight: "bold",
                        textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
                      }}
                    >
                      Seyahat Sağlık Sigortası
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        position: "absolute",
                        top: "60%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#fff",
                        textShadow: "1px 1px 5px rgba(0, 0, 0, 0.7)",
                      }}
                    >
                      Keyifli bir seyahat için Allianz yanında
                    </Typography>
                  </Box>

                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{ marginTop: 4 }}
                  >
                    {steps.map((label, index) => (
                      <Step
                        key={label}
                        onClick={() => handleStepClick(index)}
                        sx={{ cursor: index <= completedSteps ? "pointer" : "default" }} 
                      >
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                    {renderStepContent(activeStep)}
                  </Paper>
                </Container>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;


