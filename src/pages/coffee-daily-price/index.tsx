import { Container, Grid } from "@mui/material";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { DashboardLayout } from "@/components/dashboard-layout";
import TodayPrice from "@/components/coffee-daily-price/today-price";
import MonthlyPrice from "@/components/coffee-daily-price/monthly-price";
import YearlyPrice from "@/components/coffee-daily-price/yearly-price";


function Page() {
    return (
        <>
            <Container maxWidth={false} style={{ marginTop: 15 }}>
                <PerfectScrollbar>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={6}
                            sm={6}
                            xl={6}
                            xs={12}
                        >
                            <TodayPrice />
                        </Grid>
                        <Grid
                            item
                            lg={6}
                            sm={6}
                            xl={6}
                            xs={12}
                        >
                            <MonthlyPrice />
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            sm={8}
                            xl={8}
                            xs={12}
                        >
                            <YearlyPrice />
                        </Grid>
                    </Grid>
                </PerfectScrollbar>
            </Container>
        </>
    );
}

Page.getLayout = (page: any) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;