import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "@/components/dashboard-layout";
import Head from "next/head";
import SupplyShipmentDetail from "@/components/coffee-supply-shipment/supply-shipment-details";

function Page() {

    return (
        <>
            <Head>
                <title>
                    Certificate Detail | Adey Supply-Chain
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
                        variant="h5"
                    >
                        Supply Shipment  Detail
                    </Typography>

                    <Box>
                        <SupplyShipmentDetail />
                    </Box>
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