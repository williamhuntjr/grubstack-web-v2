import { createTheme } from '@mui/material/styles'
import { Open_Sans } from 'next/font/google'
import { IProperty } from 'common/types'
import { RestaurantProperty } from 'common/constants'
import { getProperty } from './utils'

const open_sans = Open_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export function generateTheme(properties: IProperty[]) {
  const primaryColor = getProperty(properties, RestaurantProperty.PrimaryColor) ?? '#4e8ce1'
  const primaryColorContrast = getProperty(properties, RestaurantProperty.PrimaryColorContrast) ?? '#ffffff'
  const secondaryColor = getProperty(properties, RestaurantProperty.SecondaryColor) ?? '#111111'
  const secondaryColorContrast = getProperty(properties, RestaurantProperty.SecondaryColorContrast) ?? '#ffffff'

  const dynamicTheme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
        light: primaryColor,
        dark: primaryColor,
        contrastText: primaryColorContrast,
      },
      secondary: {
        main: secondaryColor,
        light: secondaryColor,
        dark: secondaryColor,
        contrastText: secondaryColorContrast,
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
  return dynamicTheme
}
