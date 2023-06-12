import { DeliveryContractResult } from '@/features/delivery-contract/deliveryContractSlice';
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Tag } from 'antd';
import NextLink from 'next/link';
import dateFormat from 'dateformat';
interface Props {
    deliveryContract: DeliveryContractResult
}

export const DeliveryContractCard:
    React.FC<Props> = ({
        deliveryContract
    }) => {

        return (
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pb: 2
                        }}
                    >
                        <Avatar
                            // src={deliveryContract.Record.buyer}
                            variant="rounded"
                        />
                    </Box>
                    <Typography
                        align="center"
                        gutterBottom
                        variant="h5"
                    >
                        {deliveryContract.Record.buyer}
                    </Typography>
                    <Typography
                        align="center"
                        variant="body1"
                    >
                        <strong>Goal:</strong> {deliveryContract.Record.contractGoal}
                    </Typography>
                    <Typography
                        align="center"
                        variant="body1"
                    >
                        <strong>Remark:</strong> {deliveryContract.Record.BuyerRemark}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pt: 2
                        }}
                    >
                        <Tag
                            color={(deliveryContract.Record.contractStatus === 'REQUESTED' && '#FFB020')
                                || (deliveryContract.Record.contractStatus === 'APPROVED' && '#14B8A6')
                                || (deliveryContract.Record.contractStatus === 'SIGNED' && 'success')
                                || '#D14343'}
                        >
                            {deliveryContract.Record.contractStatus.toUpperCase()}
                        </Tag>
                    </Box>

                </CardContent>
                <Box sx={{ flexGrow: 1 }} />
                <Divider />
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ p: 2 }}
                >
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                    >
                        <SvgIcon
                            color="action"
                            fontSize="small"
                        >
                            <AccessTimeIcon />
                        </SvgIcon>
                        <Typography
                            color="text.secondary"
                            display="inline"
                            variant="body2"
                        >
                            {dateFormat(deliveryContract.Record.startDate, "mmm d, yyyy")} - {dateFormat(deliveryContract.Record.endDate, "mmm d, yyyy")}

                        </Typography>
                    </Stack>
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                    >
                        <NextLink
                            href={`coffee-delivery-contract/detail?id=${deliveryContract.Record.id}`}
                            passHref
                            legacyBehavior
                        >
                            <Button
                                component="a"
                                color="secondary"
                                endIcon={<ArrowRightIcon />}
                                variant="text"
                            >
                                Details
                            </Button>
                        </NextLink>
                    </Stack>
                </Stack>
            </Card>
        );
    };