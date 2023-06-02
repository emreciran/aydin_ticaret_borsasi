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
import AnnouncementService from "src/app/services/announcementService";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import moment from "moment";

const UpdateAnnouncementForm = ({ data, setOpen, getAnnouncements }) => {
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const { user } = useSelector(selectUser);

  const [title, setTitle] = useState(data?.title);
  const [link, setLink] = useState(data?.link);
  const [details, setDetails] = useState(data?.details);
  const [image, setImage] = useState(data?.imageName);
  const [newImage, setNewImage] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedDate = moment().format("DD/MM/YYYY HH:mm");

    setLoading(true);
    const formData = new FormData();

    formData.append("Id", data?.id);
    formData.append("Title", title);
    formData.append("Link", link);
    formData.append("Details", details);
    formData.append("ImageName", image);
    formData.append("ImageFile", newImage);
    formData.append("CreatedBy", data.createdBy);
    formData.append("UpdatedBy", user.name);
    formData.append("CreatedDate", data?.createdDate);
    formData.append("UpdatedDate", updatedDate);

    AnnouncementService.updateAnnouncement(formData)
      .then(() => {
        _showToast.showSuccess("Duyuru güncellendi!");
        getAnnouncements();
        setOpen(false);
      })
      .catch((error) => {
        _showToast.showError(error.response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]){
      let imageFile = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (x) => {
        setImage(x.target.result)
      }
      reader.readAsDataURL(imageFile)
    }
  }

  const handleFile = (e) => {
    setNewImage(e.target.files[0]);
  };

  return (
    <Box component="form" noValidate onSubmit={handleFormSubmit}>
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
          <FormLabel className="mb-10">Duyuru Detay</FormLabel>
          <ReactQuill
            theme="snow"
            value={details}
            onChange={setDetails}
            className="mt-10"
            style={{ height: "200px" }}
          />
        </Grid>
        <Grid item>
          <Box display="flex" flexDirection="column" style={{ marginTop: 80 }}>
            <FormLabel htmlFor="ImageFile" className="mb-10">
              Duyuru Görseli
            </FormLabel>
            {image != null && (
              <FormLabel htmlFor="ImageFile">
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/Images/Announcements/${image}`}
                  alt=""
                  width="100%"
                  className="mb-10"
                />
              </FormLabel>
            )}
            <input
              type="file"
              name="ImageFile"
              id="ImageFile"
              accept="image/*"
              onChange={handleFile}
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

export default UpdateAnnouncementForm;
