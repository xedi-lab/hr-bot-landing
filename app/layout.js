import "./globals.css";

export const metadata = {
  title: "HR-Bot — Умный учёт рабочего времени",
  description: "Telegram Mini App для управления сменами, расчёта зарплат и автоматических уведомлений. Для малого и среднего бизнеса.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
