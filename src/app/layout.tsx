import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { TimezoneInitializer } from "@/components/TimezoneInitializer";
import { createServerSupabaseClient } from "@/lib/supabase";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = createServerSupabaseClient()
    const { data: settings } = await supabase
      .from('tenant_settings')
      .select('name, description')
      .limit(1)
      .single()

    const churchName = settings?.name || 'DOCM Church'
    const churchDescription = settings?.description || 'Join our church family and discover your purpose in Christ.'

    return {
      title: `${churchName} - Welcome Home`,
      description: churchDescription,
      icons: {
        icon: '/icon',
        apple: '/apple-icon',
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: "DOCM Church - Welcome Home",
      description: "Join our church family and discover your purpose in Christ.",
      icons: {
        icon: '/icon',
        apple: '/apple-icon',
      },
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <TimezoneInitializer />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
