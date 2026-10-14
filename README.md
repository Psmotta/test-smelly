# Laboratório de Test Smells - Gerenciador de Usuários

Este repositório serve como base para o trabalho prático sobre **Test Smells** na disciplina de Teste de Software. Ele contém uma suíte de testes que, apesar de passar, está repleta de "maus cheiros" (smells) que comprometem sua qualidade, manutenibilidade e eficácia.

## Contexto do Projeto

Imagine que você foi contratado(a) como Engenheiro(a) de Qualidade de Software em uma equipe que está desenvolvendo um serviço de gerenciamento de usuários (`UserService`).

A suíte de testes em `__tests__/userService.smelly.test.js` foi escrita por um desenvolvedor que se concentrou apenas em fazer os testes passarem, sem se preocupar com boas práticas. O resultado é um código de teste frágil, obscuro e difícil de manter.

Sua missão é analisar, diagnosticar e refatorar essa suíte de testes, transformando-a em um exemplo de código de teste limpo e robusto.

## Sua Missão

Seu trabalho será dividido em três etapas principais:

1.  **Analisar:** Identificar manualmente e com a ajuda de ferramentas de análise estática (ESLint) os diferentes Test Smells presentes no código.
2.  **Refatorar:** Reescrever os testes em um novo arquivo (`userService.clean.test.js`), corrigindo os problemas encontrados e aplicando as melhores práticas, como o padrão **Arrange, Act, Assert (AAA)**.
3.  **Validar:** Provar que a refatoração foi bem-sucedida, garantindo que os novos testes passem, estejam livres de avisos do linter e sejam mais claros e eficazes.

## Como Começar (Setup)

Siga os passos abaixo para preparar seu ambiente de trabalho.

**1. Clone o repositório:**

```bash
git clone [URL_DO_SEU_FORK_DO_REPOSITORIO]
cd test-smelly
```

## Entrega

Trabalho de Pedro de Sousa Motta para a disciplina de Teste de Software.

| Item | Local |
|------|-------|
| Suíte original, sem alterações | `test/userService.smelly.test.js` |
| Suíte refatorada | `__tests__/userService.clean.test.js` |
| Configuração do ESLint | `.eslintrc.json` (ESLint 8.57 + `eslint-plugin-jest`) |
| Relatório | `RELATORIO.pdf` |

O enunciado pede o arquivo limpo em `__tests__/`. O original continua em `test/`, onde o repositório base o colocou.

Para validar:

```bash
npm install
npm test                                        # 2 suítes: 18 testes passam e 1 é ignorado (o test.skip do original)
npx eslint __tests__/userService.clean.test.js  # nenhum erro ou aviso
npm run lint                                    # mostra os 6 problemas do arquivo original
```
