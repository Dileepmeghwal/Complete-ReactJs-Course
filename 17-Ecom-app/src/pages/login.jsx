import { Helmet } from 'react-helmet-async';
import { AuthProvider, useAuth } from 'src/hooks/AuthContext';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <LoginView />
    </>
  );
}
