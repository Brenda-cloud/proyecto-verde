import { useState, useEffect } from 'react'
import { supabase } from 'src/supabase/supabaseClient'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const [session, setSession] = useState(null)


  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmmail, setErrorEmm] = useState(null);
  const [errorPass, setErrorPass] = useState(null);

  const [error, setError] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // Verificamos el correo electrónico
    if (name === 'email') {
      const isEmailValid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/.test(value);
      if (isEmailValid) {
        setEmail(value);
        setErrorEmm(null); // Limpiamos cualquier error anterior
      } else {
        setErrorEmm('El correo electrónico no tiene el formato correcto.');
      }
    } else if (name === 'password') {
      // Verificamos la contraseña (mínimo 8 caracteres)
      if (value.length < 8) {
        setErrorPass('La contraseña debe tener al menos 8 caracteres.');
      } else {
        setPassword(value);
        setErrorPass(null); // Limpiamos cualquier error anterior
      }
    }
  };
  
  console.log(email);
  console.log(password);
  
  const handleClick = async (event) => {
    event.preventDefault();
    const { data } = await supabase
      .from('profiles')
      // .select('id,updated_at,username,avatar_url,website,telefono,email')
      .select('id,username,avatar_url,email')
      .ilike('email', email)
      .ilike('password', password)
      .maybeSingle();

    console.log(data);
    // router.push('/');
    if (data) {
      // Guardamos el objeto de usuario en el localStorage
      localStorage.setItem('user', JSON.stringify(data));
  
      // Redireccionamos al usuario a la página principal
      router.push('/');
    }    
  };
  // async function signInWithEmail(emails, passwords) {
   
  // }
  
  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email"       error={errorEmmail} onChange={handleChange}  label="Dirección de correo electrónico" />

        <TextField
         
          name="password"
          error={errorPass}
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange} 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
          <br />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Iniciar
      </LoadingButton>
    </>
  );

  return (
    
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Iniciar sesión en Chojña Pacha</Typography>
          <br/>  
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
