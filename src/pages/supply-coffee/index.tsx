import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { CoffeeSupply } from '../../components/coffee-supply/coffe-supply';
import { DashboardLayout } from '@/components/dashboard-layout';

const Page = () => (
    <>
        <Head>
            <title>
                Coffee supply | Adey supply-chain
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
                    Coffee Supply
                </Typography>
                <CoffeeSupply />
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
