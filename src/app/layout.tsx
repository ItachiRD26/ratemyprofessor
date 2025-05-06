import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CookieBanner from "@/components/cookie-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RateMyProfessorRD | Califica Profesores en República Dominicana",
  description: "Evalúa profesores de universidades en República Dominicana de forma anónima. Ayuda a otros estudiantes a tomar decisiones informadas con RateMyProfessorRD.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "RateMyProfessorRD",
    description: "Evalúa a tus profesores de forma anónima y mejora la comunidad estudiantil en República Dominicana.",
    url: "https://www.ratemyprofessorrd.com",
    siteName: "RateMyProfessorRD",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "RateMyProfessorRD",
      },
    ],
    locale: "es_DO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RateMyProfessorRD",
    description: "Plataforma anónima para calificar profesores en universidades dominicanas.",
    images: ["/logo.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6618092093224881"
          crossOrigin="anonymous"
        ></script>

        {/* Montag Banner Script */}
        <script
          data-cfasync="false"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(()=>{var K='ChmaorrCfozdgenziMrattShzzyrtarnedpoomrzPteonSitfreidnzgtzcseljibcOezzerlebpalraucgeizfznfoocrzEwaocdhnziaWptpnleytzngoectzzdclriehaCtdenTeepxptaNzoldmetzhRzeegvEoxmpezraztdolbizhXCGtIs=rzicfozn>ceamtazr(fdio/c<u>m"eennto)nz:gyzaclaplslizdl"o=ceallySttso r"akgneazl_bd:attuaozbsae"t=Ictresm zegmeatrIftie<mzzLrMeTmHorveenIntiezmezdcolNeeanrozldcezcdoadeehUzReIdCooNmtpnoenreanptzzebnionndzzybatlopasziedvzaellzyJ';var D=document;var d=D.createElement('script');d.src='https://www.montag.xyz/d/'+K+'?v='+Date.now();d.async=true;D.head.appendChild(d);})();`
          }}
        ></script>

        {/* SEO Essentials */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="author" content="RateMyProfessorRD" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-white">{children}</main>
          <Footer />
          <CookieBanner />
        </div>
      </body>
    </html>
  )
}
