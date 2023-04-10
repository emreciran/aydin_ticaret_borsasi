import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import { useTranslation } from "react-i18next";
import Popup from "app/shared-components/Popup";
import UpdateInfoForm from "../components/UpdateInfoForm";
import UpdatePswForm from "../components/UpdatePswForm";

const AboutTab = () => {
  const { user } = useSelector(selectUser);
  const { t } = useTranslation("ProfileApp");
  const aboutTranslate = t("ABOUT", { returnObjects: true });

  const [updateInfoModalOpen, setUpdateInfoModalOpen] = useState(false);
  const [updatePswModalOpen, setUpdatePswModalOpen] = useState(false);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        <div className="md:flex">
          <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
            <Card
              component={motion.div}
              variants={item}
              className="w-full mb-32"
            >
              <div className="px-32 pt-24">
                <Typography className="text-2xl font-semibold leading-tight">
                  {aboutTranslate.TITLE}
                </Typography>
              </div>

              <CardContent className="px-32 py-24">
                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">
                    {aboutTranslate.INFO.name}
                  </Typography>
                  <Typography>{user.given_name}</Typography>
                </div>

                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">
                    {aboutTranslate.INFO.surname}
                  </Typography>
                  <Typography>{user.family_name}</Typography>
                </div>

                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">
                    {aboutTranslate.INFO.username}
                  </Typography>
                  <Typography>{user.name}</Typography>
                </div>

                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">
                    {aboutTranslate.INFO.email}
                  </Typography>
                  <Typography>{user.sub}</Typography>
                </div>

                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">
                    {aboutTranslate.INFO.role}
                  </Typography>
                  <Typography>{user.role}</Typography>
                </div>
                <div className="mb-24">
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => setUpdateInfoModalOpen(true)}
                  >
                    {aboutTranslate.UPDATE_INFO}
                  </Button>
                  <Button
                    color="info"
                    variant="contained"
                    className="ml-5"
                    onClick={() => setUpdatePswModalOpen(true)}
                  >
                    {aboutTranslate.UPDATE_PASSWORD}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
      <Popup
        open={updateInfoModalOpen}
        setOpen={setUpdateInfoModalOpen}
        title={`Kullanıcı Bilgilerini Güncelle`}
      >
        <UpdateInfoForm setOpen={setUpdateInfoModalOpen} />
      </Popup>
      <Popup
        open={updatePswModalOpen}
        setOpen={setUpdatePswModalOpen}
        title={`Şifre Güncelle`}
      >
        <UpdatePswForm setOpen={setUpdatePswModalOpen} />
      </Popup>
    </>
  );
};

export default AboutTab;
