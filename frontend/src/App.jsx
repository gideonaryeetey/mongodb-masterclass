import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import Sidebar from "./components/Sidebar";
import OrderList from "./components/OrderList";
import Header from "./components/Header";
import { CircularProgress, Option, Select, Sheet, Table } from "@mui/joy";
import useSalesAPI from "./hooks/useSalesAPI";

const formatDate = (date, short = true) => {
  const dateObj = new Date(date);
  const shortDate = dateObj.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const longDate = dateObj.toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return short ? shortDate : longDate;
};

export default function Dashboard() {
  const {
    sales,
    loading,
    deleteSalesOrder,
    handleFilter,
    selectedPurchaseMethod,
  } = useSalesAPI();

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="#some-link"
                fontSize={12}
                fontWeight={500}
              >
                Dashboard
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                Sales
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography level="h2" component="h1">
              Sales
            </Typography>
          </Box>

          <Typography level="title-md">Filter purchase order</Typography>
          <Select
            value={selectedPurchaseMethod}
            sx={{ width: "480px" }}
            onChange={handleFilter}
          >
            <Option value="all">All</Option>
            <Option value="Online">Online</Option>
            <Option value="In store">In Store</Option>
            <Option value="Phone">Phone</Option>
          </Select>
          
          <Sheet
            className="OrderTableContainer"
            variant="outlined"
            sx={{
              display: { xs: "none", sm: "initial" },
              width: "100%",
              borderRadius: "sm",
              flexShrink: 1,
              overflow: "auto",
              minHeight: 0,
            }}
          >
            <Table
              aria-labelledby="tableTitle"
              stickyHeader
              hoverRow
              sx={{
                "--TableCell-headBackground":
                  "var(--joy-palette-background-level1)",
                "--Table-headerUnderlineThickness": "1px",
                "--TableRow-hoverBackground":
                  "var(--joy-palette-background-level1)",
                "--TableCell-paddingY": "4px",
                "--TableCell-paddingX": "8px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: "12px 6px" }}>Date</th>

                  <th
                    style={{
                      padding: "12px 6px",
                    }}
                  >
                    Customer
                  </th>
                  <th style={{ padding: "12px 6px" }}>Store location</th>
                  <th style={{ padding: "12px 6px" }}>Total Price</th>
                  <th style={{ padding: "12px 6px" }}>Used Coupon</th>
                  <th style={{ padding: "12px 6px" }}>Purchase method</th>
                  <th style={{ padding: "12px 6px" }}> </th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr>
                    <td>{formatDate(new Date(sale?.saleDate))}</td>
                    <td>
                      <Typography>{sale.customer?.email}</Typography>
                    </td>
                    <td>
                      <Typography>{sale?.storeLocation}</Typography>
                    </td>
                    <td>
                      <Typography></Typography>
                    </td>
                    <td>
                      <Typography>{sale?.couponUsed ? "Yes" : "No"}</Typography>
                    </td>
                    <td>
                      <Typography>{sale?.purchaseMethod}</Typography>
                    </td>
                    <td>
                      <Typography>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => {
                            const confirmation = confirm(
                              "Are you sure you want to delete this sale?"
                            );
                            if (confirmation) deleteSalesOrder(sale?._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {loading && <CircularProgress />}
            </Box>
          </Sheet>
          <OrderList />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
