import {
  Box,
  FormLabel,
  Grid,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Typography,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LoadingButton } from "@mui/lab";
import useToast from "src/app/hooks/useToast";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import moment from "moment";
import WeeklyMarketCommentService from "src/app/services/weeklyMarketCommentService";
import { useTranslation } from "react-i18next";

const UpdateWeeklyMarketCommentForm = ({
  data,
  setOpen,
  getWeeklyMarketComments,
}) => {
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const { user } = useSelector(selectUser);

  const { t } = useTranslation("WeeklyMarketComment");
  const modalTranslate = t("UPDATEWEEKLYMARKETCOMMENT", {
    returnObjects: true,
  });

  const [type, setType] = useState(data?.type);
  const [status, setStatus] = useState(data?.status);
  const [details, setDetails] = useState(data?.details);
  const [image, setImage] = useState(data?.imageName);
  const [newImage, setNewImage] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedDate = moment().format("DD/MM/YYYY HH:mm");

    setLoading(true);
    const formData = new FormData();

    formData.append("Id", data?.id);
    formData.append("Type", type);
    formData.append("Status", status);
    formData.append("Details", details);
    formData.append("ImageName", image);
    formData.append("ImageFile", newImage);
    formData.append("CreatedBy", data.createdBy);
    formData.append("UpdatedBy", user.name);
    formData.append("CreatedDate", data?.createdDate);
    formData.append("UpdatedDate", updatedDate);

    WeeklyMarketCommentService.updateWeeklyMarketComment(formData)
      .then(() => {
        _showToast.showSuccess("Güncellendi!");
        getWeeklyMarketComments();
        setOpen(false);
      })
      .catch((error) => {
        _showToast.showError(error.response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFile = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleRadioChange = (e) => {
    const value = e.target.value === "true";
    setStatus(value);
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
          <FormControl fullWidth>
            <InputLabel id="test-select-label">
              {modalTranslate.type}
            </InputLabel>
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
                  src={`${process.env.REACT_APP_SERVER_URL}/Images/WeeklyMarket/${image}`}
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
        <Grid item sm={12} style={{ marginBottom: 15, marginTop: 20 }}>
          <FormControl fullWidth>
            <FormLabel id="demo-radio-buttons-group-label">
              {modalTranslate.status.name}
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="status"
              id="status"
              defaultValue={status}
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

export default UpdateWeeklyMarketCommentForm;
