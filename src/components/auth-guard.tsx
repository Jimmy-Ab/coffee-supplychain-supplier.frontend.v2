import { Children, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Router from 'next/router';

export const AuthGuard = (props: any) => {
  const { children } = props;
  const [error, setError] = useState("");

  useEffect(() => {
    const CheckToken = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token === null) {
          Router
            .push('/auth/login')
            .catch(console.error);
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login!");
        Router
          .push('/growers')
          .catch(console.error);
      }
    };

    CheckToken();
  }, []);

  const LogoutHandler = () => {
    localStorage.removeItem("authToken");

  };

  return (
    error ? <span className="error-message">{error}</span> :
      <>
        {children}
      </>
  )
}

AuthGuard.propTypes = {
  children: PropTypes.node
};
