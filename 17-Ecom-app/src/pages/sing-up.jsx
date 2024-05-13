import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections/register';

// ----------------------------------------------------------------------

export default function SignupPage() {
  return (
    <>
      <Helmet>
        <title> Sign Up | Minimal UI </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
