# 💜 Amethyst — Controle Financeiro

Aplicativo pessoal de controle de gastos. **100% privado**: todos os dados ficam apenas no seu navegador (nada vai para servidor nenhum). Visual violeta dark premium, dashboards interativos e cálculos que se atualizam em tempo real.

> App de página única (`index.html`), sem build, sem dependências de servidor — igual ao padrão do IronFit. Funciona aberto direto do arquivo ou hospedado no GitHub Pages.

---

## ✨ O que ele faz

| Recurso | Detalhe |
|---|---|
| 💸 **Lançar gastos** | Valor, descrição, data, categoria, meio de pagamento, banco, observações |
| 💳 **Meios de pagamento** | Pix, Crédito, Débito, Dinheiro, Boleto |
| 🔁 **Recorrências** | Únicas, semanais, mensais ou anuais (com data de término opcional) |
| 🧾 **Parcelamento de cartão** | Compra parcelada em até 24x — cada parcela cai no mês certo da fatura |
| 🏦 **Bancos editáveis** | Adicione/edite/remova bancos e cartões (com dia de fechamento e vencimento) |
| 🏷️ **Categorias editáveis** | Crie suas próprias categorias com cor e ícone |
| 📊 **Dashboards** | Total do mês, por categoria (rosca), por meio de pagamento, por banco, evolução 12 meses, comparativo mês a mês, heatmap diário |
| 🧮 **Fatura projetada** | Projeção da fatura de cada cartão de crédito por mês |
| 🔐 **PIN de acesso** | Bloqueio por PIN (hash SHA-256) — só você abre o app |
| 💾 **Backup** | Exportar/importar JSON e exportar CSV |
| 🌗 **Tema** | Escuro (padrão) e claro |
| 📱 **Responsivo** | Sidebar no desktop, bottom-nav + botão flutuante no celular |

---

## 🔒 Sobre privacidade ("só eu tenho acesso")

- **Os dados nunca saem do seu navegador.** Tudo é gravado em `localStorage` — não há banco de dados nem nuvem.
- O **PIN** impede que alguém abra o app neste navegador. Defina em **Configurações → Segurança**.
- O **código** do site é público no GitHub (necessário para o GitHub Pages gratuito), mas **os seus números não** — eles existem só no seu aparelho.
- Use **Configurações → Exportar backup (JSON)** de vez em quando para não perder seus dados.

> Importante: como os dados ficam no navegador, se você limpar os dados do navegador ou trocar de aparelho, precisa importar um backup. Para acessar os mesmos dados em vários aparelhos, exporte/importe o JSON.

---

## 🚀 Como publicar no GitHub Pages (link online)

1. Crie um repositório novo no GitHub (ex.: `financas`) — pode ser **público**.
2. Suba o arquivo `index.html` (e este `README.md`) para o repositório.
3. No GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
4. Escolha **Branch: `main`** / pasta **`/ (root)`** e salve.
5. Aguarde ~1 minuto. Seu app estará em:
   `https://SEU_USUARIO.github.io/financas/`
6. Abra o link, vá em **Configurações → Segurança** e defina seu PIN.

### Pelo terminal (Git)
```bash
cd FinancasRepo
git add .
git commit -m "Amethyst - controle financeiro"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/financas.git
git push -u origin main
```
Depois é só ativar o Pages (passos 3–5 acima).

---

## 📲 Instalar como app no celular (PWA)

O app é um **PWA** — vira um aplicativo de verdade na tela inicial, sem loja de apps:

- **Android (Chrome):** abra o link → aparece o aviso **"Instalar no celular"** (ou menu ⋮ → *Instalar app / Adicionar à tela inicial*). Pronto: ícone na tela inicial, abre em **tela cheia** e funciona **offline**.
- **iPhone (Safari):** abra o link → toque em **Compartilhar** → **"Adicionar à Tela de Início"**.

Depois de instalado, ele abre como qualquer app, sem barra de navegador. Os dados continuam só no seu aparelho.

> Como os dados ficam por aparelho, celular e computador têm bases separadas. Para usar os mesmos dados nos dois, use **Exportar/Importar backup (JSON)** — ou peça pra ativarmos sincronização em nuvem privada.

## 🖥️ Rodar localmente

Basta **abrir o `index.html`** com duplo clique no navegador. Não precisa de servidor.
(Opcional, para servir numa porta: `python -m http.server 8080` dentro da pasta.)

---

## 🧱 Stack

HTML + CSS + JavaScript puro (sem framework) · [Chart.js](https://www.chartjs.org/) para gráficos · [Lucide](https://lucide.dev/) para ícones · `localStorage` para persistência.

Fontes: Inter + Space Grotesk · Paleta violeta dark "Amethyst".
