import { CoffeeSupply } from "@/components/coffee-supply/coffe-supply";
import TransportationCertificate from "@/components/coffee-transportation/coffee-transportation";
import { TransportationToolbar } from "@/components/coffee-transportation/transportation-toolbar";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Box, Card, Container, Typography } from "@mui/material";
import Head from "next/head";

const Page = () => (
    <div style={{ margin: '20px 20px' }}>
        <Head>
            <title>
                Transportation | Adey supply-chain
            </title>
        </Head>
        <Typography
            sx={{ m: 1 }}
            variant="h4"
        >
            Coffee Transportation
        </Typography>
        <Box>
            <TransportationCertificate />
        </Box>
    </div>
)

Page.getLayout = (page: any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Page;
