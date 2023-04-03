import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import UserService from "src/app/services/userService";
import { useTranslation } from "react-i18next";

const TimelineTab = () => {
  const [data, setData] = useState(null);
  const { user } = useSelector(selectUser);
  const { t } = useTranslation("ProfileApp");
  const timelineTranslate = t("TIMELINE", { returnObjects: true });

  const getUserDetails = () => {
    UserService.getUserById(user.nameid)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, [user]);

  if (data === null) return null;

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
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <div className="md:flex">
        <div className="flex flex-col w-full md:ltr:mr-32 md:rtl:ml-32">
          <Card
            component={motion.div}
            variants={item}
            className="flex flex-col w-full px-32 pt-24"
          >
            <div className="flex justify-between items-center pb-16">
              <Typography className="text-2xl font-semibold leading-tight">
                {timelineTranslate.TITLE}
              </Typography>
            </div>

            <CardContent className="p-0">
              <Timeline position="alternate">
                {data?.updatedDate && (
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      {data?.updatedDate}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Kullanıcı güncellendi.</TimelineContent>
                  </TimelineItem>
                )}
                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                    {data?.createdDate}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                  </TimelineSeparator>
                  <TimelineContent>Kullanıcı oluşturuldu.</TimelineContent>
                </TimelineItem>
              </Timeline>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineTab;
