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
import { useSelector } from "react-redux";
import useToast from "src/app/hooks/useToast";
import RequestSuggestionService from "src/app/services/requestSuggestionService";

const ReplyReqSuggForm = ({ data, setOpen, getReqSugg }) => {
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();
  const { t } = useTranslation("REQSUGG");
  const modalTranslate = t("REPLYREQSUGG", { returnObjects: true });
  const { user } = useSelector(selectUser);

  const [reply, setReply] = useState(data?.reply ? data?.reply : "");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const replyDate = moment().format("L LT");

    const values = {
      id: data?.id,
      reply,
      replyBy: user.name,
      replyDate,
      status: true,
      email: data?.email,
      createdDate: data?.createdDate,
      nameSurname: data?.nameSurname,
      phone: data?.phone,
      message: data?.message,
    };

    RequestSuggestionService.replyRequestSuggestion(values)
      .then((response) => {
        _showToast.showSuccess("Yanıt Gönderildi!");
        getReqSugg();
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
            label={modalTranslate.nameSurname}
            value={data?.nameSurname}
            name="nameSurname"
            id="nameSurname"
            disabled
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 27 }}>
          <TextField
            variant="standard"
            fullWidth
            label={modalTranslate.phone}
            value={data?.phone}
            name="phone"
            id="phone"
            disabled
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 27 }}>
          <TextField
            variant="standard"
            fullWidth
            label={modalTranslate.email}
            value={data?.email}
            name="email"
            id="email"
            disabled
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 27 }}>
          <TextField
            multiline
            variant="standard"
            fullWidth
            label={modalTranslate.message}
            value={data?.message}
            name="message"
            minRows={6}
            id="message"
            disabled
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: 27 }}>
          <FormLabel htmlFor="reply">{modalTranslate.reply}</FormLabel>
          <ReactQuill
            theme="snow"
            value={reply}
            id="reply"
            readOnly={data?.status === true ? true : false}
            onChange={setReply}
            className="mt-10"
            style={{ height: "250px", marginTop: 10 }}
          />
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
        {data?.status !== true ? (
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            loadingIndicator="Loading…"
            color="secondary"
          >
            <span>{modalTranslate.button}</span>
          </LoadingButton>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default ReplyReqSuggForm;
