import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '@/styles/globals.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Management',
  description: 'Manage your product inventory',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove problematic attributes added by extensions
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