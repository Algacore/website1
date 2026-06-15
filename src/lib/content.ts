// ============================================================
// ALGACORE — structured site content (PT default + EN)
// Copy ported verbatim from the original draft. House rule: no em dashes
// (—) or en dashes (–) anywhere in page copy, both languages. Plain hyphens
// are fine in compound words and numeric ranges only.
// ============================================================
import type { Lang } from "@/i18n/config";

export interface SiteContent {
  meta: { title: string; desc: string };
  a11y: { skip: string };
  nav: { team: string; contact: string };
  hero: {
    eyebrow: string;
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
    stat3: string;
    accent: string;
    sig: {
      eyebrow: string;
      title: string;
      body: string;
      alt: string;
      caption: string;
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
    send: string;
    sending: string;
    confirm: string;
    error: string;
  };
  footer: { copy: string; mail: string };
  langToggleLabel: string;
}

const pt: SiteContent = {
  meta: {
    title: "Algacore · Ficocianina de alto grau, rumo ao padrão farmacêutico",
    desc: "Biotecnologia B2B desenvolvendo a tecnologia para cultivar spirulina em fotobiorreatores fechados e extrair ficocianina de alto grau e rastreável, em escala industrial, no Brasil, rumo ao padrão farmacêutico.",
  },
  a11y: { skip: "Pular para o conteúdo" },
  nav: { team: "Quem somos", contact: "Contato" },
  hero: {
    eyebrow: "Biotecnologia B2B",
    title: "Construindo o futuro<br>da <em>ficocianina</em>",
    sub: "Spirulina em escala industrial, cultivada em fotobiorreatores fechados para a extração de ficocianina de alto grau, com confiança.",
    ctaInvest: "Para investidores",
    ctaPartner: "Para parceiros",
    proof: ["Fotobiorreatores fechados", "Rastreável por lote", "Feito no Brasil sob ANVISA"],
  },
  band: {
    tagline:
      "Uma empresa de biotecnologia B2B desenvolvendo a tecnologia para produzir ficocianina de alto grau e rastreável em escala, com o padrão farmacêutico como objetivo final.",
  },
  market: {
    eyebrow: "Por que agora",
    title: "O momento da ficocianina",
    lede: "Vários movimentos de mercado convergem para o mesmo ponto, e todos pedem um azul natural, puro e rastreável.",
    points: [
      {
        title: "Pressão sobre corantes sintéticos",
        body: "Corantes azuis sintéticos derivados de petróleo enfrentam escrutínio regulatório crescente em diversos mercados.",
      },
      {
        title: "Demanda por rótulo limpo",
        body: "Alimentos, bebidas e cosméticos migram para ingredientes de origem natural e rótulo limpo.",
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
    p1: "A <em>ficocianina</em> é o pigmento-proteína azul da spirulina, um corante de origem natural e rótulo limpo, valorizado em alimentos, cosméticos e, cada vez mais, nas ciências da vida. Quase tudo que chega ao mercado hoje é grau alimentício. Estamos construindo o processo para entregá-la em pureza farmacêutica, em escala industrial.",
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
    title: "Fotobiorreatores fechados, controlados da inoculação à extração",
    cards: [
      {
        title: "Cultivo fechado",
        body: "Cultura isolada do ambiente externo, com parâmetros mantidos em faixas definidas. Tudo projetado para consistência, da inoculação à colheita.",
      },
      {
        title: "Rastreável por princípio",
        body: "Cada lote pensado para ser documentado de ponta a ponta, do lote acabado de volta ao seu ciclo de cultivo.",
      },
      {
        title: "Feito no Brasil",
        body: "Sob jurisdição da ANVISA e próximo da demanda sul-americana, encurtando o caminho até o mercado regional.",
      },
    ],
    compareTitle: "Vaso fechado, não tanque aberto",
    compareLede:
      "Um fotobiorreator é um vaso fechado para cultivar microalgas sob condições controladas. A maior parte da spirulina ainda é cultivada em tanques abertos, expostos ao ambiente. Nós seguimos o caminho fechado.",
    pondAlt:
      "Tanque aberto tipo raceway visto de cima, um canal oval em volta de uma divisória central, descoberto e exposto ao sol, à poeira e à evaporação.",
    pondTag: "Convencional",
    pondLabel: "Tanque aberto (raceway)",
    pond: [
      "Exposto ao ar livre",
      "Sujeito a contaminação e evaporação",
      "Condições variáveis, lote a lote",
    ],
    pbrAlt:
      "Fotobiorreator tubular: tubos de vidro paralelos e empilhados num circuito serpentina, com a cultura circulando sob um painel de luz controlado, parâmetros definidos no controlador e a ficocianina retirada no topo.",
    pbrTag: "Algacore",
    pbrLabel: "Fotobiorreator tubular",
    pbr: [
      "Selado do ambiente externo",
      "Luz, CO2, temperatura e fluxo sob controle",
      "Consistência projetada, lote a lote",
    ],
  },
  science: {
    eyebrow: "A ciência",
    title: "Fundamentado na biologia da spirulina",
    stat1: "Teor de proteína da biomassa seca de <em>Arthrospira platensis</em> (aproximado)",
    stat2num: "até ~15%",
    stat2: "Participação da ficocianina na biomassa seca (aproximada)",
    stat3: "Concebido para cultivo em sistema fechado",
    accent: "Pureza rastreável, do primeiro lote.",
    sig: {
      eyebrow: "Assinatura óptica",
      title: "Identificável pela própria luz",
      body: "A ficocianina absorve luz com um pico característico próximo de 620 nm. É essa assinatura, e a nitidez dela, que separa o grau alimentício do grau farmacêutico.",
      alt: "Curva de absorção da ficocianina, com pico próximo de 620 nanômetros.",
      caption: "Curva ilustrativa de absorção. Alvos de projeto.",
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
        body: "Engenharia do cultivo em fotobiorreatores fechados e da extração da ficocianina.",
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
        bio: "Lidera o desenvolvimento técnico-científico e a operação da empresa, do desenho do processo de cultivo e extração ao posicionamento da marca.",
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
    title: "Construa a algacore conosco",
    lede: "Estamos formando nossas parcerias fundadoras, com investidores que apostam em deep tech e parceiros prontos para garantir fornecimento futuro.",
    investTitle: "Investidores",
    investBody:
      "Apoie uma biotech B2B rumo à ficocianina de grau farmacêutico. Fale com os fundadores sobre a rodada e o roadmap.",
    investCta: "Falar sobre investir →",
    partnerTitle: "Parceiros & clientes",
    partnerBody:
      "Reserve fornecimento futuro e ajude a definir a especificação com uma LOI ou MOU. Conte-nos sua aplicação.",
    partnerCta: "Falar sobre parceria →",
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
    send: "Enviar",
    sending: "Enviando...",
    confirm: "Obrigado. Sua mensagem foi recebida e entraremos em contato.",
    error: "Não foi possível enviar agora. Tente novamente ou escreva para contato@algacore.com.br.",
  },
  footer: {
    copy: "© 2026 ALGACORE Biotecnologia Ltda",
    mail: "contato@algacore.com.br",
  },
  langToggleLabel: "Idioma / Language",
};

const en: SiteContent = {
  meta: {
    title: "Algacore · High-grade phycocyanin, built toward a pharmaceutical standard",
    desc: "A B2B biotechnology company developing the technology to cultivate spirulina in closed photobioreactors and extract high-grade, traceable phycocyanin at industrial scale in Brazil, building toward a pharmaceutical standard.",
  },
  a11y: { skip: "Skip to content" },
  nav: { team: "Who we are", contact: "Contact" },
  hero: {
    eyebrow: "B2B biotechnology",
    title: "Building the future<br>of <em>phycocyanin</em>",
    sub: "Industrial-scale spirulina, cultivated in closed photobioreactors for the extraction of high-grade phycocyanin, with confidence.",
    ctaInvest: "For investors",
    ctaPartner: "For partners",
    proof: ["Closed photobioreactors", "Traceable by batch", "Built in Brazil under ANVISA"],
  },
  band: {
    tagline:
      "A B2B biotechnology company developing the technology to produce high-grade, traceable phycocyanin at scale, with pharmaceutical grade as the ultimate goal.",
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
    title: "Closed photobioreactors, controlled from inoculation to extraction",
    cards: [
      {
        title: "Closed cultivation",
        body: "The culture is isolated from the open environment, with parameters held within defined ranges. It is engineered for consistency from inoculation to harvest.",
      },
      {
        title: "Traceable by design",
        body: "Every batch designed to be documented end to end, from a finished lot back to its cultivation cycle.",
      },
      {
        title: "Built in Brazil",
        body: "Under ANVISA jurisdiction and close to South American demand, shortening the path into the regional market.",
      },
    ],
    compareTitle: "Sealed vessel, not open pond",
    compareLede:
      "A photobioreactor is a closed vessel for growing microalgae under controlled conditions. Most spirulina is still grown in open ponds, exposed to the environment. We take the closed path.",
    pondAlt:
      "Open raceway pond seen from above, an oval channel looping around a central divider, uncovered and exposed to sun, dust and evaporation.",
    pondTag: "Conventional",
    pondLabel: "Open pond (raceway)",
    pond: [
      "Exposed to the open air",
      "Subject to contamination and evaporation",
      "Variable conditions, batch to batch",
    ],
    pbrAlt:
      "Tubular photobioreactor: parallel glass tubes stacked into a serpentine loop, culture circulating under a managed light panel, parameters set from a controller, and the phycocyanin drawn off the top.",
    pbrTag: "Algacore",
    pbrLabel: "Tubular photobioreactor",
    pbr: [
      "Sealed from the outside environment",
      "Light, CO2, temperature and flow under control",
      "Consistency by design, batch to batch",
    ],
  },
  science: {
    eyebrow: "The science",
    title: "Grounded in the biology of spirulina",
    stat1: "Protein content of dry <em>Arthrospira platensis</em> biomass (approximate)",
    stat2num: "up to ~15%",
    stat2: "Phycocyanin share of dry biomass (approximate)",
    stat3: "Designed for closed-system cultivation",
    accent: "Traceable purity, from the very first batch.",
    sig: {
      eyebrow: "Optical signature",
      title: "Identifiable by its own light",
      body: "Phycocyanin absorbs light with a characteristic peak near 620 nm. That signature, and how sharp it is, is what separates food grade from pharmaceutical grade.",
      alt: "Phycocyanin absorption curve, with a peak near 620 nanometers.",
      caption: "Illustrative absorption curve. Design targets.",
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
        body: "Engineering closed-photobioreactor cultivation and the extraction of phycocyanin.",
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
        bio: "Leads the company's scientific and operational development, from the design of the cultivation and extraction process to brand positioning.",
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
    title: "Build algacore with us",
    lede: "We are forming our founding partnerships, with investors who back deep tech and partners ready to secure future supply.",
    investTitle: "Investors",
    investBody:
      "Back a B2B biotech building toward pharmaceutical-grade phycocyanin. Talk to the founders about the round and the roadmap.",
    investCta: "Talk about investing →",
    partnerTitle: "Partners & clients",
    partnerBody:
      "Reserve future supply and help shape the spec with an LOI or MOU. Tell us about your application.",
    partnerCta: "Talk about partnering →",
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
    send: "Send",
    sending: "Sending...",
    confirm: "Thank you. Your message has been received and we will be in touch.",
    error: "We couldn't send that just now. Please try again or write to contato@algacore.com.br.",
  },
  footer: {
    copy: "© 2026 ALGACORE Biotecnologia Ltda",
    mail: "contato@algacore.com.br",
  },
  langToggleLabel: "Idioma / Language",
};

const content: Record<Lang, SiteContent> = { pt, en };

export function getContent(lang: Lang): SiteContent {
  return content[lang];
}
