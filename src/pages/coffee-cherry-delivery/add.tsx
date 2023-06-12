import { Box, Container, Grid, Typography } from '@mui/material';
import AddDeliveryDetails from '../../components/coffee-cherry/add-delivery-details';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Head from 'next/head';
import { DashboardLayout } from '@/components/dashboard-layout';

const Page = () => (
  <>
    <Head>
      <title>
        Add Cherry Delivery | Adey supply-chain
      </title>
    </Head>
    <PerfectScrollbar>
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
            Cherry Delivery
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
            >
              <AddDeliveryDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </PerfectScrollbar>
  </>
);

Page.getLayout = (page: any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default Page;
