import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Container,
  Paper,
  Box,
  FormHelperText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setPrices } from "./priceSlice";
import axios from "axios";

const TravelInfo = ({ personalInfo, onNext }) => {
  const dispatch = useDispatch();
  const { name, tcNo } = personalInfo;

  const [policyStart, setPolicyStart] = useState("");
  const [policyEnd, setPolicyEnd] = useState("");
  const [travelArea, setTravelArea] = useState("");
  const [travelReason, setTravelReason] = useState("");
  const [worldWarning, setWorldWarning] = useState("");
  const [formError, setFormError] = useState({});
  const [calculatedPrices, setCalculatedPrices] = useState([]);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    setPolicyStart(tomorrow.toISOString().split("T")[0]);
    setPolicyEnd(dayAfterTomorrow.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (policyStart && policyEnd && travelArea) {
      const startDate = new Date(policyStart);
      const endDate = new Date(policyEnd);
      const policyDays = Math.ceil(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
      );

      const factors =
        travelArea === "Tüm Dünya" ? [260, 335, 410] : [175, 205, 280];

      const offers = [
        { name: "Standart", factor: factors[0] },
        { name: "Kapsamlı", factor: factors[1] },
        { name: "Geniş Kapsamlı", factor: factors[2] },
      ];

      const newPrices = offers.map((offer) => ({
        ...offer,
        price: policyDays * offer.factor + " ₺",
      }));

      setCalculatedPrices(newPrices);
    }
  }, [policyStart, policyEnd, travelArea]);

  const handleNext = async () => {
    const startDate = new Date(policyStart);
    const endDate = new Date(policyEnd);
    const today = new Date();
    const errors = {};

    if (!policyStart) {
      errors.policyStart = "Lütfen poliçe başlangıç tarihini seçin.";
    } else if (startDate < today) {
      errors.policyStart = "Poliçe başlangıç tarihi geçmiş bir tarihte olamaz.";
    }

    if (!policyEnd) {
      errors.policyEnd = "Lütfen poliçe bitiş tarihini seçin.";
    } else if (endDate <= startDate) {
      errors.policyEnd =
        "Poliçe bitiş tarihi, başlangıç tarihinden en az 1 gün sonra olmalıdır.";
    } else {
      const tripEndDate = new Date("2023-12-31");
      if (endDate <= tripEndDate) {
        errors.policyEnd =
          "Poliçe bitiş tarihi, seyahatin bitiş tarihinden en az 1 gün sonra olmalıdır.";
      }
    }

    if (!travelArea) {
      errors.travelArea = "Lütfen seyahat yerini seçin.";
    }

    if (!travelReason) {
      errors.travelReason = "Lütfen seyahat sebebini seçin.";
    }

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    const insuranceDetails = {
      travelDate: `${policyStart} - ${policyEnd}`,
      region: travelArea,
      reason: travelReason,
    };
    sessionStorage.setItem(
      "insuranceDetails",
      JSON.stringify(insuranceDetails)
    );

    setFormError({});
    dispatch(setPrices(calculatedPrices));

    const travelInfo = {
      BasTarih: new Date(policyStart).toISOString(),
      BitTarih: new Date(policyEnd).toISOString(),
      Yer: travelArea,
      Sebeb: travelReason,
    };

    try {
      const response = await axios.post(
        "https://localhost:7226/api/Police/Home",
        travelInfo
      );
      const policeId = response.data.id;
      sessionStorage.setItem("policeId", policeId);

      onNext();
    } catch (error) {
      console.error("Veri gönderiminde hata oluştu:", error);
    }
  };

  const handleTravelAreaChange = (event) => {
    const value = event.target.value;
    setTravelArea(value);

    if (value === "Tüm Dünya") {
      setWorldWarning(
        "Seyahat poliçelerimiz, aşağıda belirtilen ülkelerde teminat kapsamı dışındadır: Lübnan, Irak, İran, Burma (Myanmar), Kongo Demokratik Cumhuriyeti, Liberya, Afganistan, Sudan, Suriye"
      );
    } else {
      setWorldWarning("");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Seyahat teklifiniz için bilgilerinize ihtiyacımız var.
        </Typography>

        <Box mb={2}>
          <TextField
            label="Poliçe Başlangıç"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            value={policyStart}
            onChange={(e) => setPolicyStart(e.target.value)}
            error={!!formError.policyStart}
            helperText={formError.policyStart || ""}
          />

          <TextField
            label="Poliçe Bitiş"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            value={policyEnd}
            onChange={(e) => setPolicyEnd(e.target.value)}
            error={!!formError.policyEnd}
            helperText={formError.policyEnd || ""}
          />
          <FormHelperText sx={{ fontSize: "1rem" }}>
            Seyahat poliçesinin bitiş tarihini, seyahatin başlangıç tarihinden
            en az 1 gün sonra olacak şekilde girmelisiniz.
          </FormHelperText>
        </Box>

        <Box mb={2} sx={{ borderBottom: "1px solid #000", pb: 2 }}>
          <Typography variant="subtitle1">Seyahat Yeri</Typography>
          <RadioGroup row value={travelArea} onChange={handleTravelAreaChange}>
            <FormControlLabel
              value="Avrupa"
              control={<Radio />}
              label="Avrupa"
            />
            <FormControlLabel
              value="Tüm Dünya"
              control={<Radio />}
              label="Tüm Dünya"
            />
          </RadioGroup>
          {formError.travelArea && (
            <FormHelperText sx={{ color: "red", fontSize: "1rem" }}>
              {formError.travelArea}
            </FormHelperText>
          )}
          {worldWarning && (
            <FormHelperText sx={{ color: "#414141", fontSize: "1rem" }}>
              {worldWarning}
            </FormHelperText>
          )}
        </Box>

        <Box mb={2} sx={{ borderBottom: "1px solid #000", pb: 2 }}>
          <Typography variant="subtitle1">Seyahat Sebebi</Typography>
          <RadioGroup
            row
            value={travelReason}
            onChange={(e) => setTravelReason(e.target.value)}
          >
            <FormControlLabel
              value="İş/Turistik"
              control={<Radio />}
              label="İş/Turistik"
            />
            <FormControlLabel
              value="Eğitim"
              control={<Radio />}
              label="Eğitim"
            />
          </RadioGroup>
          {formError.travelReason && (
            <FormHelperText sx={{ color: "red", fontSize: "1rem" }}>
              {formError.travelReason}
            </FormHelperText>
          )}
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1">Seyahat Edecek Kişi</Typography>
        </Box>

        <Box mb={2}>
          <Typography sx={{ fontWeight: "bold" }}>
            {tcNo} {name} <br />
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleNext}
        >
          Devam Et
        </Button>
      </Paper>
    </Container>
  );
};

export default TravelInfo;
