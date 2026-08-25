import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Se for publicar em um domínio próprio (custom domain via CNAME), deixe base como "/".
// Se for publicar em usuario.github.io/nome-do-repo SEM domínio próprio, troque para "/nome-do-repo/".
export default defineConfig({
  plugins: [react()],
  base: "/",
});
