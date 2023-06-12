import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import ContractDeliveryList from '@/components/coffee-contract-delivery/contract-delivery-list';
import { DashboardLayout } from '@/components/dashboard-layout';

const Page = () => (
    <>
        <Head>
            <title>
                Delivery Contract | Adey supply-chain
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
                    Contract Delivery
                </Typography>
                <Box>
                    <ContractDeliveryList />
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
