"use client";

import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  // Provider simples sem MUI para evitar erros de hidratação
  // O tema está todo em TailwindCSS + Shadcn UI
  return <>{children}</>;
}

