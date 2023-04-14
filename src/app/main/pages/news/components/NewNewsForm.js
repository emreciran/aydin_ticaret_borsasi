import { Box, FormLabel, Grid, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import useToast from "src/app/hooks/useToast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import NewsService from "src/app/services/newsService";

const initialFieldValues = {
  title: "",
  imageName: "",
  imageSrc: "",
  imageFile: null,
};

const NewNewsForm = ({ setOpen, getNews }) => {
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const { t } = useTranslation("News");
  const modalTranslate = t("NEWNEWS", { returnObjects: true });
  const { user } = useSelector(selectUser);

  const [details, setDetails] = useState("");

  const [values, setValues] = useState(initialFieldValues);

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const createdDate = moment().format("DD/MM/YYYY HH:mm");
    const formData = new FormData();

    formData.append("Title", values.title);
    formData.append("Details", details);
    formData.append("ImageFile", values.imageFile);
    formData.append("CreatedBy", user.name);
    formData.append("CreatedDate", createdDate);

    NewsService.createNews(formData)
      .then((response) => {
        _showToast.showSuccess("Yeni haber oluşturuldu");
        getNews();
        setOpen(false);
      })
      .catch((error) => {
        _showToast.showError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box component="form" noValidate onSubmit={handleFormSubmit}>
      <Grid container>
        <Grid item sm={12} style={{ marginBottom: 25 }}>
          <TextField
            variant="standard"
            fullWidth
            label={modalTranslate.title}
            value={values.title}
            name="title"
            onChange={handleInputChange}
            id="title"
            required
          />
        </Grid>
        <Grid item sm={12}>
          <FormLabel>{modalTranslate.details}</FormLabel>
          <ReactQuill
            theme="snow"
            value={details}
            onChange={setDetails}
            className="mt-10"
            style={{ height: "300px" }}
          />
        </Grid>
        <Grid item>
          <Box display="flex" flexDirection="column" style={{ marginTop: 80 }}>
            <FormLabel htmlFor="ImageFile" className="mb-10">
              {modalTranslate.image}
            </FormLabel>
            <img src={values?.imageSrc} className="mb-10" />
            <input
              type="file"
              name="ImageFile"
              id="ImageFile"
              accept="image/*"
              onChange={showPreview}
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

export default NewNewsForm;
