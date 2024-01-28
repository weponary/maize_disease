import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Avatar,
  Dialog,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { UPLOAD_IMAGE } from "../services/detect/mutation";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResultPage from "../componenets/Result";

const schema = yup.object().shape({
  sampleName: yup.string().required("Sample name is required"),
  image: yup.string().required("Image is required"),
});

const DetectForm = () => {
  const {
    control,
    handleSubmit,
    formState,
    setValue,
    reset,
    trigger,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const [isHealthy, setIsHealthy] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [finalResult, setFinalResult] = useState<string>("");

  const upload_imageMutation = useMutation(UPLOAD_IMAGE, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success(data?.data?.message || "Success");
        if (data?.data?.result?.result === "Corn___Healthy") {
          setIsHealthy(true);
        }
        if (data?.data?.result) {
          setImage(data?.data?.result?.image);
          setFinalResult(data?.data?.result?.result);
        }
        setOpen(true);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        toast.error(data?.message || "Error");
      }
    },
  });

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    reset();
    setFile(null);
    setOpen(false);
  };

  const handleSumbitData = async (data: any) => {
    const formData = new FormData();
    formData.append("sampleName", data.sampleName);
    if (file) {
      formData.append("image", file);
    }

    await upload_imageMutation.mutateAsync(formData);
  };

  const handleFileChange = (event: any) => {
    const selectedFile: File = event.target.files[0];
    // if (
    //   selectedFile.type !== "image/png" &&
    //   selectedFile.type !== "image/jpg"
    // ) {
    //   setError("image", { type: "custom", message: "Invalid Image Format" });
    //   event.target.files = null;
    //   setFile(null);
    //   return;
    // }
    setValue("image", selectedFile.name);
    setFile(selectedFile);
    trigger("image");
  };

  const transparentColor = "linear-gradient(135deg, #FF8A80 30%, #D50000 90%)";

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          mb={3}
          sx={{
            fontFamily: "cursive",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#C15319",
          }}
        >
          🌽 Sample Submission Form
        </Typography>

        <form onSubmit={handleSubmit(handleSumbitData)}>
          <Controller
            name="sampleName"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Sample Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <input
            type="file"
            accept="image/png,image/jpeg"
            id="image-upload"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <label htmlFor="image-upload">
            <Button
              component="span"
              variant="contained"
              color="primary"
              fullWidth
            >
              Upload Image
            </Button>
          </label>

          {formState.errors && formState.errors.image && (
            <p style={{ color: "red" }}>{formState.errors.image.message} </p>
          )}

          <Typography variant="body2" color="textSecondary" mt={1}>
            {file && (
              <Avatar
                src={URL.createObjectURL(file)}
                alt="Image Preview"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  mt: 2,
                  mb: 2,
                }}
              />
            )}
          </Typography>

          <Button
            variant="contained"
            type="submit"
            color="secondary"
            sx={{
              width: "50%",
              height: "auto",
              borderRadius: "8px",
              mt: 6,
              mb: 2,
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          style: {
            background: isHealthy ? "#9CCC65" : transparentColor,
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
          },
        }}
      >
        <ResultPage
          image={image}
          result={finalResult}
          handleClose={handleClose}
        />
      </Dialog>
    </Container>
  );
};

export default DetectForm;
