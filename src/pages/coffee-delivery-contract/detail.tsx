import { DashboardLayout } from "@/components/dashboard-layout";
import { Box, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import GrowerProfile from "@/components/coffee-grower/grower-profile";
import GrowerDetail from "@/components/coffee-grower/grower-details";
import DeliveryContractDetail from "@/components/coffee-delivery-contract/delivery-contract-details";
import DeliveryContractProfile from "@/components/coffee-delivery-contract/delivery-contract-profile";

function Page() {
    return (
        <>
        <Head>
          <title>
            Delivery Contract Detail | Adey Supply-Chain
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3
          }}
        >
          <Container maxWidth="lg">
            <Typography
              sx={{ mb: 3 }}
              variant="h4"
            >
              Contract Detail
            </Typography>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
              >
                <DeliveryContractProfile />
              </Grid>
              <Grid
                item
                lg={8}
                md={6}
                xs={12}
              >
                <DeliveryContractDetail />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
}

Page.getLayout = (page: any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Page;