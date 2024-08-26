import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
  Button,
  Box,
  FormHelperText,
} from "@mui/material";


const InsuranceForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tcNumber: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    termsAccepted: false,
    privacyPolicyAccepted: false,
    commercialConsent: false,
    userAgreementAccepted: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    tcNumber: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    termsAccepted: "",
    privacyPolicyAccepted: "",
    commercialConsent: "",
    userAgreementAccepted: "",
  });

  const validateFirstName = (firstName) => {
    const isAllLetters = /^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/.test(firstName.trim());
    return firstName.trim() && isAllLetters ? "" : "Geçerli bir İsim giriniz.";
  };

  const validateLastName = (lastName) => {
    const isAllLetters = /^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/.test(lastName.trim());
    return lastName.trim() && isAllLetters
      ? ""
      : "Geçerli bir Soyisim giriniz.";
  };

  const validateTcNumber = (tcNumber) => {
    const isAllDigits = /^\d+$/.test(tcNumber);
    const isValid =
      isAllDigits && tcNumber.length === 11 && parseInt(tcNumber[10]) % 2 === 0;
    return isValid ? "" : "Geçerli bir T.C. Kimlik Numarası giriniz.";
  };
  const validatePhoneNumber = (phoneNumber) => {
    const isAllDigits = /^\d+$/.test(phoneNumber);
    const isValid =
      isAllDigits &&
      phoneNumber.length === 10 &&
      phoneNumber[0] !== "0" &&
      phoneNumber[0] === "5";

    return isValid
      ? ""
      : "Telefon numarası 5 ile başlamalı ve 10 haneli olmalı.";
  };

  const validateBirthDate = (birthDate) => {
    const birthDatePattern =
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return birthDatePattern.test(birthDate)
      ? ""
      : "Doğum tarihi GG/AA/YYYY formatında olmalıdır.";
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email)
      ? ""
      : "Geçerli bir e-posta adresi giriniz.";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "firstName") {
      setErrors({ ...errors, firstName: validateFirstName(value) });
    }

    if (name === "lastName") {
      setErrors({ ...errors, lastName: validateLastName(value) });
    }

    if (name === "tcNumber") {
      setErrors({ ...errors, tcNumber: validateTcNumber(value) });
    }

    if (name === "phoneNumber") {
      setErrors({ ...errors, phoneNumber: validatePhoneNumber(value) });
    }

    if (name === "birthDate") {
      setErrors({ ...errors, birthDate: validateBirthDate(value) });
    }

    if (name === "email") {
      setErrors({ ...errors, email: validateEmail(value) });
    }
  };

  const handleSubmit = () => {
    const firstNameError = validateFirstName(formData.firstName);
    const lastNameError = validateLastName(formData.lastName);
    const tcNumberError = validateTcNumber(formData.tcNumber);
    const phoneNumberError = validatePhoneNumber(formData.phoneNumber);
    const birthDateError = validateBirthDate(formData.birthDate);
    const emailError = validateEmail(formData.email);

    const termsAcceptedError = formData.termsAccepted
      ? ""
      : "Bu alanı işaretlemeniz gerekiyor.";
    const privacyPolicyAcceptedError = formData.privacyPolicyAccepted
      ? ""
      : "Bu alanı işaretlemeniz gerekiyor.";
    const commercialConsentError = formData.commercialConsent
      ? ""
      : "Bu alanı işaretlemeniz gerekiyor.";
    const userAgreementAcceptedError = formData.userAgreementAccepted
      ? ""
      : "Bu alanı işaretlemeniz gerekiyor.";

    if (
      firstNameError ||
      lastNameError ||
      tcNumberError ||
      phoneNumberError ||
      birthDateError ||
      emailError ||
      termsAcceptedError ||
      privacyPolicyAcceptedError ||
      commercialConsentError ||
      userAgreementAcceptedError
    ) {
      setErrors({
        ...errors,
        firstName: firstNameError,
        lastName: lastNameError,
        tcNumber: tcNumberError,
        phoneNumber: phoneNumberError,
        birthDate: birthDateError,
        email: emailError,
        termsAccepted: termsAcceptedError,
        privacyPolicyAccepted: privacyPolicyAcceptedError,
        commercialConsent: commercialConsentError,
        userAgreementAccepted: userAgreementAcceptedError,
      });
    } else {
      sessionStorage.setItem("firstName", formData.firstName);
      sessionStorage.setItem("lastName", formData.lastName);
      onNext(formData);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="130vh"
     
    >
      <Box sx={{ width: "100%", maxWidth: "400px", padding: 2 }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              whiteSpace: "nowrap", 
              textOverflow: "ellipsis",
              maxWidth: "1000%", 
            }}
          >
            5 dakikada poliçenizi oluşturmak ister misiniz?
          </Typography>
        </Box>

        <TextField
          label="İsim"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Soyisim"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          fullWidth
          margin="normal"
        />

        <TextField
          label="T.C. Kimlik Numarası"
          name="tcNumber"
          value={formData.tcNumber}
          onChange={handleChange}
          error={!!errors.tcNumber}
          helperText={errors.tcNumber}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Doğum Tarihi (GG/AA/YYYY)"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          error={!!errors.birthDate}
          helperText={errors.birthDate}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Telefon Numarası"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          fullWidth
          margin="normal"
        />

        <TextField
          label="E-posta"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.termsAccepted}
              onChange={handleChange}
              name="termsAccepted"
            />
          }
          label={
            <Typography sx={{ fontSize: "0.875rem" }}>
              <Link
                href="https://www.allianz.com.tr/tr_TR/faydali-bilgiler-ve-linkler/izin-metinleri/azs-kisisel-verilerin-islenmesi-aydinlatma-metni.html"
                target="_blank"
                sx={{ fontSize: "0.875rem" }} // Adjust link text size as well
              >
                Kişisel Verilerin İşlenmesi Hakkında Aydınlatma Metnini
              </Link>{" "}
              okudum, kabul ediyorum. *
            </Typography>
          }
        />
        <FormHelperText
          error={!!errors.termsAccepted}
          sx={{ fontSize: "0.75rem" }}
        >
          {errors.termsAccepted}
        </FormHelperText>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.privacyPolicyAccepted}
              onChange={handleChange}
              name="privacyPolicyAccepted"
            />
          }
          label={
            <Typography sx={{ fontSize: "0.875rem" }}>
              <Link
                href="https://www.allianz.com.tr/tr_TR/faydali-bilgiler-ve-linkler/izin-metinleri/azs-tanitim-ve-pazarlama-icerikli-ticari-elektronik-ileti-gonderimi-icin-kisisel-verilerin-islenmesine-yonelik-aydinlatma-metni.html"
                target="_blank"
                sx={{ fontSize: "0.875rem" }}
              >
                Ticari Elektronik İleti Gönderimi İçin Kişisel Verilerin
                İşlenmesine Yönelik Aydınlatma Metnini
              </Link>{" "}
              okudum, kabul ediyorum. *
            </Typography>
          }
        />
        <FormHelperText
          error={!!errors.privacyPolicyAccepted}
          sx={{ fontSize: "0.75rem" }}
        >
          {errors.privacyPolicyAccepted}
        </FormHelperText>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.commercialConsent}
              onChange={handleChange}
              name="commercialConsent"
            />
          }
          label={
            <Typography sx={{ fontSize: "0.875rem" }}>
              <Link
                href="https://www.allianz.com.tr/tr_TR/faydali-bilgiler-ve-linkler/izin-metinleri/azs-ticari-elektronik-ileti-onay-metni.html"
                target="_blank"
                sx={{ fontSize: "0.875rem" }}
              >
                Ticari elektronik ileti gönderilmesini
              </Link>{" "}
              kabul ediyorum.
            </Typography>
          }
        />
        <FormHelperText
          error={!!errors.commercialConsent}
          sx={{ fontSize: "0.75rem" }}
        >
          {errors.commercialConsent}
        </FormHelperText>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.userAgreementAccepted}
              onChange={handleChange}
              name="userAgreementAccepted"
            />
          }
          label={
            <Typography sx={{ fontSize: "0.875rem" }}>
              <Link
                href="https://www.allianz.com.tr/tr_TR/faydali-bilgiler-ve-linkler/izin-metinleri/kullanicisozlesmesi-ve-gizlilik-politikasi.html"
                target="_blank"
                sx={{ fontSize: "0.875rem" }}
              >
                Kullanıcı Sözleşmesi ve Gizlilik Politikasını
              </Link>{" "}
              okudum ve onaylıyorum. *
            </Typography>
          }
        />
        <FormHelperText
          error={!!errors.userAgreementAccepted}
          sx={{ fontSize: "0.75rem" }}
        >
          {errors.userAgreementAccepted}
        </FormHelperText>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ width: "100%" }}
          onClick={handleSubmit}
        >
          Devam Et
        </Button>
      </Box>
    </Box>
  );
};

export default InsuranceForm;
