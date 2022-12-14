import React from "react";
import useSatistic from "./../../hooks/useSatistic";
import useProduct from "./../../hooks/useProduct";
import { Box, Grid, Container, Typography, CardHeader, Card } from '@mui/material';
import Chart from "react-apexcharts";
// import { LineChart } from 'react-chartkick';
function StatisticOrder() {
  const { stasticOrder, stasticOrderStatus } = useSatistic();
  var dates = stasticOrderStatus.map(function (item) {
    return item["date"];
  });
  var totalPriceProcessing = stasticOrderStatus.map(function (item) {
    return item["processing"].total * 1000;
  });
  var totalPricesWaitForPay = stasticOrderStatus.map(function (item) {
    return item["waitforpay"].total * 1000;
  });
  var totalPricesShipping = stasticOrderStatus.map(function (item) {
    return item["shipping"].total * 1000;
  });
  var totalPricesDelivered = stasticOrderStatus.map(function (item) {
    return item["delivered"].total * 1000;
  });

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: dates,
    },
  };
  // const xaxis = {
  //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  // };
  const series = [
    {
      name: "Xử lý đơn hàng",
      data: totalPriceProcessing,
    },
    {
      name: "Đang chờ thanh toán",
      data: totalPricesWaitForPay,
    },
    {
      name: "Đang chờ giao hàng",
      data: totalPricesShipping,
    },
    {
      name: "Đã giao hàng",
      data: totalPricesDelivered,
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 5, }}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }} >Chào mừng đến với Thống kê BT Style</Typography>
      </Box>
      <Grid sm={6} md={8} >
        <Card>
          <CardHeader title="Bảng thống kê" subheader="Trong năm 2022" />
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <Chart options={options} series={series} type="line" width="800" height={400} />
          </Box>
        </Card>
      </Grid >
    </Container >

  );
}

export default StatisticOrder;
