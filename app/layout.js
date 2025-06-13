'use client';
import Script from 'next/script';
import './globals.css';
import Wrapper from '@/app/rootWrapper';
import { ThemeProvider } from '@material-tailwind/react';
import { SnackbarProvider } from 'notistack';
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <link rel='icon' href='/assets/icons/logo.svg' type='image/svg+xml' />
      <title>Alluneed Marketing</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <body>
        <SnackbarProvider>
          <ThemeProvider>
            <Wrapper>{children}</Wrapper>
          </ThemeProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
