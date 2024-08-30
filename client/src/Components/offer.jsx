import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const OfferComponent = ({ onNext }) => {
  const calculatedPrices = useSelector(
    (state) => state.prices.calculatedPrices
  );
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState("Geniş Kapsamlı");
  const [selectedAdditionalCoverage, setSelectedAdditionalCoverage] = useState(
    []
  );
  const [expanded, setExpanded] = useState(true); // Accordion state for expansion

  useEffect(() => {
    axios
      .get("https://localhost:7226/api/Teminat/Home")
      .then((response) => {
        console.log("Veriler başarıyla alındı:", response.data);
        setOffers(response.data);
      })
      .catch((error) => {
        console.error("Teminatlar alınırken bir hata oluştu:", error);
      });
  }, []);

  const additionalCoverageOptions = [
    {
      name: "Pandemi Teminatı İstiyorum",
      description:
        "Poliçe süresinde ve şartlarında belirlenmiş teminatlar kapsamında Covid-19 tedavi masraflarını teminat altına alır.",
    },
    {
      name: "Kapkaç Teminatı İstiyorum",
      description:
        "Seyahatiniz süresince karşılaşabileceğiniz olası bir kapkaç durumuna karşı sizi güvence altına alır.",
    },
    {
      name: "Sportif Aktivite",
      description:
        "Amatör olarak yapılan sportif aktivite esnasında oluşabilecek tedavi masraflarınız teminat altına alınır.",
    },
  ];

  const isSelectedAdditionalCoverage = (optionName) => {
    return selectedAdditionalCoverage.includes(optionName);
  };

  const OfferCard = ({ offer, isSelected, onSelect }) => (
    <Grid item xs={12} sm={4}>
      <Card
        variant="outlined"
        sx={{
          border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
          borderRadius: "10px",
          marginBottom: 2,
          backgroundColor: isSelected ? "#C1EBFB" : "inherit",
          position: "relative",
        }}
      >
        {offer.name === "Geniş Kapsamlı" && (
          <Box
            sx={{
              position: "absolute",
              top: "-9px",
              right: "-8px",
              bgcolor: "blue",
              color: "white",
              textAlign: "center",
              padding: "4px 8px",
              fontWeight: "bold",
              zIndex: 10,
              borderRadius: "4px",
            }}
          >
            Önerilen Paket
          </Box>
        )}
        <CardContent sx={{ position: "relative", zIndex: 0 }}>
          <Typography variant="h6" align="center">
            {offer.name}
          </Typography>
          <Typography
            variant="h4"
            align="center"
            sx={{ color: isSelected ? "#1f19d2" : "#000" }}
          >
            {offer.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant={isSelected ? "contained" : "outlined"}
            color="primary"
            onClick={() => onSelect(offer.name)}
          >
            {isSelected ? "SEÇİLDİ" : "Seç"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  const OfferTable = ({ selectedOffer }) => {
    return (
      <Accordion
        sx={{
          width: "100%",
          mt: 2,
          boxShadow: "none",
          border: "none",
          "&::before": {
            display: "none",
          },
        }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ backgroundColor: "transparent", padding: 0 }}
        >
          <Typography variant="h6">Güvenceler & Teminatlar</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <TableContainer component={Paper} sx={{ border: "none" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Teminat Türü</TableCell>
                  <TableCell align="center">Standart</TableCell>
                  <TableCell align="center">Kapsamlı</TableCell>
                  <TableCell align="center">Geniş Kapsamlı</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {offers.map((offer) => {
                  const isSelected = selectedOffer === offer.name;
                  const rowStyle = {
                    backgroundColor: isSelected ? "#C1EBFB" : "inherit",
                  };
                  const cellStyle = (type) => ({
                    backgroundColor:
                      selectedOffer === type ? "#C1EBFB" : "inherit",
                    fontWeight: selectedOffer === type ? "bold" : "normal",
                    color: selectedOffer === type ? "#000" : "#555",
                  });
  
                  return (
                    <TableRow key={offer.id} sx={rowStyle}>
                      <TableCell sx={{ fontWeight: "bold" }}>{offer.isim}</TableCell>
                      <TableCell
                        align="center"
                        sx={cellStyle("Standart")}
                      >
                        {offer.standart}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={cellStyle("Kapsamlı")}
                      >
                        {offer.kapsamli}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={cellStyle("Geniş Kapsamlı")}
                      >
                        {offer.genişKapsamli}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    );
  };
  
  

  const AdditionalCoverage = ({
    selectedAdditionalCoverage,
    onSelectAdditionalCoverage,
  }) => (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: "bold", color: "black" }}
      >
        Ek Teminatlar
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {additionalCoverageOptions.map((option) => (
          <Grid item xs={12} sm={4} key={option.name}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: 2,
                height: "100%",
                backgroundColor: isSelectedAdditionalCoverage(option.name)
                  ? "#C1EBFB"
                  : "inherit",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                checked={selectedAdditionalCoverage.includes(option.name)}
                onChange={() => {
                  const newSelections = selectedAdditionalCoverage.includes(
                    option.name
                  )
                    ? selectedAdditionalCoverage.filter(
                        (name) => name !== option.name
                      )
                    : [...selectedAdditionalCoverage, option.name];
                  onSelectAdditionalCoverage(newSelections);
                }}
              />
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  {option.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {option.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const calculateTotalPrice = () => {
    const basePrice =
      calculatedPrices.find((price) => price.name === selectedOffer)?.price ||
      "0,00 EUR";
    const additionalCoveragePrice = selectedAdditionalCoverage.length * 150;
    return (
      (parseFloat(basePrice.replace(/[^0-9,.]/g, "")) || 0) +
      additionalCoveragePrice
    );
  };

  const fiyat = calculateTotalPrice();
  sessionStorage.setItem("fiyat", fiyat);
  console.log(
    "Fiyat Session Storage'a kaydedildi:",
    sessionStorage.getItem("fiyat")
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
          {calculatedPrices.map((offer) => (
            <OfferCard
              key={offer.name}
              offer={offer}
              isSelected={selectedOffer === offer.name}
              onSelect={setSelectedOffer}
            />
          ))}
        </Grid>
        <OfferTable selectedOffer={selectedOffer} />
        <AdditionalCoverage
          selectedAdditionalCoverage={selectedAdditionalCoverage}
          onSelectAdditionalCoverage={setSelectedAdditionalCoverage}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
            padding: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Toplam Fiyat: {fiyat} ₺
          </Typography>
          <Button variant="contained" color="primary" onClick={onNext}>
            Devam Et
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OfferComponent;
