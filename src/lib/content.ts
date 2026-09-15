// ============================================================
// ALGACORE — structured site content (PT default + EN)
// House rule: no em dashes (—) or en dashes (–) anywhere in page copy, both
// languages. Plain hyphens are fine in compound words and numeric ranges only.
//
// Legal posture: Algacore is a project in formation. No legal entity, no CNPJ,
// no INPI filing, no plant in operation, no product for sale. Every claim about
// productive capacity is written as project or target, never as present fact.
// See CLAUDE.md ("Postura jurídica") before editing any of this.
// ============================================================
import type { Lang } from "@/i18n/config";

export interface LegalDoc {
  title: string;
  updated: string;
  lede?: string;
  sections: { title: string; body: string[] }[];
  back: string;
}

export interface SiteContent {
  meta: { title: string; desc: string };
  a11y: { skip: string };
  nav: { team: string; contact: string };
  hero: {
    title: string; // may contain <br> and <em>
    sub: string;
    ctaInvest: string;
    ctaPartner: string;
    proof: string[];
  };
  band: { tagline: string };
  market: {
    eyebrow: string;
    title: string;
    lede: string;
    points: { title: string; body: string }[];
  };
  vision: {
    eyebrow: string;
    title: string;
    p1: string; // contains <em>
    process: string;
    stages: [string, string, string];
    flowEyebrow: string;
    flowNote: [string, string, string];
    c1title: string;
    c1body: string;
    c2title: string;
    c2body: string;
  };
  approach: {
    eyebrow: string;
    title: string;
    cards: { title: string; body: string }[];
    compareTitle: string;
    compareLede: string;
    pondAlt: string;
    pondTag: string;
    pondLabel: string;
    pond: [string, string, string];
    pbrAlt: string;
    pbrTag: string;
    pbrLabel: string;
    pbr: [string, string, string];
  };
  science: {
    eyebrow: string;
    title: string;
    stat1: string; // contains <em>
    stat2num: string;
    stat2: string;
    stat3num: string;
    stat3: string;

    accent: string;
    sig: {
      eyebrow: string;
      title: string;
      body: string;
      alt: string;
      peakLabel: string;
      rows: { k: string; v: string; note: string }[];
    };
  };
  path: {
    eyebrow: string;
    title: string;
    steps: { status: string; title: string; body: string }[];
  };
  team: {
    eyebrow: string;
    title: string;
    lede: string;
    members: {
      name: string;
      photo: string;
      role: string;
      cred: string;
      bio: string;
      mail: string;
    }[];
  };
  connect: {
    eyebrow: string;
    title: string;
    lede: string;
    investTitle: string;
    investBody: string;
    investCta: string;
    partnerTitle: string;
    partnerBody: string;
    partnerCta: string;
    disclaimer: string;
  };
  form: {
    interest: string;
    optInvestor: string;
    optPartner: string;
    optOther: string;
    name: string;
    company: string;
    email: string;
    message: string;
    ack: string;
    privacyNote: string;
    privacyLink: string;
    send: string;
    sending: string;
    confirm: string;
    error: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    lede: string;
    items: { q: string; a: string }[];
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  footer: { copy: string; mail: string; legal: string; privacy: string };
  legalPage: LegalDoc;
  privacyPage: LegalDoc;
  langToggleLabel: string;
}

const pt: SiteContent = {
  meta: {
    title: "Algacore",
    desc: "Algacore é um projeto de biotecnologia B2B em formação, desenvolvendo o cultivo de spirulina em fotobiorreatores fechados para extração de ficocianina de alto grau e rastreável no Brasil.",
  },
  a11y: { skip: "Pular para o conteúdo" },
  nav: { team: "Quem somos", contact: "Contato" },
  hero: {
    title: "Construindo o futuro<br>da <em>ficocianina</em>",
    sub: "Estamos desenvolvendo o cultivo de spirulina em fotobiorreatores fechados, em escala industrial, para extrair ficocianina de alto grau.",
    ctaInvest: "Para investidores",
    ctaPartner: "Para parceiros",
    proof: ["Cultivo fechado", "Rastreabilidade por lote", "Produzido no Brasil"],
  },
  band: {
    tagline:
      "Um projeto de biotecnologia B2B em constituição, desenvolvendo a tecnologia para produzir ficocianina de alto grau e rastreável em escala, com o padrão farmacêutico como objetivo final.",
  },
  market: {
    eyebrow: "Por que agora",
    title: "O momento da ficocianina",
    lede: "Vários movimentos de mercado convergem para o mesmo ponto, e todos pedem um azul natural, puro e rastreável.",
    points: [
      {
        title: "Pressão sobre sintéticos",
        body: "Corantes azuis sintéticos derivados de petróleo enfrentam escrutínio regulatório crescente em diversos mercados.",
      },
      {
        title: "Demanda por clean-label",
        body: "Alimentos, bebidas e cosméticos migram para ingredientes de origem natural e clean-label.",
      },
      {
        title: "O azul natural é raro",
        body: "Existem poucas fontes naturais de um azul estável e solúvel em água. A ficocianina é uma delas.",
      },
      {
        title: "Tração nas ciências da vida",
        body: "Cresce o interesse por ficocianina de alta pureza em aplicações analíticas e biomédicas.",
      },
    ],
  },
  vision: {
    eyebrow: "A ambição",
    title: "Uma molécula, conduzida rumo ao padrão farmacêutico",
    p1: "A <em>ficocianina</em> é o pigmento-proteína azul da spirulina, um corante de origem natural e clean-label, valorizado em alimentos, cosméticos e, cada vez mais, nas ciências da vida. Quase tudo que chega ao mercado hoje é grau alimentício. Estamos construindo o processo para entregá-la em pureza farmacêutica, em escala industrial.",
    process: "Do cultivo à extração",
    stages: ["Fotobiorreator fechado", "Biomassa de spirulina", "Ficocianina"],
    flowEyebrow: "O processo",
    flowNote: [
      "Luz, CO2 e temperatura sob controle",
      "Colhida e concentrada, lote a lote",
      "Extraída e purificada",
    ],
    c1title: "Por que ficocianina",
    c1body:
      "O azul é uma das cores mais raras na natureza, e a indústria recorreu por décadas a corantes sintéticos derivados de petróleo, hoje sob pressão regulatória crescente. A ficocianina é um azul de origem natural, solúvel em água, reconhecido como corante seguro por agências como ANVISA, FDA e União Europeia.",
    c2title: "Por que grau farmacêutico",
    c2body:
      "O patamar mais exigente e menos atendido. É a pureza e a rastreabilidade que destravam as aplicações de maior valor.",
  },
  approach: {
    eyebrow: "A abordagem",
    title: "Projetado em torno do fotobiorreator fechado, da inoculação à extração",
    cards: [
      {
        title: "Cultivo fechado",
        body: "O desenho prevê a cultura isolada do ambiente externo, com parâmetros mantidos em faixas definidas. Tudo pensado para consistência, da inoculação à colheita.",
      },
      {
        title: "Rastreável por princípio",
        body: "Cada lote pensado para ser documentado de ponta a ponta, do lote acabado de volta ao seu ciclo de cultivo.",
      },
      {
        title: "Pensado para o Brasil",
        body: "A operação é planejada para o Brasil, sob o marco regulatório da ANVISA e perto da demanda sul-americana. Nenhuma licença ou certificação foi obtida até aqui.",
      },
    ],
    compareTitle: "Sistema Fechado",
    compareLede:
      "Um fotobiorreator é um vaso fechado para cultivar microalgas sob condições controladas. A maior parte da spirulina ainda é cultivada em tanques abertos, expostos ao ambiente. Nós seguimos o caminho fechado. A coluna da Algacore descreve a arquitetura pretendida, não uma instalação existente.",
    pondAlt:
      "Ilustração de um tanque aberto tipo raceway visto de cima, um canal oval em volta de uma divisória central, descoberto e exposto ao sol, à poeira e à evaporação.",
    pondTag: "Convencional",
    pondLabel: "Tanque aberto (raceway)",
    pond: [
      "Exposto ao ar livre",
      "Sujeito a contaminação e evaporação",
      "Condições variáveis, lote a lote",
    ],
    pbrAlt:
      "Ilustração de um fotobiorreator tubular: tubos de vidro paralelos e empilhados num circuito serpentina, com a cultura circulando sob um painel de luz controlado, parâmetros definidos no controlador e a ficocianina retirada no topo.",
    pbrTag: "Algacore",
    pbrLabel: "Fotobiorreator tubular",
    pbr: [
      "Alvo: vedação ao ambiente externo",
      "Alvo: luz, CO2, temperatura e fluxo sob controle",
      "Alvo: consistência lote a lote",
    ],
  },
  science: {
    eyebrow: "A ciência",
    title: "Fundamentado na biologia da spirulina",
    stat1: "Teor de proteína da biomassa seca de <em>Arthrospira platensis</em> (aproximado)",
    stat2num: "até ~15%",
    stat2: "Participação da ficocianina na biomassa seca (aproximada)",
    stat3num: "E40+",
    stat3: "Força de cor alvo para os concentrados de ficocianina",
    accent: "O objetivo: pureza rastreável desde o primeiro lote.",
    sig: {
      eyebrow: "Assinatura óptica",
      title: "Identificável pela própria luz",
      body: "A ficocianina absorve luz com um pico característico próximo de 620 nm. É essa assinatura, e a nitidez dela, que separa o grau alimentício do grau farmacêutico.",
      alt: "Curva de absorção da ficocianina, com pico próximo de 620 nanômetros.",
      peakLabel: "≈ 620 nm",
      rows: [
        { k: "Pico de absorção", v: "≈ 620 nm", note: "característico" },
        { k: "Pureza (A620/A280)", v: "alvo ≥ 4,0", note: "grau analítico" },
        { k: "Força de cor", v: "E18 → E40+", note: "concentração" },
        { k: "Rastreabilidade", v: "por lote", note: "ponta a ponta" },
      ],
    },
  },
  path: {
    eyebrow: "O caminho",
    title: "Do processo ao grau farmacêutico",
    steps: [
      {
        status: "Em desenvolvimento",
        title: "Tecnologia de processo",
        body: "Engenharia do cultivo em fotobiorreatores fechados e da extração da ficocianina, junto da constituição da empresa e da captação inicial.",
      },
      {
        status: "Próxima etapa",
        title: "Piloto e qualificação",
        body: "Produção piloto e qualificação rumo às Boas Práticas de Fabricação (ANVISA GMP).",
      },
      {
        status: "Horizonte",
        title: "Grau farmacêutico e E40+",
        body: "Ficocianina de alta pureza e concentrados de alta força de cor (E40 e acima), para as aplicações mais exigentes.",
      },
    ],
  },
  team: {
    eyebrow: "Quem somos",
    title: "Dois fundadores, competências complementares",
    lede: "Antes da Algacore, fomos amigos de infância. Crescemos lado a lado e, anos depois, decidimos construir esta empresa juntos, somando o rigor técnico-científico e operacional à visão comercial e estratégica que um negócio B2B de deep tech exige. É essa confiança de uma vida inteira que sustenta cada decisão que tomamos.",
    members: [
      {
        name: "Raul Paes de Barros",
        photo: "/team/raul.jpg",
        role: "Cofundador · Ciência e operações",
        cred: "Farmacêutico-Bioquímico (FCF-USP) · Administração (FEA-USP)",
        bio: "Lidera o desenvolvimento técnico-científico e a operação do projeto, do desenho do processo de cultivo e extração ao posicionamento da marca.",
        mail: "raulbarros@algacore.com.br",
      },
      {
        name: "Rodrigo Gaspar",
        photo: "/team/rodrigo.jpg",
        role: "Cofundador · Negócios e estratégia",
        cred: "Administrador de Empresas (ESPM-SP)",
        bio: "Conduz as frentes comercial, financeira e estratégica, da modelagem operacional à análise de mercado e ao desenvolvimento de negócios.",
        mail: "rodrigogaspar@algacore.com.br",
      },
    ],
  },
  connect: {
    eyebrow: "Vamos conversar",
    title: "Construa a Algacore conosco",
    lede: "Estamos no começo, em fase de constituição e captação. Queremos conversar com quem acompanha deep tech de perto, seja para investir mais adiante, seja para ajudar a definir a especificação do produto.",
    investTitle: "Investidores",
    investBody:
      "Converse com os fundadores sobre o projeto, a tecnologia e o plano.",
    investCta: "Falar com os fundadores →",
    partnerTitle: "Parceiros & clientes",
    partnerBody:
      "Conte-nos sua aplicação e ajude a definir a especificação.",
    partnerCta: "Falar sobre parceria →",
    disclaimer:
      "Os números e curvas apresentados vêm da literatura científica sobre Arthrospira platensis ou são alvos de projeto. Nenhum deles é resultado analítico da Algacore, e nenhuma ilustração retrata uma instalação nossa. Este site tem caráter exclusivamente informativo. Não constitui oferta, convite ou solicitação de investimento, nem oferta pública de valores mobiliários, e não representa promessa de resultado ou rentabilidade. A Algacore está em fase de constituição, não opera unidade produtiva e não comercializa produtos.",
  },
  form: {
    interest: "Tenho interesse como",
    optInvestor: "Investidor",
    optPartner: "Parceiro / cliente",
    optOther: "Outro",
    name: "Nome",
    company: "Empresa / organização",
    email: "E-mail",
    message: "Mensagem",
    ack: "Entendo que a Algacore está em constituição, que este contato não constitui oferta de investimento nem de produto, e que nenhum fornecimento está disponível hoje.",
    privacyNote: "Usamos seus dados apenas para responder a este contato.",
    privacyLink: "Política de Privacidade",
    send: "Enviar",
    sending: "Enviando...",
    confirm: "Obrigado. Sua mensagem foi recebida e entraremos em contato.",
    error: "Não foi possível enviar agora. Tente novamente ou escreva para contato@algacore.com.br.",
  },
  faq: {
    eyebrow: "Perguntas frequentes",
    title: "O que costumam nos perguntar",
    lede: "Respostas diretas sobre o pigmento, a tecnologia e o estágio real do projeto.",
    items: [
      {
        q: "O que é ficocianina?",
        a: "É uma proteína-pigmento azul produzida pela spirulina. Na literatura, seu pico de absorção fica próximo de 620 nm, na faixa do vermelho-alaranjado, e é isso que dá a cor azul intensa. É usada como corante natural e estudada como insumo para diagnósticos e pesquisa.",
      },
      {
        q: "Por que spirulina?",
        a: "Porque é o organismo mais estudado e mais cultivado para a produção de ficocianina. Segundo a literatura, a ficocianina pode representar uma fração relevante da proteína total da célula em condições adequadas de cultivo, o que a torna a matéria-prima natural para o pigmento.",
      },
      {
        q: "Por que fotobiorreatores fechados, e não tanques abertos?",
        a: "A maior parte da spirulina do mundo cresce em tanques abertos, expostos ao ambiente. Nosso projeto segue o caminho fechado: o objetivo do desenho é manter a cultura isolada do exterior, com luz, temperatura e nutrientes sob controle, buscando pureza e rastreabilidade que o tanque aberto dificilmente entrega.",
      },
      {
        q: "Em que estágio o projeto está?",
        a: "No começo. A Algacore é um projeto em constituição: ainda não há empresa registrada, planta construída nem produto. Os fundadores estão levantando a primeira rodada para dar os primeiros passos formais.",
      },
      {
        q: "Vocês já vendem ficocianina?",
        a: "Não. Não existe produto disponível hoje e nenhum fornecimento pode ser contratado nesta fase. O formulário de contato serve para conversar, não para comprar ou reservar.",
      },
      {
        q: "Qual é o caminho regulatório pretendido?",
        a: "A intenção é seguir as rotas regulatórias aplicáveis no Brasil conforme o uso do pigmento, começando pelos usos de menor complexidade e evoluindo com o projeto. Nenhuma autorização, registro ou certificação foi obtida até aqui, porque ainda não há operação.",
      },
      {
        q: "Como falar com os fundadores?",
        a: "Pelo formulário no fim desta página ou por contato@algacore.com.br.",
      },
    ],
  },
  notFound: {
    title: "Página não encontrada",
    body: "O endereço que você tentou abrir não existe neste site. Pode ter sido digitado errado ou o link estar desatualizado.",
    cta: "Ir para a página inicial",
  },
  footer: {
    copy: "Algacore 2026",
    mail: "contato@algacore.com.br",
    legal: "Aviso legal",
    privacy: "Privacidade",
  },
  legalPage: {
    title: "Aviso legal",
    updated: "Atualizado em setembro de 2026",
    sections: [
      {
        title: "Natureza deste site",
        body: [
          "Este site é material informativo sobre um projeto em desenvolvimento. Ele não vende nada, não recebe pagamentos e não formaliza contratos. O único recurso interativo é um formulário de contato.",
        ],
      },
      {
        title: "Situação societária",
        body: [
          "A Algacore ainda não foi constituída. Não existe sociedade registrada, CNPJ, inscrição estadual ou inscrição municipal vinculada ao nome Algacore. O projeto é conduzido pelos dois fundadores, pessoas físicas, e está em fase de constituição e captação de recursos.",
          "Nenhuma informação deste site deve ser lida como declaração de existência de pessoa jurídica.",
        ],
      },
      {
        title: "Marca",
        body: [
          "O nome Algacore, o símbolo e o logotipo são sinais em uso pelo projeto. Não há registro concedido nem pedido depositado no INPI até esta data. Por isso o site não usa símbolos de marca registrada.",
        ],
      },
      {
        title: "Declarações prospectivas",
        body: [
          "Boa parte do conteúdo descreve planos, alvos de engenharia e intenções. São projeções, não resultados. Elas dependem da constituição da empresa, da captação de recursos, do desenvolvimento técnico e de aprovações regulatórias, e podem mudar ou não se concretizar.",
        ],
      },
      {
        title: "Isto não é oferta de valores mobiliários",
        body: [
          "Nada neste site constitui oferta, convite ou solicitação de investimento, oferta pública de valores mobiliários, ou promessa de retorno ou rentabilidade.",
          "Qualquer conversa com investidores acontece fora deste site, de forma individual e com a documentação apropriada.",
        ],
      },
      {
        title: "Isto não é oferta de produto",
        body: [
          "A Algacore não produz, não comercializa e não fornece ficocianina, spirulina ou qualquer outro produto nesta fase. Não há estoque, catálogo, preço ou prazo de entrega, e nenhum pedido pode ser aceito.",
        ],
      },
      {
        title: "Situação regulatória",
        body: [
          "A Algacore não possui autorização de funcionamento, licença sanitária, registro de produto ou certificação de Boas Práticas de Fabricação perante a ANVISA ou qualquer outra autoridade. As menções a ANVISA e a boas práticas descrevem o caminho regulatório pretendido, não uma situação já alcançada.",
        ],
      },
      {
        title: "Imagens e dados",
        body: [
          "As ilustrações de fotobiorreatores, tanques e curvas de absorção são representações conceituais. Não são fotografias de instalações da Algacore nem resultados analíticos próprios. Os dados de composição da spirulina vêm da literatura científica sobre Arthrospira platensis.",
        ],
      },
      {
        title: "Contato",
        body: ["Dúvidas sobre este aviso: contato@algacore.com.br."],
      },
    ],
    back: "Voltar para a home",
  },
  privacyPage: {
    title: "Política de Privacidade",
    updated: "Atualizado em setembro de 2026",
    lede: "Como tratamos os dados pessoais que você nos envia pelo formulário deste site.",
    sections: [
      {
        title: "Quem é o controlador",
        body: [
          "Enquanto a sociedade não é constituída, os controladores dos dados são os fundadores do projeto, Raul Paes de Barros e Rodrigo Gaspar, pessoas físicas. Quando a empresa for constituída, ela assumirá essa posição e esta política será atualizada.",
        ],
      },
      {
        title: "Quais dados coletamos",
        body: [
          "Apenas o que você digita no formulário de contato: nome, empresa ou organização, e-mail, mensagem, o tipo de interesse selecionado e o idioma da página.",
          "Não usamos cookies de rastreamento, não há ferramenta de analytics e não montamos perfil de navegação.",
        ],
      },
      {
        title: "Para que usamos",
        body: [
          "Para ler sua mensagem e responder. Nada além disso. Não vendemos, não alugamos e não cedemos seus dados a terceiros com finalidade comercial.",
        ],
      },
      {
        title: "Base legal",
        body: [
          "O envio do formulário é um ato voluntário. O tratamento se apoia no consentimento e no legítimo interesse em responder a um contato iniciado por você, nos termos do art. 7º da Lei 13.709/2018 (LGPD).",
        ],
      },
      {
        title: "Com quem os dados são compartilhados",
        body: [
          "O formulário é processado pelo Formspree, serviço de terceiro com operação nos Estados Unidos. Ao enviar, seus dados transitam e ficam armazenados nesse serviço, o que caracteriza transferência internacional de dados.",
          "As fontes tipográficas são carregadas do Google Fonts, o que expõe seu endereço IP ao Google no momento em que a página carrega.",
        ],
      },
      {
        title: "Por quanto tempo guardamos",
        body: [
          "Mantemos a mensagem enquanto a conversa fizer sentido e pelo tempo necessário ao histórico do projeto. Você pode pedir a exclusão a qualquer momento.",
        ],
      },
      {
        title: "Seus direitos",
        body: [
          "A LGPD garante confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação e revogação do consentimento, entre outros (art. 18).",
          "Para exercer qualquer um deles, escreva para contato@algacore.com.br. Respondemos no prazo legal.",
        ],
      },
      {
        title: "Contato",
        body: [
          "O encarregado pelo tratamento de dados, nesta fase, são os próprios fundadores, pelo e-mail contato@algacore.com.br.",
        ],
      },
    ],
    back: "Voltar para a home",
  },
  langToggleLabel: "Idioma / Language",
};

const en: SiteContent = {
  meta: {
    title: "Algacore",
    desc: "Algacore is a B2B biotechnology venture in formation, developing spirulina cultivation in closed photobioreactors for the extraction of high-grade, traceable phycocyanin in Brazil.",
  },
  a11y: { skip: "Skip to content" },
  nav: { team: "Who we are", contact: "Contact" },
  hero: {
    title: "Building the future<br>of <em>phycocyanin</em>",
    sub: "We are developing industrial-scale spirulina cultivation in closed photobioreactors, for the extraction of high-grade phycocyanin.",
    ctaInvest: "For investors",
    ctaPartner: "For partners",
    proof: ["Closed cultivation", "Batch traceability", "Made in Brazil"],
  },
  band: {
    tagline:
      "A B2B biotechnology venture in formation, developing the technology to produce high-grade, traceable phycocyanin at scale, with pharmaceutical grade as the ultimate goal.",
  },
  market: {
    eyebrow: "Why now",
    title: "Phycocyanin's moment",
    lede: "Several market shifts are converging on the same point, and all of them call for a natural blue that is pure and traceable.",
    points: [
      {
        title: "Pressure on synthetic dyes",
        body: "Petroleum-derived blue dyes face growing regulatory scrutiny across multiple markets.",
      },
      {
        title: "Clean-label demand",
        body: "Food, beverage and cosmetics are moving toward ingredients of natural origin and clean label.",
      },
      {
        title: "Natural blue is rare",
        body: "There are few natural sources of a stable, water-soluble blue. Phycocyanin is one of them.",
      },
      {
        title: "Life-sciences pull",
        body: "Interest is rising in high-purity phycocyanin for analytical and biomedical applications.",
      },
    ],
  },
  vision: {
    eyebrow: "The ambition",
    title: "One molecule, on its way to a pharmaceutical standard",
    p1: "<em>Phycocyanin</em> is the brilliant blue pigment-protein in spirulina, a colorant of natural origin and clean label, prized across food, cosmetics and, increasingly, the life sciences. Almost everything on the market today is food-grade. We are building the process to deliver it at pharmaceutical purity, at industrial scale.",
    process: "From cultivation to extraction",
    stages: ["Closed photobioreactor", "Spirulina biomass", "Phycocyanin"],
    flowEyebrow: "The process",
    flowNote: [
      "Light, CO2 and temperature under control",
      "Harvested and concentrated, batch by batch",
      "Extracted and purified",
    ],
    c1title: "Why phycocyanin",
    c1body:
      "Blue is one of the rarest colors in nature, and industry leaned for decades on synthetic dyes derived from petroleum, now under growing regulatory pressure. Phycocyanin is a blue of natural origin, water-soluble, recognized as a safe colorant by agencies including ANVISA, the FDA and the European Union.",
    c2title: "Why pharmaceutical-grade",
    c2body:
      "The most demanding, least-served tier. Purity and traceability are what unlock the highest-value applications.",
  },
  approach: {
    eyebrow: "The approach",
    title: "Designed around the closed photobioreactor, from inoculation to extraction",
    cards: [
      {
        title: "Closed cultivation",
        body: "The design keeps the culture isolated from the open environment, with parameters held within defined ranges. It is engineered for consistency from inoculation to harvest.",
      },
      {
        title: "Traceable by design",
        body: "Every batch designed to be documented end to end, from a finished lot back to its cultivation cycle.",
      },
      {
        title: "Planned for Brazil",
        body: "The operation is planned for Brazil, under the ANVISA regulatory framework and close to South American demand. No license or certification has been obtained to date.",
      },
    ],
    compareTitle: "Closed System",
    compareLede:
      "A photobioreactor is a closed vessel for growing microalgae under controlled conditions. Most spirulina is still grown in open ponds, exposed to the environment. We take the closed path. The Algacore column describes the intended architecture, not an existing facility.",
    pondAlt:
      "Illustration of an open raceway pond seen from above, an oval channel looping around a central divider, uncovered and exposed to sun, dust and evaporation.",
    pondTag: "Conventional",
    pondLabel: "Open pond (raceway)",
    pond: [
      "Exposed to the open air",
      "Subject to contamination and evaporation",
      "Variable conditions, batch to batch",
    ],
    pbrAlt:
      "Illustration of a tubular photobioreactor: parallel glass tubes stacked into a serpentine loop, culture circulating under a managed light panel, parameters set from a controller, and the phycocyanin drawn off the top.",
    pbrTag: "Algacore",
    pbrLabel: "Tubular photobioreactor",
    pbr: [
      "Target: sealed from the outside environment",
      "Target: light, CO2, temperature and flow under control",
      "Target: consistency batch to batch",
    ],
  },
  science: {
    eyebrow: "The science",
    title: "Grounded in the biology of spirulina",
    stat1: "Protein content of dry <em>Arthrospira platensis</em> biomass (approximate)",
    stat2num: "up to ~15%",
    stat2: "Phycocyanin share of dry biomass (approximate)",
    stat3num: "E40+",
    stat3: "Target color strength for phycocyanin concentrates",
    accent: "The goal: traceable purity from the very first batch.",
    sig: {
      eyebrow: "Optical signature",
      title: "Identifiable by its own light",
      body: "Phycocyanin absorbs light with a characteristic peak near 620 nm. That signature, and how sharp it is, is what separates food grade from pharmaceutical grade.",
      alt: "Phycocyanin absorption curve, with a peak near 620 nanometers.",
      peakLabel: "≈ 620 nm",
      rows: [
        { k: "Absorption peak", v: "≈ 620 nm", note: "characteristic" },
        { k: "Purity (A620/A280)", v: "target ≥ 4.0", note: "analytical grade" },
        { k: "Color strength", v: "E18 → E40+", note: "concentration" },
        { k: "Traceability", v: "by batch", note: "end to end" },
      ],
    },
  },
  path: {
    eyebrow: "The path",
    title: "From process to pharmaceutical grade",
    steps: [
      {
        status: "In development",
        title: "Process technology",
        body: "Engineering closed-photobioreactor cultivation and the extraction of phycocyanin, alongside incorporating the company and raising the first round.",
      },
      {
        status: "Next stage",
        title: "Pilot & qualification",
        body: "Pilot production and qualification toward Good Manufacturing Practices (ANVISA GMP).",
      },
      {
        status: "Horizon",
        title: "Pharmaceutical grade & E40+",
        body: "High-purity phycocyanin and high color-strength concentrates (E40 and above), for the most demanding applications.",
      },
    ],
  },
  team: {
    eyebrow: "Who we are",
    title: "Two founders, complementary strengths",
    lede: "Before Algacore, we were childhood friends. We grew up side by side and, years later, chose to build this company together, pairing scientific and operational rigor with the commercial and strategic vision a B2B deep-tech venture demands. It's that lifelong trust that steadies every decision we make.",
    members: [
      {
        name: "Raul Paes de Barros",
        photo: "/team/raul.jpg",
        role: "Co-founder · Science & operations",
        cred: "Pharmacist-Biochemist (FCF-USP) · Business Administration (FEA-USP)",
        bio: "Leads the project's scientific and operational development, from the design of the cultivation and extraction process to brand positioning.",
        mail: "raulbarros@algacore.com.br",
      },
      {
        name: "Rodrigo Gaspar",
        photo: "/team/rodrigo.jpg",
        role: "Co-founder · Business & strategy",
        cred: "Business Administration (ESPM-SP)",
        bio: "Drives the commercial, financial and strategic fronts, from operational modeling to market analysis and business development.",
        mail: "rodrigogaspar@algacore.com.br",
      },
    ],
  },
  connect: {
    eyebrow: "Let's talk",
    title: "Build Algacore with us",
    lede: "We are at the very beginning, in formation and raising our first round. We want to talk with people who follow deep tech closely, whether to invest further down the road or to help shape the product specification.",
    investTitle: "Investors",
    investBody:
      "Talk to the founders about the project, the technology and the plan.",
    investCta: "Talk to the founders →",
    partnerTitle: "Partners & clients",
    partnerBody:
      "Tell us about your application and help shape the spec.",
    partnerCta: "Talk about partnering →",
    disclaimer:
      "The figures and curves shown come from the scientific literature on Arthrospira platensis or are design targets. None of them is an Algacore analytical result, and no illustration depicts a facility of ours. This site is for information only. It does not constitute an offer, invitation or solicitation to invest, nor a public offering of securities, and it is not a promise of any result or return. Algacore is in formation, operates no production unit and sells no product.",
  },
  form: {
    interest: "I'm interested as",
    optInvestor: "Investor",
    optPartner: "Partner / client",
    optOther: "Other",
    name: "Name",
    company: "Company / organization",
    email: "Email",
    message: "Message",
    ack: "I understand that Algacore is in formation, that this contact is not an offer of investment or of any product, and that no supply is available today.",
    privacyNote: "We use your data only to reply to this message.",
    privacyLink: "Privacy Policy",
    send: "Send",
    sending: "Sending...",
    confirm: "Thank you. Your message has been received and we will be in touch.",
    error: "We couldn't send that just now. Please try again or write to contato@algacore.com.br.",
  },
  faq: {
    eyebrow: "Frequently asked questions",
    title: "What people usually ask us",
    lede: "Straight answers about the pigment, the technology and where the project actually stands.",
    items: [
      {
        q: "What is phycocyanin?",
        a: "A blue pigment-protein produced by spirulina. In the literature its absorption peak sits near 620 nm, in the orange-red range, which is what gives it the deep blue color. It is used as a natural colorant and studied as an input for diagnostics and research.",
      },
      {
        q: "Why spirulina?",
        a: "Because it is the most studied and most cultivated organism for phycocyanin production. According to the literature, phycocyanin can make up a relevant share of the cell's total protein under the right cultivation conditions, which makes it the natural feedstock for the pigment.",
      },
      {
        q: "Why closed photobioreactors instead of open ponds?",
        a: "Most of the world's spirulina grows in open ponds, exposed to the environment. Our project takes the closed path: the design goal is to keep the culture isolated from the outside, with light, temperature and nutrients under control, aiming for purity and traceability an open pond can rarely deliver.",
      },
      {
        q: "What stage is the project at?",
        a: "The very beginning. Algacore is a venture in formation: there is no registered company yet, no plant built and no product. The founders are raising a first round to take the first formal steps.",
      },
      {
        q: "Do you already sell phycocyanin?",
        a: "No. There is no product available today and no supply can be contracted at this stage. The contact form is for talking, not for buying or reserving anything.",
      },
      {
        q: "What is the intended regulatory path?",
        a: "The intention is to follow the regulatory routes that apply in Brazil for each use of the pigment, starting with the least complex uses and moving up as the project matures. No authorization, registration or certification has been obtained so far, because there is no operation yet.",
      },
      {
        q: "How do we talk to the founders?",
        a: "Through the form at the end of this page or via contato@algacore.com.br.",
      },
    ],
  },
  notFound: {
    title: "Page not found",
    body: "The address you tried to open does not exist on this site. It may have been mistyped or the link may be out of date.",
    cta: "Go to the home page",
  },
  footer: {
    copy: "Algacore 2026",
    mail: "contato@algacore.com.br",
    legal: "Legal notice",
    privacy: "Privacy",
  },
  legalPage: {
    title: "Legal notice",
    updated: "Updated September 2026",
    sections: [
      {
        title: "What this site is",
        body: [
          "This site is informational material about a project under development. It sells nothing, takes no payment and forms no contract. The only interactive feature is a contact form.",
        ],
      },
      {
        title: "Corporate status",
        body: [
          "Algacore has not been incorporated. There is no registered company, no CNPJ (Brazilian taxpayer registry number) and no state or municipal registration tied to the name Algacore. The project is run by its two founders as individuals, and it is in formation and raising funds.",
          "Nothing on this site should be read as a statement that a legal entity exists.",
        ],
      },
      {
        title: "Trademark",
        body: [
          "The Algacore name, symbol and logotype are signs in use by the project. No registration has been granted and no application has been filed with the INPI (Brazilian trademark office) to date. That is why the site uses no registered-trademark symbols.",
        ],
      },
      {
        title: "Forward-looking statements",
        body: [
          "Much of the content describes plans, engineering targets and intentions. These are projections, not results. They depend on incorporating the company, raising funds, technical development and regulatory approvals, and they may change or never happen.",
        ],
      },
      {
        title: "This is not an offering of securities",
        body: [
          "Nothing on this site is an offer, invitation or solicitation to invest, a public offering of securities, or a promise of any return.",
          "Any conversation with investors happens off this site, individually and with the appropriate documentation.",
        ],
      },
      {
        title: "This is not a product offer",
        body: [
          "Algacore does not produce, sell or supply phycocyanin, spirulina or any other product at this stage. There is no stock, catalogue, price or delivery term, and no order can be accepted.",
        ],
      },
      {
        title: "Regulatory status",
        body: [
          "Algacore holds no operating authorization, health license, product registration or Good Manufacturing Practices certification from ANVISA or any other authority. References to ANVISA and to good practices describe the intended regulatory path, not a status already achieved.",
        ],
      },
      {
        title: "Images and figures",
        body: [
          "The illustrations of photobioreactors, ponds and absorption curves are conceptual representations. They are not photographs of Algacore facilities, nor our own analytical results. The spirulina composition figures come from the scientific literature on Arthrospira platensis.",
        ],
      },
      {
        title: "Contact",
        body: ["Questions about this notice: contato@algacore.com.br."],
      },
    ],
    back: "Back to home",
  },
  privacyPage: {
    title: "Privacy Policy",
    updated: "Updated September 2026",
    lede: "How we handle the personal data you send us through the contact form on this site.",
    sections: [
      {
        title: "Who the controller is",
        body: [
          "Until the company is incorporated, the data controllers are the project's founders, Raul Paes de Barros and Rodrigo Gaspar, as individuals. Once the company exists it will take that role, and this policy will be updated.",
        ],
      },
      {
        title: "What we collect",
        body: [
          "Only what you type into the contact form: name, company or organization, email, message, the interest you select and the page language.",
          "We use no tracking cookies, we run no analytics tool and we build no browsing profile.",
        ],
      },
      {
        title: "What we use it for",
        body: [
          "To read your message and reply. Nothing beyond that. We do not sell, rent or hand your data to third parties for commercial purposes.",
        ],
      },
      {
        title: "Legal basis",
        body: [
          "Submitting the form is voluntary. Processing rests on your consent and on the legitimate interest in replying to a contact you started, under art. 7 of Brazilian Law 13.709/2018 (LGPD).",
        ],
      },
      {
        title: "Who the data is shared with",
        body: [
          "The form is processed by Formspree, a third-party service operating in the United States. When you submit, your data travels to and is stored on that service, which constitutes an international transfer of data.",
          "Typefaces are loaded from Google Fonts, which exposes your IP address to Google when the page loads.",
        ],
      },
      {
        title: "How long we keep it",
        body: [
          "We keep your message for as long as the conversation is relevant and as long as the project record requires. You can ask us to delete it at any time.",
        ],
      },
      {
        title: "Your rights",
        body: [
          "The LGPD grants confirmation of processing, access, correction, anonymization, portability, deletion and withdrawal of consent, among others (art. 18).",
          "To exercise any of them, write to contato@algacore.com.br. We reply within the statutory period.",
        ],
      },
      {
        title: "Contact",
        body: [
          "At this stage the data protection contacts are the founders themselves, at contato@algacore.com.br.",
        ],
      },
    ],
    back: "Back to home",
  },
  langToggleLabel: "Idioma / Language",
};

const content: Record<Lang, SiteContent> = { pt, en };

export function getContent(lang: Lang): SiteContent {
  return content[lang];
}
