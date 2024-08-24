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

const PaymentForm = ({ onNext }) => {
  const [fiyat, setFiyat] = useState(0);
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
      .test("is-future-date", "Son kullanma tarihi geçersiz", function (value) {
        const { expiryYear } = this.parent;
        if (!expiryYear) return true;
        return (
          parseInt(expiryYear, 10) > currentYear ||
          (parseInt(expiryYear, 10) === currentYear &&
            parseInt(value, 10) >= currentMonth)
        );
      }),
    expiryYear: yup
      .string()
      .required("Son kullanma tarihi - yıl zorunludur")
      .test(
        "is-future-year",
        "Son kullanma tarihi geçersiz",
        function (value) {
          const { expiryMonth } = this.parent;
          if (!expiryMonth) return true;
          return (
            parseInt(value, 10) > currentYear ||
            (parseInt(value, 10) === currentYear &&
              parseInt(expiryMonth, 10) >= currentMonth)
          );
        }
      ),
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

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    onNext();
  };

  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const years = Array.from({ length: 10 }, (_, i) =>
    String(new Date().getFullYear() + i)
  );

  useEffect(() => {
    // Fiyatı sessionStorage'dan alın
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
        backgroundColor: "#f9f3ef",
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
              <MenuItem value="Pesin">Peşin Ödeme</MenuItem>
              <MenuItem value="Taksit3">3 Taksit</MenuItem>
              <MenuItem value="Taksit6">6 Taksit</MenuItem>
              <MenuItem value="Taksit9">9 Taksit</MenuItem>
            </TextField>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px", padding: "10px 0", fontSize: "16px" }}
        >
          ÖDEME YAP
        </Button>
      </form>
    </Box>
  );
};

export default PaymentForm;


