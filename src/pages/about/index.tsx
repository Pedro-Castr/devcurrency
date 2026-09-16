import { BsGithub, BsLinkedin } from "react-icons/bs";

import styles from "./about.module.css";

export function About() {
  const techStack = [
    {
      name: "React",
      description: "Biblioteca base da interface, com componentes e hooks.",
    },
    {
      name: "TypeScript",
      description: "Tipagem estática nas props, estados e respostas da API.",
    },
    {
      name: "Vite",
      description: "Build e servidor de desenvolvimento do projeto.",
    },
    {
      name: "React Router",
      description: "Rotas, layout compartilhado e navegação entre páginas.",
    },
    {
      name: "CSS Modules",
      description:
        "Estilos com escopo por componente, sem conflito de classes.",
    },
    {
      name: "BRAPI",
      description: "API pública com os dados de mercado da B3.",
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Sobre o DevCurrency</h1>
        <p className={styles.lede}>
          Um painel de ações e fundos imobiliários que começou como um exercício
          de curso e evoluiu para uma fonte de testes e aprendizado.
        </p>
      </header>

      <article className={styles.article}>
        <section>
          <h2 className={styles.sectionTitle}>De onde veio a ideia?</h2>
          <p className={styles.text}>
            O DevCurrency surgiu no contexto do curso{" "}
            <strong>
              <a href="https://sujeitoprogramador.com/" target="_blank">
                Sujeito Programador
              </a>
            </strong>
            , como atividade prática para consolidar conceitos de React. A
            primeira versão era bem simples: uma única tela com uma tabela e
            alguns registros fornecidos por uma API chamada{" "}
            <strong>
              <a href="https://coincap.io/" target="_blank">
                CoinCap
              </a>
            </strong>
            .
          </p>
          <p className={styles.text}>
            Ao terminar a implementação completa do projeto, decidi que seria um
            bom desafio deixá-lo com a minha cara. Para isso, comecei a aplicar
            conceitos que já havia aprendido e a estudar novas features que
            tinha curiosidade em explorar, como modo escuro/claro, uso mais
            avançado de API, paginação, novas formas de componentização, hooks
            personalizados, entre outros.
          </p>
        </section>

        <section>
          <p className={styles.text}>
            Esse projeto acabou se tornando um marco pessoal por reunir várias
            coisas que eu nunca tinha feito em um cenário real. Foi nele que,
            pela primeira vez, pratiquei componentização de verdade: peguei uma
            tela que fazia tudo e a dividi em partes menores, cada uma com uma
            responsabilidade clara, conectadas por props — sem que cada
            componente mantivesse um estado que não lhe pertence. Usei
            TypeScript de ponta a ponta para tipar todo o tráfego de dados,
            garantindo que eu soubesse exatamente o retorno esperado de cada
            parte.
          </p>
          <p className={styles.text}>
            Também foi neste projeto que implementei, pela primeira vez, um
            sistema de troca de tema (claro/escuro) de fato, alinhando o estado
            do React aos atributos do DOM e garantindo persistência no
            localStorage. Outras novidades foram a paginação controlada, o
            autocomplete com debounce e a extensão de um endpoint de listagem
            simples para fornecer dados muito mais completos de cotação
            individual.
          </p>
          <p className={styles.text}>
            Usei as Issues do GitHub para me orientar sobre quais implementações
            eu deveria fazer e para ajudar a gerar ideias de novas features.
            Além disso, implementei testes reais para garantir que tudo funcione
            como deve e evitar qualquer retrocesso.
          </p>
        </section>

        <section className={styles.techSection}>
          <h2 className={styles.sectionTitle}>Tecnologias</h2>

          <ul className={styles.techGrid}>
            {techStack.map((tech) => (
              <li key={tech.name} className={styles.techItem}>
                <strong className={styles.techName}>{tech.name}</strong>
                <span className={styles.techDescription}>
                  {tech.description}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>Sobre os dados</h2>
          <p className={styles.text}>
            Todas as cotações, variações e indicadores exibidos aqui têm origem
            na brapi.dev, uma API gratuita e open-source para o mercado
            financeiro brasileiro. O DevCurrency é um projeto de estudo — não
            constitui fonte oficial de dados e não deve servir como única base
            para decisões de investimento.
          </p>
        </section>
      </article>

      <footer className={styles.contact}>
        <a
          href="https://github.com/Pedro-Castr"
          target="_blank"
          rel="noreferrer"
          className={styles.contactLink}
        >
          <BsGithub size={20} />
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/pedro-castr/"
          target="_blank"
          rel="noreferrer"
          className={styles.contactLink}
        >
          <BsLinkedin size={20} />
          LinkedIn
        </a>
      </footer>
    </div>
  );
}
