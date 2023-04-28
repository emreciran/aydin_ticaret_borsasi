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
import { LoadingButton } from "@mui/lab";
import EventService from "src/app/services/eventService";
import { useSelector } from "react-redux";
import useToast from "src/app/hooks/useToast";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker, DesktopDatePicker, trTR } from "@mui/x-date-pickers";

const UpdateEventForm = ({ data, setOpen, getEvents }) => {
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const { t } = useTranslation("Event");
  const modalTranslate = t("UPDATEEVENT", { returnObjects: true });
  const { user } = useSelector(selectUser);

  const [title, setTitle] = useState(data?.title);
  const [status, setStatus] = useState(
    data?.status === true ? "true" : "false"
  );
  const [details, setDetails] = useState(data?.details);
  const [startDate, setStartDate] = useState(moment(data?.startDate));
  const [endDate, setEndDate] = useState(moment(data?.endDate));
  const currDay = moment().format("L LT");
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedDate = moment().format("L LT");

    const values = {
      id: data?.id,
      title,
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
      status: status === "true" ? true : false,
      updatedDate,
      updatedBy: user.name,
      createdDate: data?.createdDate,
      createdBy: data?.createdBy,
      details,
    };

    EventService.updateEvent(values)
      .then(() => {
        _showToast.showSuccess("Ektinlik güncellendi!");
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
              inputFormat="DD.MM.YYYY"
              type="date"
              minDate={currDay}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              value={startDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item sm={6} style={{ marginBottom: 20, marginTop: 40 }}>
            <DateTimePicker
              label={modalTranslate.endDate}
              inputFormat="DD.MM.YYYY"
              type="date"
              value={endDate}
              minDate={currDay}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
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
              onChange={(e) => setStatus(e.target.value)}
              defaultValue={status}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="success" />}
                label={modalTranslate.status.active}
              />
              <FormControlLabel
                value="false"
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

export default UpdateEventForm;
