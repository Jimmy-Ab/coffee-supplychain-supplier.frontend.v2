import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { TodayPrice } from '../components/dashboard/today-price';
import { LatestWarehouses } from '../components/dashboard/latest-warehouses';
import { YearlyDelivery } from '../components/dashboard/yearly-delivery';
import { MonthlyDelivery } from '../components/dashboard/monthly-delivery';
import { CoffeeTypes } from '../components/dashboard/coffee-types';
import { DashboardLayout } from '@/components/dashboard-layout';
import TotalWarehouses from '@/components/dashboard/total-warehouses';
import TotalGrowers from '@/components/dashboard/total-growers';
import LatestDeliveries from '@/components/dashboard/latest-deliveries';

const Page = () => (
  <>
    <Head>
      <title>
        Dashboard | Adey supply-chain
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TodayPrice />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <MonthlyDelivery />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalWarehouses />
          </Grid>
          
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalGrowers/>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <YearlyDelivery />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <CoffeeTypes />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestWarehouses />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={8}
            xs={12}
          >
            <LatestDeliveries />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page: any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
