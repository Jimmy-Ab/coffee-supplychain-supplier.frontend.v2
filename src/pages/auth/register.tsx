import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Button, CircularProgress, Link, Stack, TextField, Typography } from '@mui/material';
import { AuthLayout } from '@/layout/auth';
import { useState } from 'react';
import axios from 'axios';

const Page = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            submit: null
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            username: Yup
                .string()
                .max(255)
                .required('Username is required'),
            password: Yup
                .string()
                .max(255)
                .min(6)
                .required('Password is required'),
            confirmPassword: Yup
                .string()
                .max(255)
                .min(6)
                .oneOf([Yup.ref('password')], 'Passwords must match')
        }),
        onSubmit: async (values, helpers) => {
            try {
                const user = {
                    username: values.username,
                    email: values.email,
                    password: values.password
                };
                const { data } = await axios.
                    post("https://coffee-supplier.adey-bsm.de/api/auth/register", user);
                    
                router.push('/auth/login');

            } catch (err: any) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);

                setError(err.response.data.error);
                setTimeout(() => {
                    setError("");
                }, 5000);
            }
        }
    });

    return (
        <>
            <Head>
                <title>
                    Register | Adey Supply-Chain
                </title>
            </Head>
            <Box
                sx={{
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
                                Register
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Already have an account?
                                &nbsp;
                                <Link
                                    component={NextLink}
                                    href="/auth/login"
                                    underline="hover"
                                    variant="subtitle2"
                                >
                                    Log in
                                </Link>
                            </Typography>
                        </Stack>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <Stack spacing={3}>
                                <TextField
                                    error={!!(formik.touched.username && formik.errors.username)}
                                    fullWidth
                                    helperText={formik.touched.username && formik.errors.username}
                                    label="Username"
                                    name="username"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                />
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
                                <TextField
                                    error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                                    fullWidth
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    label="confirm Password"
                                    name="confirmPassword"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.confirmPassword}
                                />
                            </Stack>
                            {formik.errors.submit && (
                                <Typography
                                    color="error"
                                    sx={{ mt: 3 }}
                                    variant="body2"
                                >
                                    {formik.errors.submit}
                                </Typography>
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
                                        "Continue"
                                }
                            </Button>
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                component={NextLink}
                                href="/auth/login"
                            >
                                Or Login
                            </Button>
                            <Alert
                                color={error ? "error" : "info"}
                                severity="info"
                                sx={{ mt: 3 }}
                            >
                                {error ?
                                    <div>
                                        {error}
                                    </div>
                                    :

                                    <div>
                                        Your <b>Email</b> should be unique. please provide a unique email address!
                                    </div>
                                }
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
