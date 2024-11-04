'use client'

import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E90FF',
    },
    background: {
      default: '#F7F7F7',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          '&:hover': {
            backgroundColor: '#F5F5F5',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input::placeholder': {
            fontSize: '14px',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#666666',
            },
            '&:hover fieldset': {
              borderColor: '#666666',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#666666',
            },
          },
        },
      },
    },
  },
})

export default theme
