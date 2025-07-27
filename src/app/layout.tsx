import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Product Management',
  description: 'Manage your product inventory',
};

import './globals.css';  // Add this line

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PrimeReact CSS */}
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/primereact@latest/resources/themes/lara-light-indigo/theme.css" 
        />
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/primereact@latest/resources/primereact.min.css" 
        />
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/primeicons@latest/primeicons.css" 
        />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const body = document.body;
                body.removeAttribute('cz-shortcut-listen');
                body.removeAttribute('data-new-gr-c-s-check-loaded');
                body.removeAttribute('data-gr-ext-installed');
              });
            `,
          }}
        />
      </head>
      <body className="flex" suppressHydrationWarning>
        <div className="flex-1 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}