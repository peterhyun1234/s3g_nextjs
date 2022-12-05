import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from 'styled-components'
import theme from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
