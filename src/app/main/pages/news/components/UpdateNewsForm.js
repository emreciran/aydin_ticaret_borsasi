import {
  Box,
  FormLabel,
  Grid,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LoadingButton } from "@mui/lab";
import useToast from "src/app/hooks/useToast";
import useAxiosPrivate from "src/app/hooks/useAxiosPrivate";
import NewsService from "src/app/services/newsService";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import moment from "moment";

const UpdateNewsForm = ({ data, setOpen, getNews }) => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const { user } = useSelector(selectUser);

  const [title, setTitle] = useState(data?.title);
  const [details, setDetails] = useState(data?.details);
  const [image, setImage] = useState(data?.imageName);
  const [newImage, setNewImage] = useState();

  const handleFile = (e) => {
    setNewImage(e.target.files[0]);
  };

  const updateNews = async (e) => {
    e.preventDefault();
    const updatedDate = moment().format("DD/MM/YYYY HH:mm");

    setLoading(true);
    const formData = new FormData();

    formData.append("Id", data?.id);
    formData.append("Title", title);
    formData.append("Details", details);
    formData.append("ImageName", image);
    formData.append("ImageFile", newImage);
    formData.append("CreatedBy", data.createdBy);
    formData.append("UpdatedBy", user.name);
    formData.append("CreatedDate", data?.createdDate);
    formData.append("UpdatedDate", updatedDate);

    NewsService.updateNews(formData)
      .then((response) => {
        _showToast.showSuccess("Haber güncellendi!");
        getNews();
        setLoading(false);
        setOpen(false);
      })
      .catch((error) => {
        setLoading(false);
        _showToast.showError(error);
      });
  };

  return (
    <Box component="form" noValidate onSubmit={updateNews}>
      <Grid container>
        <Grid item sm={12} style={{ marginBottom: 25 }}>
          <Typography>{data?.createdDate} tarihinde oluşturuldu.</Typography>
          {data?.updatedDate != "" ? (
            <Typography>{data?.updatedDate} tarihinde güncellendi.</Typography>
          ) : (
            ""
          )}
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 25 }}>
          <TextField
            variant="standard"
            fullWidth
            label="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            required
          />
        </Grid>
        <Grid item sm={12}>
          <FormLabel>Haber Detay</FormLabel>
          <ReactQuill
            theme="snow"
            value={details}
            onChange={setDetails}
            style={{ height: "200px" }}
          />
        </Grid>
        <Grid item>
          <Box display="flex" flexDirection="column" style={{ marginTop: 80 }}>
            <FormLabel htmlFor="ImageFile" style={{ marginBottom: 10 }}>
              Haber Görseli
            </FormLabel>
            {image != null && (
              <img
                src={`${process.env.REACT_APP_SERVER_URL}/Images/${image}`}
                alt=""
                width="100%"
              />
            )}
            <input
              type="file"
              name="ImageFile"
              id="ImageFile"
              accept="image/*"
              onChange={(e) => handleFile(e)}
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 5 }}>
        <Button
          sx={{ marginRight: 1 }}
          variant="outlined"
          color="error"
          onClick={() => setOpen(false)}
        >
          İptal
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Loading…"
          color="secondary"
        >
          <span>Güncelle</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UpdateNewsForm;
