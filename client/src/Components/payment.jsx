import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import CreditCards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import axios from "axios";

const PaymentForm = ({ onNext }) => {
  const [fiyat, setFiyat] = useState(0);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const validationSchema = yup.object().shape({
    name: yup.string().required("Kart sahibinin adı soyadı zorunludur"),
    cardNumber: yup
      .string()
      .matches(/^[0-9]{16}$/, "Kart numarası 16 haneli olmalıdır")
      .required("Kart numarası zorunludur"),
    expiryMonth: yup
      .string()
      .required("Son kullanma tarihi - ay zorunludur")
      .test("is-valid-month", "Ay geçersiz", (value) => {
        return (
          /^[0-9]{2}$/.test(value) &&
          parseInt(value, 10) >= 1 &&
          parseInt(value, 10) <= 12
        );
      }),
    expiryYear: yup
      .string()
      .required("Son kullanma tarihi - yıl zorunludur")
      .test("is-future-date", "Son kullanma tarihi geçersiz", function (value) {
        const expiryMonth = this.resolve(yup.ref("expiryMonth"));
        const selectedMonth = parseInt(expiryMonth, 10);
        const selectedYear = parseInt(value, 10);

        if (!selectedMonth || !selectedYear) {
          return true; 
        }

        const fullYear = currentYear + Math.floor(selectedYear / 100);
        const isValidYear =
          selectedYear >= fullYear % 100 || selectedYear === fullYear % 100;
        if (selectedYear > currentYear + 10) {
          return false;
        }

        if (selectedYear > currentYear) {
          return true;
        } else if (selectedYear === currentYear) {
          return selectedMonth >= currentMonth;
        }

        return isValidYear;
      }),
    cvv: yup
      .string()
      .matches(/^[0-9]{3}$/, "CVV 3 haneli olmalıdır")
      .required("CVV kodu zorunludur"),
    paymentType: yup.string().required("Ödeme tipi seçilmelidir"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Form verilerini sessionStorage'dan alıyorum
      const storedFormData = JSON.parse(sessionStorage.getItem("formData"));
      const storedInsuranceDetails = JSON.parse(sessionStorage.getItem("insuranceDetails"));
      const TeminatIsim = sessionStorage.getItem("selectedOffer"); 

      console.log(TeminatIsim)
  
      // Müşteri bilgilerini veritabanına gönderiyorum
      const [day, month, year] = storedFormData.birthDate.split("-");
      const formattedBirthDate = `${year}-${month}-${day}`;
      const customerData = {
        Isim: storedFormData.firstName,
        Soyisim: storedFormData.lastName,
        TC: storedFormData.tcNumber,
        DogumTarih: new Date(formattedBirthDate).toISOString(),
        Tel: storedFormData.phoneNumber,
        Eposta: storedFormData.email,
      };
  
      const customerResponse = await axios.post(
        "https://localhost:7226/api/Musteri/Home",
        customerData
      );
  
      const customerId = customerResponse.data.id;
      sessionStorage.setItem("customerId", customerId);
  
      // Ödeme işlemi
      const paymentResponse = await axios.post(
        "https://localhost:7226/api/Odeme/Home",
        {
          Tutar: fiyat,
          KartNo: data.cardNumber,
          OdemeTuru: data.paymentType,
        }
      );
  
      const odemeId = paymentResponse.data.id;
      sessionStorage.setItem("odemeId", odemeId);
  
      // Poliçe detayları
      const travelInfo = {
        BasTarih: new Date(storedInsuranceDetails.travelDate.split(" - ")[0]).toISOString(),
        BitTarih: new Date(storedInsuranceDetails.travelDate.split(" - ")[1]).toISOString(),
        Yer: storedInsuranceDetails.region,
        Sebeb: storedInsuranceDetails.reason,
        MusteriId: customerId,
        OdemeId: odemeId,
      };
  
      // Poliçe post
      const policeResponse = await axios.post(
        "https://localhost:7226/api/Police/Home",
        travelInfo
      );
  
      const policeIdResponse = policeResponse.data.id;
      sessionStorage.setItem("policeId", policeIdResponse);
  
      // Ödeme ve poliçe bilgilerini başka bir API'ye kaydedin
      await axios.post("https://localhost:7226/api/PoliceTeminat/Home", {
        TeminatIsim: TeminatIsim,
        PoliceId: policeIdResponse,
      });
  
      onNext();
    } catch (error) {
      console.error("İşlem sırasında hata oluştu:", error);
    }
  };
  

  const handleCardDetailChange = (event) => {
    const { name, value } = event.target;

    if (name === "expiryMonth" || name === "expiryYear") {
      const expiryMonth =
        name === "expiryMonth" ? value : cardDetails.expiry.slice(0, 2);
      const expiryYear =
        name === "expiryYear" ? value : cardDetails.expiry.slice(3);
      setCardDetails((prev) => ({
        ...prev,
        expiry: `${expiryMonth}/${expiryYear}`,
      }));
    } else {
      setCardDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const years = Array.from({ length: 10 }, (_, i) =>
    String(new Date().getFullYear() + i).slice(-2)
  );

  useEffect(() => {
    const storedPrice = sessionStorage.getItem("fiyat");
    if (storedPrice) {
      setFiyat(parseFloat(storedPrice) || 0);
    }
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 450,
        margin: "0 auto",
        padding: "20px 0",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Ödenecek Tutar:
      </Typography>
      <Typography
        variant="h4"
        align="center"
        color="primary"
        gutterBottom
        sx={{ fontWeight: "bold", fontSize: "2.5rem" }}
      >
        {fiyat} ₺
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <CreditCards
          cvc={cardDetails.cvc}
          expiry={cardDetails.expiry}
          name={cardDetails.name}
          number={cardDetails.number}
        />
      </Box>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
        Kredi Kartı Bilgileri
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Kart Sahibinin Adı Soyadı"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
              onChange={(e) => {
                field.onChange(e);
                setCardDetails({ ...cardDetails, name: e.target.value });
              }}
            />
          )}
        />

        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="16 Haneli Kart Numarası"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.cardNumber}
              helperText={errors.cardNumber?.message}
              inputProps={{ maxLength: 16 }}
              onChange={(e) => {
                field.onChange(e);
                setCardDetails({ ...cardDetails, number: e.target.value });
              }}
            />
          )}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="expiryMonth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Ay"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.expiryMonth}
                  helperText={errors.expiryMonth?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleCardDetailChange(e);
                  }}
                  name="expiryMonth"
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="expiryYear"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Yıl"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.expiryYear}
                  helperText={errors.expiryYear?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleCardDetailChange(e);
                  }}
                  name="expiryYear"
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>

        <Controller
          name="cvv"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Güvenlik Kodu (CVV) Giriniz"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.cvv}
              helperText={errors.cvv?.message}
              inputProps={{ maxLength: 3 }}
              onChange={(e) => {
                field.onChange(e);
                setCardDetails({ ...cardDetails, cvc: e.target.value });
              }}
            />
          )}
        />

        <Controller
          name="paymentType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Ödeme Tipi"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.paymentType}
              helperText={errors.paymentType?.message}
            >
              <MenuItem value="Peşin Ödeme">Peşin Ödeme</MenuItem>
              <MenuItem value="3 Taksit">3 Taksit</MenuItem>
              <MenuItem value="6 Taksit">6 Taksit</MenuItem>
              <MenuItem value="9 Taksit">9 Taksit</MenuItem>
            </TextField>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "16px" }}
        >
          Ödemeyi Tamamla
        </Button>
      </form>
    </Box>
  );
};

export default PaymentForm;

