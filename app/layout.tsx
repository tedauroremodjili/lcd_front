import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import CursorFollower from "@/components/layout/CursorFollower";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageViewTracker from "@/components/layout/PageViewTracker";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ChatBot from "@/components/layout/ChatBot";
import { getChatbotConfig, getServices, getSettings, getTexts, getWeather } from "@/lib/api";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "ENGOBO GROUP | Importation, Marbrerie, Ébénisterie, Menuiserie",
    template: "%s | ENGOBO GROUP",
  },
  description:
    "ENGOBO GROUP, entreprise multi-services à Pointe-Noire : importation, marbrerie, ébénisterie, menuiserie et commerce général. Réalisations sur mesure et devis gratuit.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [services, settings, chatbot, texts, weather] = await Promise.all([
    getServices(),
    getSettings(),
    getChatbotConfig(),
    getTexts(),
    getWeather(),
  ]);

  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface text-body">
        <script
          // Sets the theme class before first paint to avoid a flash of the
          // wrong theme. Kept inline and tiny on purpose.
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();",
          }}
        />
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important;clip-path:none!important}.split-inner{transform:none!important}"}</style>
        </noscript>
        <ScrollProgress />
        <CursorFollower />
        <Header services={services} settings={settings} texts={texts} weather={weather} />
        <main className="flex-1">{children}</main>
        <Footer services={services} settings={settings} texts={texts} />
        {/* Hidden when the back-end is unreachable: the widget has built-in replies. */}
        {chatbot && <ChatBot settings={settings} services={services} config={chatbot} />}
        <PageViewTracker />
      </body>
    </html>
  );
}
