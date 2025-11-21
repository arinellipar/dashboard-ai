"use client";

import { createTheme } from "@mui/material/styles";

export const futuristicTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9333ea", // Purple 600
      light: "#a855f7", // Purple 500
      dark: "#7e22ce", // Purple 700
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3b82f6", // Blue 600
      light: "#60a5fa", // Blue 400
      dark: "#2563eb", // Blue 700
      contrastText: "#ffffff",
    },
    error: {
      main: "#dc2626", // Red 600
      light: "#ef4444", // Red 500
      dark: "#b91c1c", // Red 700
    },
    success: {
      main: "#059669", // Emerald 600
      light: "#10b981", // Emerald 500
      dark: "#047857", // Emerald 700
    },
    background: {
      default: "#0f172a", // Slate 900
      paper: "#1e293b", // Slate 800
    },
    text: {
      primary: "#f1f5f9", // Slate 100
      secondary: "#94a3b8", // Slate 400
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          fontWeight: 500,
          boxShadow: "0 4px 14px 0 rgba(147, 51, 234, 0.25)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 6px 20px 0 rgba(147, 51, 234, 0.4)",
            transform: "translateY(-2px)",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(148, 163, 184, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "rgba(15, 23, 42, 0.5)",
            "& fieldset": {
              borderColor: "rgba(148, 163, 184, 0.3)",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "rgba(147, 51, 234, 0.5)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#9333ea",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          fontWeight: 500,
        },
        filled: {
          background: "linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)",
        },
      },
    },
  },
});

