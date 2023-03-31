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
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import AnnouncementService from "src/app/services/announcementService";

const NewAnnouncementForm = ({ setOpen, getAnnouncement }) => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const { t } = useTranslation("Announcement");
  const modalTranslate = t("NEWANNOUNCEMENT", { returnObjects: true });
  const { user } = useSelector(selectUser);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const createdDate = moment().format("DD/MM/YYYY HH:mm");
    const formData = new FormData();

    formData.append("Title", title);
    formData.append("Link", link);
    formData.append("Details", details);
    formData.append("ImageFile", image);
    formData.append("CreatedBy", user.name);
    formData.append("CreatedDate", createdDate);

    AnnouncementService.createAnnouncement(formData)
      .then((response) => {
        _showToast.showSuccess("Yeni duyuru oluşturuldu");
        getAnnouncement();
        setLoading(false);
        setOpen(false);
      })
      .catch((error) => {
        setLoading(false);
        _showToast.showError(error.response.data.message);
      });
  };

  return (
    <Box component="form" noValidate onSubmit={handleFormSubmit}>
      <Grid container>
        <Grid item sm={12} style={{ marginBottom: 27 }}>
          <TextField
            variant="standard"
            fullWidth
            label={modalTranslate.title}
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
            label={modalTranslate.link}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            id="link"
            required
          />
        </Grid>
        <Grid item sm={12}>
          <FormLabel htmlFor="Details">{modalTranslate.details}</FormLabel>
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
              {modalTranslate.image}
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
          {modalTranslate.cancel}
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Loading…"
          color="secondary"
        >
          <span>{modalTranslate.button}</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default NewAnnouncementForm;
