import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    FormHelperText,
    Link,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material';
import { AuthLayout } from '@/layout/auth';
import axios from 'axios';
import { notification } from 'antd';
import Router from 'next/router';

const Page = () => {
    const router = useRouter();
    // const auth = useAuth();
    const [error, setError] = useState("");
    const formik = useFormik({
        initialValues: {
            email: 'test@adey-meselesh.de',
            password: 'Password123!',
            submit: null
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .max(255)
                .required('username is required'),
            password: Yup
                .string()
                .max(255)
                .min(6)
                .required('Password is required')
        }),
        onSubmit: async (values: any, helpers: any) => {
            try {
                const user = {
                    email: values.email,
                    password: values.password
                };
                const { data } = await axios.
                    post("https://coffee-supplier.adey-bsm.de/api/auth/login", user);
                router.push('/');

                localStorage.setItem("email", values.email);
                localStorage.setItem("timeout", Date.now().toString());
                localStorage.setItem("authToken", data.token);
                setTimeout(() => {
                    handleSignOut();
                }, 28800000);
            } catch (error: any) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: error.message });
                helpers.setSubmitting(false);

                setError(error.response.data.error);


            }
        }
    });

    const handleSignOut = async () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("email");
        localStorage.removeItem("timeout");

        Router
            .push('/auth/login')
            .catch(console.error);
    };

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            router.push('/');

            // notification.open({
            //     message: 'Info',
            //     description: 'you are already logged in!',
            //     placement: 'bottomRight'
            // });
        }
    })

    return (
        <>
            <Head>
                <title>
                    Login | Adey-Supply Chain
                </title>
            </Head>
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <div>
                        <Stack
                            spacing={1}
                            sx={{ mb: 3 }}
                        >
                            <Typography variant="h4">
                                Authentication
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Don&apos;t have an account?
                                &nbsp;
                                <Link
                                    component={NextLink}
                                    href="/auth/register"
                                    underline="hover"
                                    variant="subtitle2"
                                >
                                    Register
                                </Link>
                            </Typography>
                        </Stack>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <Stack spacing={3}>
                                <TextField
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    fullWidth
                                    helperText={formik.touched.email && formik.errors.email}
                                    label="Email Address"
                                    name="email"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="email"
                                    value={formik.values.email}
                                />
                                <TextField
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    fullWidth
                                    helperText={formik.touched.password && formik.errors.password}
                                    label="Password"
                                    name="password"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.password}
                                />
                            </Stack>
                            <FormHelperText sx={{ mt: 1 }}>
                                Please provide correct credentials!
                            </FormHelperText>
                            {formik.errors.submit && (
                                <Alert
                                    color="error"
                                    severity="error"
                                    sx={{ mt: 3 }}
                                >
                                    {formik.errors.submit}
                                </Alert>
                            )}
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                                disabled={formik.isSubmitting}
                            >
                                {
                                    formik.isSubmitting ?
                                        <CircularProgress />
                                        :
                                        "Sign In"
                                }
                            </Button>
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                component={NextLink}
                                href="/auth/register"
                            >
                                Or Register
                            </Button>
                            <Alert
                                color={error ? "error" : "info"}
                                severity="info"
                                sx={{ mt: 3 }}
                            >

                                <div>
                                    You can use <b>test@adey-meselesh.de</b> and password <b>Password123!</b> for test
                                </div>

                            </Alert>
                        </form>
                    </div>
                </Box>
            </Box>
        </>
    );
};

Page.getLayout = (page: any) => (
    <AuthLayout>
        {page}
    </AuthLayout>
);

export default Page;
