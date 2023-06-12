import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Divider,
    Popover,
    Stack,
    Typography
} from '@mui/material';
import { useRouter } from 'next/router'
import { GrowerResult } from "@/features/grower/growerSlice";
import { DeleteGrower, GetAllGrowers } from "@/api/grower";
import Router from 'next/router';
import { getInitials } from '@/utils/get-initials';


function GrowerProfile() {
    const dispatch = useAppDispatch();
    const growers = useAppSelector(state => state.grower.growers.result);
    const loading = useAppSelector(state => state.grower.loading);
    const error = useAppSelector(state => state.grower.error);
    const [selectedGrower, setSelectedGrower] = useState<GrowerResult>();
    const router = useRouter();
    const { id } = router.query;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popOverId = open ? 'simple-popover' : undefined;

    const HandleDelete = async (id: string | undefined) => {
        handleClose();
        await dispatch(DeleteGrower(id));
        Router
            .push('/coffee-growers')
            .catch(console.error);
        await dispatch(GetAllGrowers());
    }

    useEffect(() => {
        setSelectedGrower(growers.find(g => g.Record.id === id));
    }, [selectedGrower])
    return (
        <Card >
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        sx={{
                            height: 64,
                            mb: 2,
                            width: 64
                        }}
                        >
                        {getInitials(selectedGrower?.Record.fullName)}
                      </Avatar>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                        {selectedGrower?.Record.fullName}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="h6"
                    >
                        {selectedGrower?.Record.dateOfBirth}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        {selectedGrower?.Record.farmPlace}
                    </Typography>
                    <Button
                        component='a'
                        href={"https://maps.google.com/maps?q=" + selectedGrower?.Record.latitude + "," + selectedGrower?.Record.longitude + "&hl=en&z=14&amp;"}
                        // onClick={() => ViewMap(warehouse.Key)}
                        target="_blank"
                    >
                        ({selectedGrower?.Record.latitude}, {selectedGrower?.Record.longitude})
                    </Button>

                </Box>
            </CardContent>
            <Divider />
            <Box
                sx={{
                    p: 1
                }}
            >
                {loading ?
                    <Stack
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <CircularProgress
                            color="error"
                        />
                    </Stack>
                    :

                    <Button
                        color="error"
                        fullWidth
                        variant="text"
                        onClick={handleClick}
                    >
                        Delete Grower
                    </Button>


                }
                <Box>
                    <Popover
                        sx={{ p: 2 }}
                        id={popOverId}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >

                        <Typography sx={{ p: 2 }}>Are you sure you want delete the grower?</Typography>
                        <Button
                            color="success"
                            fullWidth
                            variant="text"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="error"
                            fullWidth
                            variant="contained"
                            onClick={() => HandleDelete(selectedGrower?.Record.id)}
                        >
                            Delete
                        </Button>
                    </Popover>

                </Box>
            </Box>
        </Card>
    );
}

export default GrowerProfile;