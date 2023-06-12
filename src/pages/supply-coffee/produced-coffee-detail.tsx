import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "@/components/dashboard-layout";
import Head from "next/head";
import ProducedCoffeeDetails from "@/components/coffee-supply/produced-coffee-details";

function Page() {

    return (
        <>
            <Head>
                <title>
                    Produced Coffee Detail | Adey Supply-Chain
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
                        Produced Coffee Detail
                    </Typography>

                    <Box>
                        <ProducedCoffeeDetails />
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