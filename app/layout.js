import "./vanita.css";
import StageScale from "./components/StageScale";

export const metadata = {
  title: "VANITA ROLEPLAY",
  description: "VANITA ROLEPLAY — Prototype Hub",
};

export const viewport = {
  themeColor: "#FF3155",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&family=Roboto+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StageScale />
        {children}
      </body>
    </html>
  );
}
