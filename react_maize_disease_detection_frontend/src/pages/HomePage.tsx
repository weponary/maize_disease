import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
} from "@mui/material";

import banner from "../assets/banner.jpeg";

const HomePage = () => {
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const imageHeight = isSmallScreen ? 200 : 300;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
      maxWidth="1200px"
      margin="auto"
    >
      <Box mt={4} display="flex" flexDirection="column" gap={3}>
        <Typography
          variant="h5"
          component="div"
          display="flex"
          justifyContent="center"
          color={"#C15319"}
        >
          Welcome to Maize Disease Detection System
        </Typography>

        <Card>
          <CardMedia
            component="img"
            height={imageHeight}
            image={banner} // Replace with your image URL
            alt="Maize Disease Detection System Image"
            style={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Enhancing Maize Crop Health with Technology
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Our Maize Disease Detection System leverages cutting-edge
              technology to monitor and analyze the health of maize crops. Say
              goodbye to traditional methods and embrace a smarter approach to
              agriculture. With our system, you can detect and diagnose diseases
              early, optimize irrigation, and ensure the overall well-being of
              your maize fields.
            </Typography>
          </CardContent>
        </Card>

        <Typography variant="body2" color="text.secondary">
          The system goes beyond basic detection by providing actionable
          insights, historical data analysis, and customizable alerts. Whether
          you are a small-scale farmer or part of a large agricultural
          enterprise, our Maize Disease Detection System is designed to enhance
          productivity, reduce risks, and contribute to sustainable farming
          practices.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
