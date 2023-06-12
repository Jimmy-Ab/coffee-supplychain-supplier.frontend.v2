import { Tab, Tabs, Box, Typography } from "@mui/material";
import { useState } from "react";
import { NaturalCoffeeInd } from "./all-natural-coffee";
import { AllProducedCoffee } from "./all-produced-coffee";
import { WashedCoffeeInd } from "./all-washed-coffee";
import { TabContext, TabList, TabPanel } from '@mui/lab';

export const CoffeeSupply = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Coffee Supply">
            <Tab label="Washed Coffee Industry" value="1" />
            <Tab label="Natural Coffee Industry" value="2" />
            <Tab label="Produced Coffee Supply" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <WashedCoffeeInd />
        </TabPanel>
        <TabPanel value="2">
          <NaturalCoffeeInd />
        </TabPanel>
        <TabPanel value="3">
          <AllProducedCoffee />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

