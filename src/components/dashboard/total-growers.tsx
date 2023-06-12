import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ForestIcon from '@mui/icons-material/Forest';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { Skeleton } from 'antd';
import { GetAllGrowers } from '@/api/grower';
import millify from 'millify';


function TotalGrowers() {

  const growers = useAppSelector(state => state.grower.growers.result);
  const loading = useAppSelector(state => state.grower.loading);
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);

  useEffect(() => {

    const fetchData = async () => {
      await dispatch(GetAllGrowers());
    }
    fetchData();

    setCount(growers.length || 0);
  }, [growers.length])
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
                Total Growers
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
                  backgroundColor: 'primary.main',
                  height: 56,
                  width: 56
                }}
              >
                <ForestIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      }
    </Card>
  );
}

export default TotalGrowers;
