import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Pagination,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useQuery } from "react-query";
import { GET_HISTORY } from "../services/detect/query";

interface IHistoryItem {
  id: number;
  sampleName: string;
  image: string;
  result: string;
}

const HistoryPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(getInitialLimit());
  const [isLaptopScreen, setIsLaptopScreen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openImageDialog, setOpenImageDialog] = useState<boolean>(false);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["getHistory", page, limit],
    queryFn: () => {
      return GET_HISTORY({
        page,
        limit,
      });
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleResize = () => {
    setLimit(getInitialLimit());
    setIsLaptopScreen(window.innerWidth >= 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsLaptopScreen(window.innerWidth >= 1024);
  }, []);

  function getInitialLimit() {
    return window.innerWidth <= 600 ? 5 : 9; // Adjust the width as needed
  }

  const getTitleColor = (result: string) => {
    if (result === "Corn___Healthy")
      return "linear-gradient(135deg, #9CCC65 30%, #4CAF50 90%)"; // Gradient for Healthy
    return "linear-gradient(135deg, #FF8A80 30%, #D50000 90%)";
  };

  const getTextColor = (result: string) => {
    if (result === "Corn___Healthy") return "#FFFFFF"; // White text for Healthy
    return "#000000"; // Black text for other results
  };

  const finalResult = (result: string) => {
    if (result === "Corn___Common_Rust") return "Common Rust";
    if (result === "Corn___Gray_Leaf_Spot") return "Gray Leaf Spot";
    if (result === "Corn___Northern_Leaf_Blight") return "Northern Leaf Blight";
    if (result === "Corn___Healthy") return "Healthy";
    return "";
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setSelectedImage(null);
    setOpenImageDialog(false);
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          mb={3}
          sx={{
            fontFamily: "cursive",
            fontSize: isLaptopScreen ? "2.5rem" : "2rem",
            fontWeight: "bold",
            color: "#C15319",
          }}
        >
          🌽 Detection History
        </Typography>
      </div>

      {isLaptopScreen ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    background: "#C15319",
                    color: "#FFFFFF", // White text for the heading
                    fontSize: "1.2rem", // Adjust the font size for the heading
                  }}
                >
                  Sample Name
                </TableCell>
                <TableCell
                  style={{
                    background: "#C15319",
                    color: "#FFFFFF", // White text for the heading
                    fontSize: "1.2rem", // Adjust the font size for the heading
                  }}
                >
                  Image
                </TableCell>
                <TableCell
                  style={{
                    background: "#C15319",
                    color: "#FFFFFF", // White text for the heading
                    fontSize: "1.2rem", // Adjust the font size for the heading
                  }}
                >
                  Result
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.result?.rows?.map((historyItem: IHistoryItem) => (
                <TableRow
                  key={historyItem.id}
                  style={{ background: getTitleColor(historyItem.result) }}
                >
                  <TableCell
                    style={{
                      color: getTextColor(historyItem.result),
                      fontSize: "1rem", // Adjust the font size for the data
                    }}
                  >
                    {historyItem.sampleName}
                  </TableCell>
                  <TableCell
                    style={{
                      color: getTextColor(historyItem.result),
                      fontSize: "1rem", // Adjust the font size for the data
                    }}
                  >
                    <Avatar
                      src={`http://localhost:8000/uploads/${historyItem.image}`}
                      alt={historyItem.sampleName}
                      sx={{ width: 40, height: 40, cursor: "pointer" }}
                      onClick={() => handleImageClick(historyItem.image)}
                    />
                  </TableCell>
                  <TableCell
                    style={{
                      color: getTextColor(historyItem.result),
                      fontSize: "1rem", // Adjust the font size for the data
                    }}
                  >
                    {finalResult(historyItem.result)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {data?.data?.result?.rows?.map((historyItem: IHistoryItem) => (
            <Card
              key={historyItem.id}
              style={{
                width: isLaptopScreen ? "30%" : "100%",
                marginBottom: 20,
                padding: 16,
                background: getTitleColor(historyItem.result),
              }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: 8,
                    color: getTextColor(historyItem.result),
                    fontSize: "1rem", // Adjust the font size for the data
                  }}
                >
                  {historyItem.sampleName}
                </Typography>
                <Avatar
                  src={`http://localhost:8000/uploads/${historyItem.image}`}
                  alt={historyItem.sampleName}
                  sx={{
                    width: 80,
                    height: 80,
                    marginBottom: 8,
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(historyItem.image)}
                />
                <Typography
                  variant="h6"
                  style={{
                    color: getTextColor(historyItem.result),
                    fontSize: "1rem", // Adjust the font size for the data
                  }}
                >
                  {finalResult(historyItem.result)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(data?.data?.result?.count / limit)}
          page={page}
          onChange={handleChangePage}
          style={{ marginTop: 20, textAlign: "center" }}
        />
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <Avatar
            src={`http://localhost:8000/uploads/${selectedImage}`}
            alt="Preview"
            sx={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HistoryPage;
