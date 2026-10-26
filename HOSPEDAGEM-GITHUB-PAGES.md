# Como publicar no GitHub Pages (passo a passo)

Esta pasta (`site-pedras`) já é o site completo. Não precisa instalar nada.

## 1. Criar a conta e o repositório
1. Entre em https://github.com e crie uma conta (ou use a da agência).
2. Clique em **New repository** (botão verde).
3. Nome sugerido: `eduardo-placas` (sem espaços nem acentos).
4. Marque **Public** e clique em **Create repository**.

## 2. Enviar os arquivos (jeito mais simples, sem programar)
1. Na página do repositório, clique em **uploading an existing file**.
2. Arraste **o conteúdo** da pasta `site-pedras`: `index.html`, a pasta `assets`, a pasta `images` e o arquivo `.nojekyll`.
   - Atenção: arraste os arquivos de dentro da pasta, não a pasta `site-pedras` inteira.
3. Clique em **Commit changes**.

## 3. Ligar o GitHub Pages
1. No repositório: **Settings** → **Pages** (menu da esquerda).
2. Em **Build and deployment → Source**: escolha **Deploy from a branch**.
3. **Branch**: `main` e pasta `/ (root)`. Clique em **Save**.
4. Aguarde 1 a 2 minutos. O endereço aparece no topo da mesma página:
   `https://SEU-USUARIO.github.io/eduardo-placas/`

## 4. Atualizações futuras
Para trocar uma foto ou texto: abra o arquivo no GitHub, clique no lápis, edite e confirme em **Commit changes**. O site atualiza sozinho em ~1 minuto.

## 5. Domínio próprio (opcional)
Em **Settings → Pages → Custom domain**, digite o domínio (ex.: `eduardoplacas.com.br`) e aponte o DNS do domínio para o GitHub (o próprio GitHub mostra os registros).

## Onde mudar as informações
- Número do WhatsApp: `assets/main.js`, primeira linha (`WHATSAPP`).
- Textos: `index.html`.
- Fotos: pasta `images` (mantenha os nomes `premium-01.jpg` etc. ou ajuste a galeria em `main.js`).
- Logo definitivo: hoje há um monograma "EP" provisório (classe `mono-ep`). Quando o cliente enviar o logo, trocar no `index.html`.

## Domínio próprio (eduardoplacas.com.br)
1. Verifique se está livre em https://registro.br (busca "eduardoplacas"). Para .com.br é preciso CPF ou CNPJ do titular. Custa em torno de R$ 40 por ano.
2. No painel do Registro.br, em DNS, crie estes registros:
   - 4 registros **A** (nome: `@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 registro **CNAME** (nome: `www`): `SEU-USUARIO.github.io`
3. No GitHub: Settings → Pages → **Custom domain**: `eduardoplacas.com.br` → Save. Quando liberar, marque **Enforce HTTPS**.
4. Leva de alguns minutos até 24 horas para funcionar.
