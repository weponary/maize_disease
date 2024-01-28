import {
  Box,
  Typography,
  Button,
  Avatar,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

interface IProps {
  image: string;
  result: string;
  handleClose: () => void;
}

const ResultPage = (props: IProps) => {
  const isHealthy = props.result === "Corn___Healthy";

  const imageUrl = props.image;

  const navigate = useNavigate();

  const finalResult = () => {
    let value = "";
    if (props.result === "Corn___Common_Rust") value = "Common Rust";
    if (props.result === "Corn___Gray_Leaf_Spot") value = "Gray Leaf Spot";
    if (props.result === "Corn___Northern_Leaf_Blight")
      value = "Northern Leaf Blight";
    return value;
  };

  return (
    <div>
      <DialogTitle>
        <Typography variant="h4" color="primary">
          {isHealthy ? "Healthy Corn Leaf 🌽" : "Unhealthy Corn Leaf 🚨"}
        </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          overflowY: "hidden", // to hide the scrollbar
        }}
      >
        <Box>
          {imageUrl && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                src={`http://localhost:8000/uploads/${imageUrl}`}
                alt={isHealthy ? "Healthy Corn Leaf" : "Unhealthy Corn Leaf"}
                sx={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "8px",
                  mt: 2,
                  mb: 2,
                }}
              />
            </div>
          )}

          <Typography variant="body1" color="text.primary" fontSize={18} mt={1}>
            {isHealthy
              ? "Great news! Your corn leaf is healthy and free from diseases."
              : `Your corn leaf shows signs of ${finalResult()} diseases. It's advisable to visit a vet for a detailed diagnosis and treatment.`}
          </Typography>

          <Typography
            component={"div"}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              gap: "20px",
            }}
          >
            <Button
              component={Link}
              to="/detect"
              variant="contained"
              style={{
                backgroundColor: isHealthy ? "#66BB6A" : "#FF8A80", // Adjusted colors
                color: "#FFFFFF",
              }}
              fullWidth
              sx={{
                width: "70%",
                height: "auto",
                borderRadius: "8px",
                mt: 3,
                mb: 2,
              }}
              onClick={props.handleClose}
            >
              Back to Detection Form
            </Button>
            <Button
              component={Link}
              to="/history"
              variant="contained"
              style={{
                backgroundColor: isHealthy ? "#66BB6A" : "#FF8A80", // Adjusted colors
                color: "#FFFFFF",
              }}
              fullWidth
              sx={{
                width: "70%",
                height: "auto",
                borderRadius: "8px",
                mt: 3,
                mb: 2,
              }}
              onClick={() => navigate("/history")}
            >
              Check history
            </Button>
          </Typography>
        </Box>
      </DialogContent>
    </div>
  );
};

export default ResultPage;
