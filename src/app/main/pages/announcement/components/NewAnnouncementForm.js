import React, { useState } from "react";
import {
  Box,
  FormLabel,
  Grid,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LoadingButton } from "@mui/lab";
import useToast from "src/app/hooks/useToast";
import useAxiosPrivate from "src/app/hooks/useAxiosPrivate";
import moment from "moment";

const NewAnnouncementForm = ({ setOpen, getAnnouncement }) => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const createdDate = moment().format("DD/MM/YYYY");
      const formData = new FormData();

      formData.append("Title", title);
      formData.append("Link", link);
      formData.append("Details", details);
      formData.append("ImageFile", image);
      formData.append("CreatedDate", createdDate);

      await axiosPrivate.post("/announcements", formData);
      _showToast.showSuccess("Yeni duyuru oluşturuldu");
      await getAnnouncement();
      setLoading(false);
      setOpen(false);
    } catch (error) {
      setLoading(false);
      _showToast.showError(error.response.data.message);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleFormSubmit}>
      <Grid container>
        <Grid item sm={12} style={{ marginBottom: 27 }}>
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
        <Grid item sm={12} style={{ marginBottom: 27 }}>
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
          <FormLabel htmlFor="Details">Duyuru Detay</FormLabel>
          <ReactQuill
            theme="snow"
            value={details}
            id="Details"
            onChange={setDetails}
            style={{ height: "300px", marginTop: 10 }}
          />
        </Grid>
        <Grid item>
          <Box display="flex" flexDirection="column" style={{ marginTop: 80 }}>
            <FormLabel htmlFor="ImageFile" style={{ marginBottom: 10 }}>
              Duyuru Görseli
            </FormLabel>
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
          <span>Oluştur</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default NewAnnouncementForm;
