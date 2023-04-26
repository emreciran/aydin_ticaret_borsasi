import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { selectUser } from "app/store/userSlice";
import moment from "moment";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import useToast from "src/app/hooks/useToast";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker, DesktopDatePicker, trTR } from "@mui/x-date-pickers";
import EventService from "src/app/services/eventService";
import { LoadingButton } from "@mui/lab";

const NewEventForm = ({ setOpen, getEvents }) => {
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const { t } = useTranslation("Event");
  const modalTranslate = t("NEWEVENT", { returnObjects: true });
  const { user } = useSelector(selectUser);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState();
  const [details, setDetails] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const currDay = moment().format("L LT");
  console.log(startDate);

  const handleRadioChange = (e) => {
    const value = e.target.value === "true";
    setStatus(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const createdDate = moment().format("L LT");

    const data = {
      title,
      startDate: moment(startDate).format("L LT"),
      endDate: moment(endDate).format("L LT"),
      status,
      createdDate,
      createdBy: user.name,
      details,
    };

    EventService.createEvent(data)
      .then(() => {
        _showToast.showSuccess("Yeni ektinlik oluşturuldu!");
        getEvents();
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
          <TextField
            variant="standard"
            fullWidth
            label={modalTranslate.title}
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            required
          />
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
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="tr">
          <Grid item sm={6} style={{ marginBottom: 20, marginTop: 40 }}>
            <DateTimePicker
              label={modalTranslate.startDate}
              inputFormat={"DD/MM/YYYY HH:mm"}
              type="date"
              minDate={currDay}
              onChange={(newValue) => setStartDate(newValue)}
              value={startDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item sm={6} style={{ marginBottom: 20, marginTop: 40 }}>
            <DateTimePicker
              label={modalTranslate.endDate}
              inputFormat={"DD/MM/YYYY HH:mm"}
              type="date"
              value={endDate}
              minDate={currDay}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </LocalizationProvider>
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

export default NewEventForm;
