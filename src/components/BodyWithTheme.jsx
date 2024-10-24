'use client'

import { useTheme } from "@/context/ThemeContext";

export default function BodyWithTheme({ children }) {
  const { theme } = useTheme();

  return (
    <body className={theme === 'dark' ? 'dark' : ''}>
      {children}
    </body>
  );
}
