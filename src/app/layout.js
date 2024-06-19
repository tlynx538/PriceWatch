import 'bootstrap/dist/css/bootstrap.css';
export const metadata = {
  title: 'PriceWatch',
  description: 'A Simple Tool to check latest rates on Capacitors, Motors and other Items',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
