# Instituto Flor de Cerejeira

Site de portfólio fictício para um instituto de psicologia. O conteúdo, a profissional e o ambiente são ilustrativos; o site não oferece atendimento ou agendamentos reais.

## Executar localmente

Requisitos: Node.js 20.19+ ou 22.12+ e npm (incluído na instalação oficial do Node.js).

```bash
npm install
npm run dev
```

Abra o endereço local exibido no terminal. Para gerar e conferir a versão de produção:

```bash
npm run build
npm run preview
```

O projeto também pode ser usado com pnpm. O build é gerado em `dist/`.

## Tecnologias e acessibilidade

React e Vite compõem a interface; Three.js desenha as pétalas em WebGL. Em dispositivos sem suporte a WebGL, a página continua funcional sem as partículas. A animação respeita a preferência de movimento reduzido do sistema. O conteúdo é responsivo e a navegação funciona por teclado.

## Publicar no GitHub

Crie um repositório público vazio e envie os arquivos deste projeto. Não inclua `node_modules` nem `dist`, que já estão no `.gitignore`. O Vite usa caminhos relativos, permitindo hospedar o build em um subdiretório, como no GitHub Pages de um repositório.

## Imagens e licença

As imagens são ilustrativas, geradas por IA para este projeto. O código está disponível sob a licença MIT; consulte `LICENSE`.


