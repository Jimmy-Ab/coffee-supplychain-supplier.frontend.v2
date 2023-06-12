import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import CoffeeSupplyShipment from '@/components/coffee-supply-shipment/supply-shipment';
import { DashboardLayout } from '@/components/dashboard-layout';

const Page = () => (
    <>
        <Head>
            <title>
                Coffee shipment | Adey supply-chain
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
                <Typography
                    sx={{ mb: 3 }}
                    variant="h4"
                >
                    Coffee Shipment
                </Typography>
                <Box>
                    <CoffeeSupplyShipment />
                </Box>
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
