import { Box, FormLabel, Grid, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LoadingButton } from "@mui/lab";
import useToast from "src/app/hooks/useToast";
import useAxiosPrivate from "src/app/hooks/useAxiosPrivate";

const UpdateAnnouncementForm = ({ data, setOpen, getAnnouncement }) => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();

  const [title, setTitle] = useState(data?.title);
  const [link, setLink] = useState(data?.link);
  const [details, setDetails] = useState(data?.details);
  const [image, setImage] = useState(data?.imageName);
  const [newImage, setNewImage] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("Id", data?.id);
      formData.append("Title", title);
      formData.append("Link", link);
      formData.append("Details", details);
      formData.append("ImageName", image);
      formData.append("ImageFile", newImage);
      formData.append("CreatedDate", data?.createdDate);

      await axiosPrivate.put("/announcements", formData);
      _showToast.showSuccess("Duyuru güncellendi!");
      await getAnnouncement();
      setLoading(false);
      setOpen(false);
    } catch (error) {
      setLoading(false);
      _showToast.showError(error.response.data.message);
    }
  };

  const handleFile = (e) => {
    setNewImage(e.target.files[0]);
  };

  return (
    <Box component="form" noValidate onSubmit={handleFormSubmit}>
      <Grid container>
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
        <Grid item sm={12} style={{ marginBottom: 25 }}>
          <TextField
            variant="standard"
            fullWidth
            label="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            id="link"
            required
          />
        </Grid>
        <Grid item sm={12}>
          <FormLabel>Duyuru Detay</FormLabel>
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
              Duyuru Görseli
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
        >
          <span>Güncelle</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UpdateAnnouncementForm;
