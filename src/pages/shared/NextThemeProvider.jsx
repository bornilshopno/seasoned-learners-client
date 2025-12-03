// src/providers/NextThemesProvider.tsx

import { ThemeProvider } from "next-themes";


export default function NextThemeProvider({
  children,
  ...props
}) {
  return (
    <ThemeProvider
      attribute="class"               // important – shadcn uses class, not data-theme
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange      // removes flash
      {...props}
    >
      {children}
    </ThemeProvider>
  );
}