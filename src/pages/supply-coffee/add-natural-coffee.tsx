import { Box, Container, Grid, Typography } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Head from 'next/head';
import AddNaturalCoffeeDetails from '@/components/coffee-supply/add-natural-coffee-details';
import { DashboardLayout } from '@/components/dashboard-layout';

const Page = () => {
    return (
        <>
            <Head>
                <title>
                    Add Natural Coffee | Adey supply-chain
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
                            variant="h5"
                        >
                            Supply | Add Natural Coffee Industry
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
                                <AddNaturalCoffeeDetails />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </PerfectScrollbar>
        </>
    );
}
Page.getLayout = (page: any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Page;