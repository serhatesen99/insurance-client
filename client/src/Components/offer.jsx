import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Button,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";

const OfferComponent = ({ onNext }) => {
  const calculatedPrices = useSelector(
    (state) => state.prices.calculatedPrices
  );

  if (calculatedPrices.length === 0) {
    return <Typography>Fiyatlar yüklenmedi.</Typography>;
  }

  const offers = [
    {
      name: "Standart",
      price:
        calculatedPrices.find((item) => item.name === "Standart")?.price ||
        "N/A",

      coverage: {
        cancellation: "1.000,00 EUR",
        missedFlight: "50,00 EUR",
        medicalExpenses: "35.000,00 EUR",
        etc: " 35.000,00 EUR",
        vizereddi: "100,00 EUR",
        bagajgecikmesi: "100,00 EUR",
        bagajkaybı: "500,00 EUR",
        kaza: "30.000,00 EUR",
        aktarma: "50,00 EUR",
        gıda: "100,00 EUR",
        syhtgecik: "300,00 EUR",
        over: "50,00 EUR",
        erken: "300,00 EUR",
        tedavi: "-",
        refakat: "-",
        hukuk: "-",
        kefalet: "-",
        yurtdışı: "-",
        acil: "-",
        ilaç: "-",
        bagaj: "-",
      },
    },
    {
      name: "Kapsamlı",
      price:
        calculatedPrices.find((item) => item.name === "Kapsamlı")?.price ||
        "N/A",
      selected: true,
      coverage: {
        cancellation: "1.000,00 EUR",
        missedFlight: "50,00 EUR",
        medicalExpenses: "35.000,00 EUR",
        etc: " 35.000,00 EUR",
        vizereddi: "100,00 EUR",
        bagajgecikmesi: "100,00 EUR",
        bagajkaybı: "500,00 EUR",
        kaza: "30.000,00 EUR",
        aktarma: "50,00 EUR",
        gıda: "100,00 EUR",
        syhtgecik: "300,00 EUR",
        over: "50,00 EUR",
        erken: "✓",
        tedavi: "420,00 EUR",
        refakat: "420,00 EUR",
        hukuk: "✓",
        kefalet: "1.000,00 EUR",
        yurtdışı: "1.000,00 EUR",
        acil: "✓",
        ilaç: "✓",
        bagaj: "✓",
      },
    },
    {
      name: "Geniş Kapsamlı",
      price:
        calculatedPrices.find((item) => item.name === "Geniş Kapsamlı")
          ?.price || "N/A",

      coverage: {
        cancellation: "1.000,00 EUR",
        missedFlight: "50,00 EUR",
        medicalExpenses: "50.000,00 EUR",
        etc: "50.000,00 EUR",
        vizereddi: "100,00 EUR",
        bagajgecikmesi: "100,00 EUR",
        bagajkaybı: "500,00 EUR",
        kaza: "50.000,00 EUR",
        aktarma: "50,00 EUR",
        gıda: "100,00 EUR",
        syhtgecik: "300,00 EUR",
        over: "50,00 EUR",
        erken: "✓",
        tedavi: "1400,00 EUR",
        refakat: "1400,00 EUR",
        hukuk: "✓",
        kefalet: "3.000,00 EUR",
        yurtdışı: "3.000,00 EUR",
        acil: "✓",
        ilaç: "✓",
        bagaj: "✓",
      },
    },
  ];

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

  const OfferTable = ({ selectedOffer }) => (
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
                <TableCell >Teminat Türü</TableCell>
                {offers.map((offer) => (
                  <TableCell key={offer.name} align="center">
                    {offer.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Seyahatin İptali</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.cancellation}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Bagaj Kaybı</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.missedFlight}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Kaza Ve Ani Rahatsızlık Sonucu Tedavi Masrafları
                </TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.kaza}
                  </TableCell>
                ))}
              </TableRow> 

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Aktarma Uçuşunun Kaçırılması</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.aktarma}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Gıda Zehirlenmesi</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.gıda}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Seyahatin Gecikmesi</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.syhtgecik}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Overbooking Nedeniyle Gecikme</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.over}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Erken Dönüş Masrafları</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.erken}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Tedavi Nedeniyle Konaklama </TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.tedavi}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Refakatçinin Konaklaması</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.refakat}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Bagajın Bulunması Ve Ulaştırılması</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.bagaj}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Bagaj Gecikmesi</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.bagajgecikmesi}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Vize Reddi</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.vizereddi}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Mücbir Sebeple Uçuşun Kaçırılması</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.missedFlight}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Hukuki Danışma</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.hukuk}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Acil Mesajların İletilmesi</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.acil}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>İlaç Gönderilmesi</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.ilaç}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Kefalet İçin Avans Ödeme </TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.kefalet}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Yurt Dışında Nakit Avans</TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.yurtdışı}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Sağlık Nakli Ve Cenaze Nakli
                </TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.medicalExpenses}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Taburcu Olduktan Sonra İkametgahına Geri Dönüş
                </TableCell>
                {offers.map((offer) => (
                  <TableCell
                    key={offer.name}
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor:
                        selectedOffer === offer.name ? "#C1EBFB" : "inherit",
                    }}
                  >
                    {offer.coverage.etc}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );

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
                backgroundColor: selectedAdditionalCoverage.includes(
                  option.name
                )
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

  const TeklifAlPage = () => {
    const [selectedOffer, setSelectedOffer] = useState("Geniş Kapsamlı");
    const [selectedAdditionalCoverage, setSelectedAdditionalCoverage] =
      useState([]);

    const handleSelectOffer = (offerName) => {
      setSelectedOffer(offerName);
    };

    const handleSelectAdditionalCoverage = (coverageNames) => {
      setSelectedAdditionalCoverage(coverageNames);
    };
    const calculateTotalPrice = () => {
      // Fiyat hesaplama kodunuz
      const basePrice =
        offers.find((offer) => offer.name === selectedOffer)?.price ||
        "0,00 EUR";
      const additionalCoveragePrice = selectedAdditionalCoverage.length * 150;
      return (
        (parseFloat(basePrice.replace(/[^0-9,.]/g, "")) || 0) +
        additionalCoveragePrice
      );
    };

    // Fiyatı sessionStorage'a kaydedin
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
            {offers.map((offer) => (
              <OfferCard
                key={offer.name}
                offer={offer}
                isSelected={selectedOffer === offer.name}
                onSelect={handleSelectOffer}
              />
            ))}
          </Grid>
          <OfferTable selectedOffer={selectedOffer} />
          <AdditionalCoverage
            selectedAdditionalCoverage={selectedAdditionalCoverage}
            onSelectAdditionalCoverage={handleSelectAdditionalCoverage}
          />

          <Typography variant="h6" sx={{ mt: 2 }}></Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 2,
              padding: 2,
              borderTop: "1px solid #ccc",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
            >
              Toplam Fiyat: {fiyat} TL
            </Typography>
            <Button variant="contained" color="primary" onClick={onNext}>
              Hemen Satın Al
            </Button>
          </Box>
        </Box>
      </Container>
    );
  };

  return <TeklifAlPage />;
};

export default OfferComponent;
