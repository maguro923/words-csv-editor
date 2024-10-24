import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='icon'
          type='image/png'
          sizes='512x512'
          href='/icons/icon-512x512.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/icons/icon-192x192.png'
        />
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body className='prose'>{children}</body>
    </html>
  );
}
