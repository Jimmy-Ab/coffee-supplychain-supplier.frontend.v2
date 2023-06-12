import { v4 as uuid } from 'uuid';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchAllWarehouses } from '@/api/warehouse';
import { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import HomeIcon from '@mui/icons-material/Home';

export function LatestWarehouses() {

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
          <Divider  sx={{ p: 1 }}/>
          <Skeleton active paragraph />
        </Box>
        :
        <Box>
          <CardHeader
            subtitle={`${count} in total`}
            title="Latest Warehouses"
          />
          <Divider />
          <List>
            {warehouses.slice(0, 5).map((product, i) => (
              <ListItem
                divider={i < count - 1}
                key={product.Record.id}
              >
                <ListItemAvatar>
                  <Avatar
                    variant='rounded'
                  >
                    <HomeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={product.Record.name}
                  secondary={`Warehouse No. ${product.Record.warehouseNo}`}
                />
                <IconButton
                  edge="end"
                  size="small"
                >
                  {product.Record.size}
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      }
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          component="a"
          href='/warehouses'
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  )
}

export default LatestWarehouses;
