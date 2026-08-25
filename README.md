# STAR — Landing Page

Landing page do STAR (SaaS de análise alimentar por IA), feita em React + Vite + Tailwind CSS.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (geralmente `http://localhost:5173`).

## Build de produção

```bash
npm run build
```

Gera a pasta `dist/` — é esse conteúdo que precisa ir para o GitHub Pages (ou qualquer outro host estático).

## Publicar no GitHub Pages

Este projeto já vem com um workflow em `.github/workflows/deploy.yml` que builda e publica
automaticamente a cada push na branch `main`.

Passos:

1. Crie um repositório no GitHub e suba este projeto:
   ```bash
   git init
   git add .
   git commit -m "STAR landing page"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
   git push -u origin main
   ```
2. No repositório, vá em **Settings → Pages** e, em "Build and deployment", selecione
   **Source: GitHub Actions**.
3. O workflow vai rodar automaticamente e publicar o site. A URL padrão será
   `https://SEU_USUARIO.github.io/SEU_REPO/`.

## Domínio próprio

1. Crie um arquivo `CNAME` dentro da pasta `public/` com o seu domínio, por exemplo:
   ```
   www.seudominio.com
   ```
   Ele será copiado automaticamente para o `dist/` no build.
2. No seu provedor de DNS:
   - Para um subdomínio (`www.seudominio.com`): crie um registro **CNAME** apontando para
     `SEU_USUARIO.github.io`.
   - Para o domínio raiz (`seudominio.com`): crie 4 registros **A** apontando para:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
3. Em **Settings → Pages → Custom domain**, digite seu domínio e salve. Marque
   "Enforce HTTPS" assim que o certificado estiver disponível (pode levar alguns minutos).
4. Se você **não** for usar domínio próprio e vai publicar direto em
   `usuario.github.io/repo`, edite `vite.config.js` e troque `base: "/"` por
   `base: "/nome-do-repo/"` antes de buildar.

## Estrutura

- `src/App.jsx` — a landing page inteira (Hero, Como funciona, Demo de IA, Benefícios,
  Dashboard preview, Pricing, FAQ, CTA final, Footer).
- `tailwind.config.js` — paleta e tipografia da marca STAR já configuradas.
