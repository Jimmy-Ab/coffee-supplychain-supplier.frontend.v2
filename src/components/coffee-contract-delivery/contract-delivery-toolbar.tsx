import { Box, Button, Chip, Grid, InputAdornment, SvgIcon, TextField } from "@mui/material";
import { Download as DownloadIcon } from '../../icons/download';
import { Upload as UploadIcon } from '../../icons/upload';
import { Search as SearchIcon } from '../../icons/search';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { RequestContractDelivery } from "./request-contract-delivery";
import { DeliveryContractResult } from "@/features/delivery-contract/deliveryContractSlice";
import { SupplyShipmentResult } from "@/features/supply/supplySlice";

interface Props {
    onSearch: any,
    deliveryContracts: DeliveryContractResult[],
    supplyShipments: SupplyShipmentResult[]
}

export const ContractDeliveryToolbar:
    React.FC<Props> = ({
        onSearch,
        deliveryContracts,
        supplyShipments
    }) => {
        return (
            <>
                <Grid
                    style={{
                        marginBottom: 10
                    }}
                    container
                    rowSpacing={0}
                    columnSpacing={{
                        xs: 1,
                        sm: 2,
                        md: 3
                    }}
                >
                    <Grid
                        item
                        style={{
                            paddingLeft: 25
                        }}
                        xs={12}
                        md={6}
                    >
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                m: -2
                            }}
                        >
                            <Box sx={{
                                py: 1,
                                mb: 3,
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                            }}>
                                <RequestContractDelivery
                                    deliveryContracts={deliveryContracts}
                                    supplyShipments={supplyShipments}
                                />
                                <Button
                                    startIcon={(<DownloadIcon fontSize="small" />)}
                                    sx={{ mr: 1 }}
                                    disabled
                                >
                                    Export
                                </Button>
                            </Box>
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mt: 0 }}>
                            <Box sx={{ maxWidth: 500 }}>
                                <TextField
                                    fullWidth
                                    onChange={onSearch}
                                    size="small"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="end">
                                                <SvgIcon
                                                    color="action"
                                                    fontSize="small"
                                                >
                                                    <SearchIcon />
                                                </SvgIcon>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder="Search"

                                />
                            </Box>
                            <Box sx={{ m: 1 }}>
                                <Chip
                                    icon={
                                        <EmojiObjectsIcon
                                        />}
                                    label="Tip: Search by entering a keyword"
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </>
        );
    }