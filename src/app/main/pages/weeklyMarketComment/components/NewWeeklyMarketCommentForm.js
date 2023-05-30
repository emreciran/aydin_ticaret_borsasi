import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LoadingButton } from "@mui/lab";
import useToast from "src/app/hooks/useToast";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import WeeklyMarketCommentService from "src/app/services/weeklyMarketCommentService";

const initialFieldValues = {
  imageName: "",
  imageSrc: "",
  imageFile: null,
};

const NewWeeklyMarketCommentForm = ({ setOpen, getWeeklyMarketComments }) => {
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const { t } = useTranslation("WeeklyMarketComment");
  const modalTranslate = t("NEWWEEKLYMARKETCOMMENT", { returnObjects: true });
  const { user } = useSelector(selectUser);

  const [type, setType] = useState("");
  const [status, setStatus] = useState();
  const [details, setDetails] = useState("");

  const [values, setValues] = useState(initialFieldValues);

  const handleRadioChange = (e) => {
    const value = e.target.value === "true";
    setStatus(value);
  };

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const createdDate = moment().format("DD/MM/YYYY HH:mm");

    const formData = new FormData();

    formData.append("Type", type);
    formData.append("Status", status);
    formData.append("Details", details);
    formData.append("ImageFile", values.imageFile);
    formData.append("CreatedBy", user.name);
    formData.append("CreatedDate", createdDate);

    WeeklyMarketCommentService.createWeeklyMarketComment(formData)
      .then(() => {
        _showToast.showSuccess("Oluşturuldu");
        getWeeklyMarketComments();
        setOpen(false);
      })
      .catch((error) => {
        _showToast.showError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box component="form" noValidate onSubmit={handleFormSubmit}>
      <Grid container>
        <Grid item sm={12} style={{ marginBottom: 27 }}>
          <FormControl fullWidth>
            <InputLabel id="test-select-label">{modalTranslate.type}</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              value={type}
              label={modalTranslate.type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <MenuItem value={"Pamuk"}>Pamuk</MenuItem>
              <MenuItem value={"Çekirdeksiz Kuru Üzüm"}>
                Çekirdeksiz Kuru Üzüm
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 27 }}>
          <FormLabel htmlFor="details">{modalTranslate.details}</FormLabel>
          <ReactQuill
            theme="snow"
            value={details}
            id="details"
            onChange={setDetails}
            className="mt-10"
            style={{ height: "250px", marginTop: 10 }}
          />
        </Grid>
        <Grid item>
          <Box display="flex" flexDirection="column" style={{ marginTop: 80 }}>
            <FormLabel htmlFor="ImageFile" className="mb-10">
              {modalTranslate.image}
            </FormLabel>
            <FormLabel htmlFor="ImageFile">
              <img src={values?.imageSrc} className="mb-10" />
            </FormLabel>
            <input
              type="file"
              name="ImageFile"
              id="ImageFile"
              accept="image/*"
              onChange={showPreview}
            />
          </Box>
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 15, marginTop: 20 }}>
          <FormControl fullWidth>
            <FormLabel id="demo-radio-buttons-group-label">
              {modalTranslate.status.name}
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="status"
              id="status"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value={true}
                control={<Radio color="success" />}
                label={modalTranslate.status.active}
              />
              <FormControlLabel
                value={false}
                control={<Radio color="error" />}
                label={modalTranslate.status.passive}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 3 }}>
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

export default NewWeeklyMarketCommentForm;
