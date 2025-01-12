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
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: 'black',
          height: 1,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#999999',
          fontSize: 13.5,
          width: '50%',
          fontWeight: 'bold',
          '&.Mui-selected': {
            color: 'black',
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'white',
          },
          '&.Mui-selected': {
            backgroundColor: 'white',
            color: '#1E90FF',
            '& .MuiListItemIcon-root': {
              color: '#1E90FF',
            },
            '&:hover': {
              backgroundColor: 'white',
            },
          },
        },
      },
    },
  },
})

export default theme
