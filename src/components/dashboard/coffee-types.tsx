import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';


export const CoffeeTypes = () => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 22, 15],
        backgroundColor: ['#14B8A6 ', '#FB8C00', '#D14343'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Processed', 'Collected', 'Unknown']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Processed',
      value: 63,
      icon: LibraryAddCheckIcon,
      color: '#14B8A6'
    },
    {
      title: 'Collected',
      value: 22,
      icon: LaptopMacIcon,
      color: '#FB8C00'
    },
    {
      title: 'Unknown',
      value: 15,
      icon: QuestionMarkIcon,

      color: '#D14343'
    },


  ];

  return (
    <Card>
      <CardHeader title="Coffee Status" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
          // options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
