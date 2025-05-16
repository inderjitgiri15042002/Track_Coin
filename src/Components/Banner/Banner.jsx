import { Container, Typography, Box } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <Box
      className="banner"
      sx={{
        width: "100%",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container>
        <Box textAlign="center">
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontFamily: "Montserrat",
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            TRACK COIN
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 400,
              color: "#ddd",
              fontFamily: "Montserrat",
              textTransform: "capitalize",
              letterSpacing: "0.5px",
            }}
          >
            Get all the info regarding your favourite crypto currency
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Box>
  );
};

export default Banner;
