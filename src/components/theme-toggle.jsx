// "use client";
// import { useContext } from "react";
// import { ThemeContext } from "@/context/ThemeContext";

// const ThemeToggle = () => {
//   const { theme, toggleTheme } = useContext(ThemeContext);

//   return (
//     <button
//       onClick={toggleTheme}
//       className="ml-3 px-2 rounded-md text-gray-900 dark:text-[#D1D5DA]"
//     >
//       {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
//     </button>
//   );
// };

// export default ThemeToggle; 



// src/components/ThemeToggle.tsx
'use client'

import { useTheme } from '@/context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  )
}