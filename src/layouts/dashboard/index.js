/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";

import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const [text1, setText1] = useState("");
  const [text1Content, setText1Content] = useState("");
  const [text2, setText2] = useState("");
  const [text2Content, setText2Content] = useState("");
  const [docsChecked, setDocsChecked] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(0);

  useEffect(() => {
    axios.get("http://192.168.0.108:5000/docsChecked").then((res) => {
      setDocsChecked(res.data.count);
    });
  });

  const handleSubmit = async () => {
    setLoading(true);
    let test1;
    let test2;

    const fileToLoad = document.getElementById("text1").files[0];
    // console.log(fileToLoad);
    const fileReader1 = new FileReader();
    fileReader1.onload = function (fileLoadedEvent) {
      console.log(fileLoadedEvent);
      test1 = fileLoadedEvent.target.result;
      if (test1 === "") alert("Please upload a file!");
      const fileToLoad1 = document.getElementById("text2").files[0];
      const fileReader2 = new FileReader();
      fileReader2.onload = function (fileLoadedEvent1) {
        test2 = fileLoadedEvent1.target.result;
        if (test2 === "") alert("Please upload a file!");
        setText1Content(test1);
        setText2Content(test2);

        axios
          .post("http://192.168.0.108:5000/detect", {
            body: {
              text1: test1,
              text2: test2,
            },
          })
          .then((res) => {
            console.log(res);
            setResult(res.data.ratio);
          })
          .catch((err) => alert(err));
        setLoading(false);
      };
      fileReader2.readAsText(fileToLoad1, "UTF-8");
    };
    fileReader1.readAsText(fileToLoad, "UTF-8");
  };

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <h1 style={{ color: "white" }}>Document Similarity Checker</h1>
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "documents checked", fontWeight: "regular" }}
                count={docsChecked}
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's users" }}
                count="2,300"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>

        <h2 style={{ color: "white" }}>Upload File to Check Similarity</h2>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "table-row" }}>
            <div style={{ padding: "15px", display: "table-cell" }}>
              <Button
                size="medium"
                variant="contained"
                color="inherit"
                component="label"
                sx={{
                  height: "100%",
                  background: linearGradient(
                    gradients.cardDark.main,
                    gradients.cardDark.state,
                    gradients.cardDark.deg
                  ),
                }}
              >
                <h2 style={{ color: "white", padding: "5px" }}>
                  {text1 ? `File Uploaded` : "Upload File"}
                </h2>

                <input
                  type="file"
                  name="text1"
                  id="text1"
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  accept="file/txt"
                  hidden
                />
              </Button>
            </div>

            <div style={{ padding: "15px", display: "table-cell" }}>
              <Button
                size="medium"
                variant="contained"
                color="inherit"
                component="label"
                sx={{
                  height: "100%",
                  background: linearGradient(
                    gradients.cardDark.main,
                    gradients.cardDark.state,
                    gradients.cardDark.deg
                  ),
                }}
              >
                <h2 style={{ color: "white", padding: "5px" }}>
                  {text2 ? `File Uploaded` : "Upload File"}
                </h2>
                <input
                  type="file"
                  name="text2"
                  id="text2"
                  value={text2}
                  onChange={(e) => {
                    console.log(text2);
                    setText2(e.target.value);
                  }}
                  accept="file/txt"
                  hidden
                />
              </Button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "15px" }}>
          <Button size="medium" variant="contained" onClick={handleSubmit}>
            <h2 style={{ color: "white" }}>Submit</h2>
          </Button>
        </div>

        {loading ? "" : ""}
        {result ? "" : ""}

        <VuiBox mb={4}>
          <Grid container spacing="18px">
            <Grid item xs={6} lg={6} xl={5}>
              <WelcomeMark text={text1} textContent={text1Content} />
            </Grid>
            <Grid item xs={6} lg={6} xl={5}>
              <WelcomeMark text={text2} textContent={text2Content} />
            </Grid>
            <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate result={result} />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <ReferralTracking
                result={result * 10}
                text1Length={text1Content === "" ? 0 : text1Content.split(" ").length}
                text2Length={text2Content === "" ? 0 : text2Content.split(" ").length}
              />
            </Grid>
          </Grid>
        </VuiBox>
        {/* <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Sales Overview
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={lineChartDataDashboard}
                      lineChartOptions={lineChartOptionsDashboard}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                    }}
                  >
                    <BarChart
                      barChartData={barChartDataDashboard}
                      barChartOptions={barChartOptionsDashboard}
                    />
                  </VuiBox>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Active Users
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      (+23){" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        than last week
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <Grid container spacing="50px">
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoWallet color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Users
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        32,984
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoIosRocket color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Clicks
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,42M
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <FaShoppingCart color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Sales
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,400$
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoBuild color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Items
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        320
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox> */}
        {/* <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid> */}
      </VuiBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
