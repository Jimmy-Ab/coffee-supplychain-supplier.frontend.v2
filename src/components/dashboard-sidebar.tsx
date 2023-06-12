import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Logo } from './logo';
import ForestIcon from '@mui/icons-material/Forest';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GarageSharpIcon from '@mui/icons-material/GarageSharp';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import { NavItem } from './nav-item';

const items = [
  {
    href: '/',
    icon: (<DashboardIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/coffee-warehouses',
    icon: (<StoreIcon fontSize="small" />),
    title: 'Warehouses'
  },
  {
    href: '/coffee-growers',
    icon: (<ForestIcon fontSize="small" />),
    title: 'Growers'
  },
  {
    href: '/coffee-daily-price',
    icon: (<PaidRoundedIcon fontSize="small" />),
    title: 'Daily Price'
  },
  {
    href: '/coffee-cherry-delivery',
    icon: (<DeliveryDiningIcon fontSize="small" />),
    title: 'Cherry Delivery'
  },
  {
    href: '/supply-coffee',
    icon: (<InventoryIcon fontSize="small" />),
    title: 'Supply Coffee'
  },
  {
    href: '/coffee-supply-shipment',
    icon: (<GarageSharpIcon fontSize="small" />),
    title: 'Supply Shipment'
  },
  
  {
    href: '/transportation-certificate',
    icon: (<LocalShippingIcon fontSize="small" />),
    title: 'Transport Certificate'
  },
  {
    href: '/coffee-delivery-contract',
    icon: (<GavelRoundedIcon fontSize="small" />),
    title: 'Delivery Contract'
  },
  {
    href: '/coffee-contract-delivery',
    icon: (<ShoppingCartSharpIcon fontSize="small" />),
    title: 'Contract Delivery'
  }
];

export const DashboardSidebar = (props: any) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >

              <Logo
                sx={{
                  height: 42,
                  width: 42
                }}
              />

            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Adey Supply Chain
                </Typography>
                <Typography
                  color="#9CA3AF"
                  variant="body2"
                >
                  Supplier
                </Typography>
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="#F3F4F6"
            variant="subtitle2"
          >
            Need to know more about us?
          </Typography>
          <Typography
            color="#6B7280"
            variant="body2"
          >
            Check out our official website here.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >

          </Box>
          <NextLink href="https://adey-meselesh.de/en" passHref legacyBehavior>
            <Button
              color="primary"
              component="a"
              endIcon={(<OpenInNewIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              ABOUT US
            </Button>
          </NextLink>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#111827',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#111827',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
