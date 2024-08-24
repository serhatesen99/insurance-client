import React from "react";
import { Container, Grid, Typography, Link, Box } from "@mui/material";
import allianzLogo from "../assets/allianzLogo.png";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        py: 5,
        my: 5,
        backgroundColor: "#f8f9fa",
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="right">
              <Link href="/" color="inherit" underline="none">
                <img src={allianzLogo} alt="Allianz Logo" width="150" />
              </Link>
              <Typography variant="body2" color="textSecondary" mt={2}>
                © 2024
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="right">
              <Typography variant="h6">Hakkımızda</Typography>
              <Box mt={2}>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Türkiye'de Allianz
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Kurumsal Yapı
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Bilgilendirme ve Raporlar
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Bilgi Toplumu Hizmetleri
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                >
                  Sigortacılık Etik İlkeleri
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="right">
              <Typography variant="h6">Faaliyetlerimiz</Typography>
              <Box mt={2}>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Kampanyalar
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Sürdürülebilirlik
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Çevre ve İklim Değişikliği Hizmetleri
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Girişimcilik ve İnovasyon
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Risk Mühendisliği
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Müzik
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Sanat
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                >
                  Spor
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="right">
              <Typography variant="h6">Bize Katılın</Typography>
              <Box mt={2}>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Allianz'da Kariyer
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Girişimciler Ofisi
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Sağlık Kurumu Başvurusu
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Acente/Aracı Başvurusu
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                  mb={1}
                >
                  Anlaşmalı Servis Başvurusu
                </Link>
                <Link
                  href="#"
                  color="textSecondary"
                  variant="body2"
                  display="block"
                >
                  Allianz'da Tedarikçi Olmak
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
