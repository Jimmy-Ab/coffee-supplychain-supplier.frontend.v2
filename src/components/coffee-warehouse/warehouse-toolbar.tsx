import { Box, Button, Chip, Grid, InputAdornment, SvgIcon, TextField } from "@mui/material";
import { Download as DownloadIcon } from '../../icons/download';
import { Upload as UploadIcon } from '../../icons/upload';
import { Search as SearchIcon } from '../../icons/search';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AddNewWarehouse from "./add-new-warehouse";

interface Props {
    setWarehouseToBeEdited: any
    warehouseToBeEdited: any
    setOpen: any
    open: boolean
    setEdit: any
    edit: boolean
    dispatch: any
    onSearch: any
}

export const WarehouseToolbar:
    React.FC<Props> = ({
        setWarehouseToBeEdited,
        warehouseToBeEdited,
        setOpen,
        open,
        setEdit,
        edit,
        dispatch,
        onSearch
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
                                <AddNewWarehouse
                                    setWarehouseToBeEdited={setWarehouseToBeEdited}
                                    warehouseToBeEdited={warehouseToBeEdited}
                                    setOpen={setOpen}
                                    open={open}
                                    setEdit={setEdit}
                                    edit={edit}
                                    dispatch={dispatch}
                                />
                                {/* <Button
                                startIcon={(<UploadIcon fontSize="small" />)}
                                sx={{ mr: 1 }}
                            >
                                Import
                            </Button> */}
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
                                    placeholder="Search warehouses"

                                />
                            </Box>
                            <Box sx={{ m: 1 }}>
                                <Chip
                                    icon={
                                        <EmojiObjectsIcon
                                        />}
                                    label="Tip: Search by entering a keyword from the table"
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </>
        );
    }