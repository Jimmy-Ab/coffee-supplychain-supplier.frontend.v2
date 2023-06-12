import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Skeleton, Tag } from 'antd';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { GetAllCherryDelivery } from '@/api/cherry';

function LatestDeliveries() {

  const deliveries = useAppSelector(state => state.cherry.cherrys.result);
  const loading = useAppSelector(state => state.cherry.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(GetAllCherryDelivery());
    }
    fetchData();

  }, [deliveries.length])
  return (
    <Card >
      {loading ?
        <Box
          sx={{ p: 1 }}
        >
          <Skeleton active paragraph />
          <Divider />
          <Skeleton active paragraph />
        </Box>
        :
        <SimpleBar>
          <CardHeader title="Latest Cherry Deliveries" />
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Batch Number
                  </TableCell>
                  <TableCell>
                    Delivered To
                  </TableCell>
                  <TableCell>
                    Selling Price
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deliveries.slice(0, 5).map((delivery) => (
                  <TableRow
                    hover
                    key={delivery.Record.deliveryId}
                  >
                    <TableCell>
                      {delivery.Record.batchNumber}
                    </TableCell>
                    <TableCell>
                      {delivery.Record.deliveredTo}
                    </TableCell>
                    <TableCell>
                      {delivery.Record.sellingPrice}
                    </TableCell>
                    <TableCell>
                      <Tag
                        color={(delivery.Record.status === 'COLLECTED' && '#FFB020')
                          || (delivery.Record.status === 'PROCESSED' && '#14B8A6')
                          || '#D14343'}
                      >
                        {delivery.Record.status}
                      </Tag>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </SimpleBar>
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
          href='/cherry-delivery'
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  )
}

export default LatestDeliveries;