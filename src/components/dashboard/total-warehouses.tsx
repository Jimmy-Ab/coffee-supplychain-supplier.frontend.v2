import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchAllWarehouses } from '@/api/warehouse';
import { Skeleton } from 'antd';
import millify from 'millify';

function TotalWarehouses() {

  const warehouses = useAppSelector(state => state.warehouse.warehouses.response);
  const loading = useAppSelector(state => state.warehouse.loading);
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);

  useEffect(() => {

    const fetchData = async () => {
      await dispatch(fetchAllWarehouses());
    }
    fetchData();

    setCount(warehouses.length || 0);
  }, [warehouses.length])
  return (
    <Card>
      {loading ?
        <Box
          sx={{ p: 1 }}
        >
          <Skeleton active paragraph />
        </Box>
        :
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="overline"
              >
                Total Warehouse
              </Typography>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {millify(count, {
                  precision: 10,
                  lowercase: false
                })}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: 'success.main',
                  height: 56,
                  width: 56
                }}
              >
                <WarehouseIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      }
    </Card>
  );

}

export default TotalWarehouses;