'use client'

import { Open_Sans } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

const open_sans = Open_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#4e8ce1',
      contrastText: '#fff',
    },
    secondary: {
      main: '#111',
      contrastText: '#fff',
    },
  },
  typography: {
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
    fontFamily: open_sans.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          opacity: 1.0,
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
          ':hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&.MuiInputBase-input': {
            padding: 8,
          },
        },
        root: {
          '&.MuiInputBase-root': {
            borderRadius: 0,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          '&.MuiInputLabel-shrink': {
            top: '0px !important',
          },
        },
        outlined: {
          '&.MuiInputLabel-outlined': {
            top: '-8px',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        contained: {
          '&.MuiFormHelperText-contained': {
            marginLeft: '0px',
          },
        },
      },
    },
  },
})

export default defaultTheme
