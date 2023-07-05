import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import React from "react";
import { tokens } from "./Cores";
// mui theme settings
export const themeSettings = (mode: any) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          text: {
            primary: colors.white[100],
            secondary: colors.white[100],
            disabled: colors.white[100],
          },
          primary: {
            main: colors.white[500],
          },
          secondary: {
            main: colors.pink[400],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.primary[600],
            paper: colors.primary[400],
          },
          error:{
            main: colors.redAccent[200]
          }
          // divider: colors.white[100]
        }
        : {
          // palette values for light mode
          primary: {
            main: colors.primary[100],
          },
          secondary: {
            main: colors.pink[800],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: "#f6f6f6",
            paper: colors.cinza1[300],
          },
          error:{
            main: colors.redAccent[400]
          }
        }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const themeComponents = (mode: any) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          dataGrid: {
            background: colors.white[900],
            alternancia: colors.grey[500],
          },
          tabelaVenda: {
            background: colors.primary[400],
          },
          login:{
            background: colors.primary[300],
          }
        }
        : {
          dataGrid: {
            background: colors.white[100],
            alternancia: "rgba(235, 235, 235, .7)"

          },
          tabelaVenda: {
            background: colors.cinza1[300],
          },
          login:{
            background: colors.cinza1[500],
          }
        }),
    },
  }
}

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export const useMode = () => {
  var temaCookie = localStorage.getItem("USER_THEME");
  if (temaCookie === "undefined" || temaCookie === "") {
    localStorage.setItem("USER_THEME", 'light');
    temaCookie = 'light';
  }
  const [mode, setMode] = React.useState<string>(temaCookie !== null ? temaCookie : 'light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  if (localStorage.getItem("USER_THEME") !== mode) {
    localStorage.setItem("USER_THEME", mode);
    // setCookie(null, "USER_THEME", mode, { path: '/' });
  }

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode],);
  return { theme, colorMode, mode };
};