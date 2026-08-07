import type { RichContent } from '../types'

export const richContent: Record<string, RichContent> = {
  'bitcoin-whitepaper': {
    context:
      "Publié le 31 octobre 2008 sur une mailing-list de cryptographie, en pleine crise financière mondiale (Lehman Brothers venait de s'effondrer six semaines plus tôt). Satoshi Nakamoto, identité restée anonyme, propose un système de paiement électronique qui n'a besoin de faire confiance à aucune banque, aucun État, aucun tiers : neuf pages qui posent les bases d'une monnaie entièrement numérique et décentralisée.",
    mechanism: [
      { label: 'Transactions diffusées', detail: "Chaque transaction est annoncée à tous les nœuds du réseau, sans intermédiaire central." },
      { label: 'Regroupement en blocs', detail: "Les nœuds rassemblent les transactions en attente dans un bloc candidat." },
      { label: 'Preuve de travail', detail: "Les mineurs cherchent un hash sous un seuil cible : coûteux à trouver, trivial à vérifier." },
      { label: 'La chaîne la plus longue fait foi', detail: "Le consensus se forme sur la chaîne ayant cumulé le plus de travail de calcul." },
      { label: 'Double dépense impossible', detail: "Réécrire l'historique exigerait de re-miner plus vite que tout le reste du réseau réuni." },
    ],
    since: [
      { year: '2009', text: "Bloc de genèse miné le 3 janvier, avec en filigrane le titre d'un journal sur un plan de sauvetage bancaire britannique." },
      { year: '2010', text: "Première transaction commerciale connue : 10 000 BTC contre deux pizzas, le 22 mai." },
      { year: '2013', text: "Vitalik Buterin publie le whitepaper Ethereum, qui généralise l'idée de blockchain en ordinateur programmable." },
      { year: '2017', text: "Le CME lance des futures Bitcoin, une première légitimation par la finance institutionnelle traditionnelle." },
      { year: '2021', text: "Le Salvador fait du Bitcoin une monnaie ayant cours légal." },
      { year: '2024', text: "Les États-Unis approuvent les premiers ETF Bitcoin au comptant, ouvrant l'accès via les comptes-titres classiques." },
    ],
    stats: [
      { label: 'Longueur du document', value: '9 pages' },
      { label: 'Bloc de genèse', value: '3 janvier 2009' },
      { label: 'Récompense de bloc initiale', value: '50 BTC, divisée par 2 tous les 210 000 blocs' },
      { label: 'Offre maximale', value: '21 000 000 BTC' },
    ],
    quiz: [
      {
        question: "Quel problème la preuve de travail résout-elle avant tout dans Bitcoin ?",
        options: ["La double dépense sans tiers de confiance", "Le chiffrement des messages", "La réduction des frais de transaction", "La compression de la taille des blocs"],
        correctIndex: 0,
        explanation: "La preuve de travail rend coûteuse toute tentative de réécrire l'historique, empêchant de dépenser deux fois la même pièce sans autorité centrale.",
      },
      {
        question: "Pourquoi le réseau suit-il la 'chaîne la plus longue' ?",
        options: ["C'est la chaîne la plus décentralisée", "Elle représente le plus grand travail de calcul cumulé, donc l'effort honnête majoritaire", "C'est la chaîne la plus ancienne", "Satoshi l'a choisie manuellement"],
        correctIndex: 1,
        explanation: "La chaîne avec le plus de preuve de travail cumulée reflète l'effort de la majorité honnête du réseau.",
      },
      {
        question: "Quel événement historique est inscrit dans le bloc de genèse ?",
        options: ["La chute de Lehman Brothers", "Un titre de presse sur un sauvetage bancaire britannique", "Le lancement d'Ethereum", "Le premier achat de Bitcoin"],
        correctIndex: 1,
        explanation: "Satoshi y a inscrit le titre du Times du 3 janvier 2009 sur un second sauvetage des banques par le chancelier britannique.",
      },
    ],
    deepDive: {
      paragraphs: [
        "Le débat qui poursuit Bitcoin depuis le premier jour reste le même : est-ce une monnaie d'échange ou une réserve de valeur ? Vijay Boyapati formalise cette seconde thèse dans 'The Bullish Case for Bitcoin', tandis que la volatilité et la lenteur des transactions continuent de limiter son usage comme monnaie du quotidien.",
        "La consommation énergétique de la preuve de travail reste également contestée : ses défenseurs la présentent comme le coût nécessaire d'une sécurité sans tiers de confiance, ses critiques comme un gaspillage évitable par des mécanismes comme la preuve d'enjeu — celle-là même adoptée par Ethereum en 2022.",
        "Sur le plan des idées, Bitcoin a aussi lancé un débat plus large sur la façon dont la valeur se répartit dans une pile technologique décentralisée, formalisé sept ans plus tard par la thèse des 'protocoles gras'.",
      ],
      connections: [
        { label: 'Ethereum', note: "généralise l'idée en ordinateur programmable", slug: 'ethereum-whitepaper' },
        { label: 'The Bullish Case for Bitcoin', note: 'théorise sa monétisation en réserve de valeur', slug: 'bullish-case-bitcoin' },
        { label: 'Fat Protocols', note: "explique où s'accumule la valeur en crypto", slug: 'fat-protocols' },
        { label: 'Solana', note: 'vise un débit et une latence bien meilleurs', slug: 'solana-whitepaper' },
      ],
    },
  },

  'attention-is-all-you-need': {
    context:
      "Publié en juin 2017 par une équipe de Google Brain/Research, ce papier propose le Transformer : une architecture qui abandonne totalement la récurrence et la convolution au profit de l'attention pure. Le gain n'est pas seulement une meilleure qualité de traduction, mais surtout une parallélisation massive de l'entraînement sur GPU/TPU, jusque-là impossible avec les réseaux récurrents séquentiels.",
    mechanism: [
      { label: 'Encodage positionnel', detail: "Sans récurrence pour indiquer l'ordre des mots, chaque token reçoit un encodage de position ajouté à son embedding." },
      { label: 'Self-attention', detail: "Chaque token peut directement 'regarder' tous les autres tokens via des vecteurs requête/clé/valeur." },
      { label: 'Attention multi-têtes', detail: "Plusieurs têtes d'attention en parallèle capturent différents types de relations entre tokens." },
      { label: 'Blocs empilés', detail: "Des couches d'attention et de feed-forward sont empilées (encodeur et décodeur)." },
      { label: 'Parallélisation totale', detail: "Tous les tokens sont traités simultanément à l'entraînement, ce qui permet de passer à l'échelle sur d'énormes corpus." },
    ],
    since: [
      { year: '2018', text: "BERT et GPT-1 s'appuient sur cette architecture pour la compréhension et la génération de texte." },
      { year: '2019', text: "GPT-2 démontre une génération de texte cohérente à plus grande échelle." },
      { year: '2020', text: "GPT-3 (175 milliards de paramètres) montre qu'agrandir un Transformer fait émerger de nouvelles capacités." },
      { year: '2022', text: "ChatGPT rend les LLM basés sur le Transformer accessibles au grand public." },
      { year: '2020s', text: "Le Transformer devient le substrat quasi universel du boom d'infrastructure IA (GPU, data centers, modèles de fondation)." },
    ],
    stats: [
      { label: 'Publication', value: 'Juin 2017, NeurIPS' },
      { label: 'Auteurs', value: '8 chercheurs (Google)' },
      { label: 'Architecture originale', value: '6 couches encodeur + 6 décodeur' },
      { label: 'Héritage direct', value: 'BERT, GPT, la quasi-totalité des LLM actuels' },
    ],
    quiz: [
      {
        question: "Quel mécanisme remplace la récurrence et la convolution dans le Transformer ?",
        options: ["La self-attention", "Le pooling", "La normalisation par lots", "La régularisation L2"],
        correctIndex: 0,
        explanation: "L'attention permet à chaque position de la séquence d'interagir directement avec toutes les autres, sans traitement séquentiel.",
      },
      {
        question: "Pourquoi supprimer la récurrence change-t-il tout pour l'entraînement ?",
        options: ["Cela réduit le nombre de paramètres", "Cela permet une parallélisation complète sur GPU au lieu d'un traitement séquentiel token par token", "Cela élimine le besoin de données d'entraînement", "Cela rend le modèle déterministe"],
        correctIndex: 1,
        explanation: "Les RNN traitent les tokens un par un ; le Transformer les traite tous en parallèle, ce qui permet de passer à des corpus bien plus grands.",
      },
      {
        question: "Quelles familles de modèles ont été construites directement sur cette architecture ?",
        options: ["BERT et GPT", "AlexNet et ResNet", "Word2vec et GloVe", "SVM et Random Forest"],
        correctIndex: 0,
        explanation: "BERT (2018) et la lignée GPT (2018–) reposent toutes deux sur le Transformer introduit par ce papier.",
      },
    ],
    deepDive: {
      paragraphs: [
        "Le Transformer n'est pas resté cantonné au texte : des variantes comme le Vision Transformer ont ensuite appliqué la même logique d'attention à l'image, unifiant une grande partie du deep learning moderne autour d'une seule architecture.",
        "Cette unification a aussi concentré la recherche de pointe autour d'un petit nombre d'acteurs disposant d'assez de calcul pour entraîner des modèles toujours plus grands, ravivant le débat de 'The Bitter Lesson' : les méthodes générales gourmandes en calcul finissent par l'emporter sur l'expertise humaine spécialisée.",
        "Les lois d'échelle qui ont suivi (Kaplan et al., puis Chinchilla) ont transformé cette observation empirique en une discipline quasi prévisible de planification de l'entraînement des modèles, au cœur de la course actuelle à l'IA.",
      ],
      connections: [
        { label: 'GPT-3', note: 'met le Transformer à l’échelle de 175 milliards de paramètres', slug: 'gpt-3' },
        { label: 'Scaling Laws', note: 'formalise pourquoi agrandir le modèle marche', slug: 'scaling-laws' },
        { label: 'Chinchilla', note: 'corrige le ratio paramètres/données optimal', slug: 'chinchilla' },
        { label: 'AlexNet', note: 'le précédent bond du deep learning, en vision', slug: 'alexnet' },
      ],
    },
  },

  'ethereum-whitepaper': {
    context:
      "Fin 2013, Vitalik Buterin, alors âgé de 19 ans, fait circuler un whitepaper estimant que le langage de script de Bitcoin est trop limité. Il propose une blockchain dotée d'un langage de programmation Turing-complet intégré, permettant à n'importe quelle application décentralisée — pas seulement une monnaie — de tourner directement sur la chaîne.",
    mechanism: [
      { label: 'Ordinateur mondial partagé', detail: "Un état global est répliqué et tenu à jour par tous les nœuds du réseau." },
      { label: 'Smart contracts', detail: "Du code déployé on-chain, avec son propre stockage et sa propre logique." },
      { label: 'Déclenchement par transaction', detail: "Une transaction peut appeler et exécuter un contrat." },
      { label: 'Le gas', detail: "Chaque opération de calcul a un coût, ce qui tarife l'exécution et empêche les boucles infinies." },
      { label: 'Consensus sur l’état', detail: "Les validateurs exécutent les contrats et s'accordent sur l'état résultant du réseau." },
    ],
    since: [
      { year: '2015', text: "Lancement du réseau principal (Frontier), le 30 juillet." },
      { year: '2016', text: "Le piratage du DAO provoque la scission entre Ethereum et Ethereum Classic." },
      { year: '2017', text: "Le boom des ICO utilise massivement les tokens ERC-20 pour lever des fonds sur Ethereum." },
      { year: '2020-21', text: "La DeFi et les NFT tournent presque entièrement sur des smart contracts Ethereum." },
      { year: '2022', text: "'The Merge', le 15 septembre, fait basculer le réseau de la preuve de travail à la preuve d'enjeu." },
    ],
    stats: [
      { label: 'Whitepaper', value: 'Novembre 2013' },
      { label: 'Lancement du réseau', value: '30 juillet 2015' },
      { label: 'The Merge', value: '15 septembre 2022' },
      { label: 'Effet énergétique de The Merge', value: 'Consommation réseau réduite de plus de 99%' },
    ],
    quiz: [
      {
        question: "Qu'est-ce qui distinguait fondamentalement Ethereum de Bitcoin à l'origine ?",
        options: ["Des smart contracts Turing-complets, contre un langage de script limité", "Une offre illimitée de tokens", "L'absence de mineurs", "Un temps de bloc identique à Bitcoin"],
        correctIndex: 0,
        explanation: "Bitcoin permet des transactions programmables de façon limitée ; Ethereum permet d'exécuter n'importe quel programme on-chain.",
      },
      {
        question: "À quoi sert le 'gas' sur Ethereum ?",
        options: ["À payer les frais de listing d'un token", "À tarifer et limiter le calcul exécuté par un contrat", "À sécuriser les clés privées", "À convertir ETH en stablecoin"],
        correctIndex: 1,
        explanation: "Le gas empêche qu'un contrat mal écrit ne consomme des ressources infinies, en donnant un coût à chaque opération.",
      },
      {
        question: "Quel changement technique majeur a eu lieu en septembre 2022 ?",
        options: ["Le lancement du réseau principal", "Le piratage du DAO", "Le passage de la preuve de travail à la preuve d'enjeu ('The Merge')", "La sortie des ERC-20"],
        correctIndex: 2,
        explanation: "The Merge a remplacé le minage par preuve de travail par la validation par preuve d'enjeu, réduisant drastiquement la consommation énergétique.",
      },
    ],
    deepDive: {
      paragraphs: [
        "Le piratage du DAO en 2016 a forcé la communauté Ethereum à un choix philosophique difficile : annuler la transaction frauduleuse via un hard fork (créant Ethereum tel qu'on le connaît aujourd'hui) ou respecter l'immuabilité stricte de la chaîne (Ethereum Classic a poursuivi cette voie). Ce débat sur 'le code fait-il loi' reste une référence dans la gouvernance crypto.",
        "La flexibilité d'Ethereum a aussi un coût : le réseau doit arbitrer en permanence entre sécurité, décentralisation et débit de transactions (le 'trilemme de la scalabilité'), ce qui a ouvert la porte à des concurrents comme Solana, conçus dès le départ pour un débit plus élevé.",
        "Depuis 2021-22, l'essentiel de l'innovation se déplace vers les solutions de 'couche 2' qui traitent les transactions hors de la chaîne principale avant de s'y régler, une réponse directe aux limites de capacité du modèle original.",
      ],
      connections: [
        { label: 'Bitcoin Whitepaper', note: "le modèle dont Ethereum s'écarte", slug: 'bitcoin-whitepaper' },
        { label: 'Uniswap Whitepaper', note: 'une application phare construite dessus', slug: 'uniswap-whitepaper' },
        { label: 'Fat Protocols', note: 'théorise la valeur du token natif du protocole', slug: 'fat-protocols' },
        { label: 'Solana', note: 'un concurrent conçu pour un débit plus élevé', slug: 'solana-whitepaper' },
      ],
    },
  },

  'internet-tidal-wave': {
    context:
      "Mémo interne envoyé par Bill Gates le 26 mai 1995 à l'ensemble des cadres de Microsoft. Gates y réalise que c'est l'Internet ouvert et fondé sur des standards — et non les services en ligne propriétaires comme MSN — qui deviendra la plateforme dominante. Le mémo réoriente en quelques semaines toute la stratégie produit de l'entreprise.",
    mechanism: [
      { label: 'Comparaison historique', detail: "Gates compare la croissance d'Internet à celle de la vague des compatibles PC IBM." },
      { label: 'Nouveau champ de bataille', detail: "Le navigateur devient le nouveau client, le serveur web le nouveau terrain de concurrence." },
      { label: 'Priorité Internet', detail: "Chaque équipe produit de Microsoft reçoit l'ordre d'intégrer Internet dans sa feuille de route." },
      { label: 'Construire un navigateur', detail: "L'entreprise engage les ressources qui mèneront à Internet Explorer." },
      { label: 'Adopter les standards ouverts', detail: "Windows se réoriente autour de TCP/IP, HTML et HTTP plutôt que de services propriétaires." },
    ],
    since: [
      { year: '1995', text: "Internet Explorer 1.0 sort en août, avec le pack Windows 95 Plus." },
      { year: '1995-98', text: "'Guerre des navigateurs' contre Netscape." },
      { year: '1998', text: "Le procès antitrust américain contre Microsoft porte en partie sur l'intégration forcée d'IE à Windows." },
      { year: '~2003', text: "IE atteint environ 95% de part de marché des navigateurs après le déclin de Netscape." },
      { year: 'Depuis', text: "Le mémo devient une étude de cas classique sur la façon dont un acteur historique pivote face à un changement de plateforme." },
    ],
    stats: [
      { label: 'Date du mémo', value: '26 mai 1995' },
      { label: 'Diffusion', value: 'Interne, cadres dirigeants Microsoft' },
      { label: 'Conséquence directe', value: 'Lancement d’Internet Explorer, août 1995' },
    ],
    quiz: [
      {
        question: "Qu'est-ce qui a déclenché ce mémo ?",
        options: ["La prise de conscience que l'Internet ouvert, pas les services propriétaires, dominerait", "Le lancement de Netscape Navigator", "Un ordre du conseil d'administration", "La sortie de Windows 95"],
        correctIndex: 0,
        explanation: "Gates réalise que les protocoles ouverts d'Internet allaient l'emporter sur la stratégie de service en ligne fermé initialement prévue pour MSN.",
      },
      {
        question: "Quel produit ce mémo a-t-il directement déclenché ?",
        options: ["Windows 95", "Internet Explorer", "MSN", "Bing"],
        correctIndex: 1,
        explanation: "Le mémo pousse Microsoft à construire en urgence un navigateur, qui deviendra Internet Explorer.",
      },
      {
        question: "Quel thème plus large ce mémo illustre-t-il ?",
        options: ["Les acteurs historiques doivent réorienter toute l'entreprise face à un changement de plateforme, ou risquer d'être balayés", "Il vaut mieux ignorer les nouvelles technologies non rentables", "Les mémos internes n'ont jamais d'impact stratégique", "La concurrence par les prix suffit toujours"],
        correctIndex: 0,
        explanation: "Le mémo est devenu la référence sur la façon dont un géant établi doit réagir publiquement et en interne à un changement de plateforme.",
      },
    ],
    deepDive: {
      paragraphs: [
        "La bascule de Microsoft n'a pas suffi à éviter la controverse : l'intégration forcée d'Internet Explorer à Windows a nourri le procès antitrust historique de 1998, un précédent que l'on retrouve aujourd'hui dans les débats sur la position dominante des grandes plateformes IA.",
        "Ce mémo est souvent cité comme le contre-exemple positif face à des entreprises qui n'ont pas su pivoter à temps face à un changement de plateforme — Kodak face au numérique, Blockbuster face au streaming.",
        "Trois décennies plus tard, des mémos similaires en urgence circulent à nouveau dans la tech face au changement de plateforme que représente l'IA générative, avec la même tension entre protocoles ouverts et écosystèmes fermés.",
      ],
      connections: [
        { label: 'Information Management: A Proposal', note: "l'infrastructure web que Gates découvre", slug: 'www-proposal' },
        { label: 'The Anatomy of a Large-Scale Hypertextual Web Search Engine', note: 'la génération suivante, née sur le web ouvert', slug: 'pagerank' },
        { label: 'Why Software Is Eating the World', note: 'prolonge la thèse quinze ans plus tard', slug: 'why-software-is-eating-the-world' },
      ],
    },
  },

  pagerank: {
    context:
      "En 1998, deux doctorants de Stanford, Sergey Brin et Larry Page, publient l'article décrivant l'algorithme derrière leur prototype de moteur de recherche 'BackRub'. Leur idée : traiter la recherche comme un problème d'analyse de liens plutôt que de simple correspondance de mots-clés.",
    mechanism: [
      { label: 'Le web comme graphe', detail: "Chaque page est un nœud, chaque lien une arête orientée vers une autre page." },
      { label: 'Un lien = un vote', detail: "Un lien de A vers B compte comme un vote d'importance pour B, pondéré par l'importance de A." },
      { label: 'Calcul récursif', detail: "L'algorithme recalcule itérativement le score de chaque page jusqu'à convergence." },
      { label: 'Combinaison avec la pertinence', detail: "Le PageRank est combiné à la pertinence des mots-clés pour classer les résultats." },
      { label: 'Effet de qualité', detail: "Plus une page reçoit de liens depuis des pages elles-mêmes importantes, plus son score grimpe." },
    ],
    since: [
      { year: '1998', text: "Google est fondé le 4 septembre à partir de cette recherche." },
      { year: '2000', text: "Le lancement d'AdWords crée le moteur publicitaire qui financera la croissance de Google." },
      { year: '2004', text: "Introduction en bourse de Google." },
      { year: 'Depuis', text: "La logique d'analyse de liens du PageRank est réutilisée bien au-delà de la recherche web : classement de citations académiques, analyse de réseaux sociaux, systèmes de recommandation." },
    ],
    stats: [
      { label: 'Publication', value: '1998' },
      { label: 'Fondation de Google', value: '4 septembre 1998' },
      { label: 'Origine du nom', value: 'Jeu de mots partiel sur le nom de Larry Page' },
    ],
    quiz: [
      {
        question: "Quelle est l'idée centrale du PageRank ?",
        options: ["Compter le nombre de mots-clés sur une page", "Déduire l'importance d'une page du fait qu'elle est liée par d'autres pages importantes, calculé récursivement", "Classer les pages par date de création", "Utiliser le temps de chargement de la page"],
        correctIndex: 1,
        explanation: "L'importance se propage à travers le graphe des liens : être lié par des pages importantes rend une page importante.",
      },
      {
        question: "Quelle entreprise est née directement de cet article ?",
        options: ["Yahoo", "Google", "AltaVista", "Microsoft"],
        correctIndex: 1,
        explanation: "Brin et Page ont fondé Google en 1998 pour commercialiser cette recherche.",
      },
      {
        question: "Au-delà de la recherche web, où la logique du PageRank est-elle aujourd'hui réutilisée ?",
        options: ["Le classement de citations et l'analyse de réseaux", "Uniquement la publicité display", "La compression vidéo", "Le chiffrement des mots de passe"],
        correctIndex: 0,
        explanation: "L'analyse de centralité par les liens s'applique à tout graphe : citations scientifiques, réseaux sociaux, systèmes de recommandation.",
      },
    ],
    deepDive: {
      paragraphs: [
        "Le succès de PageRank a fait naître toute une industrie — le SEO — consacrée à influencer artificiellement ce classement, ce qui a poussé Google à faire évoluer son algorithme des centaines de fois pour rester résistant à la manipulation.",
        "La position dominante que cet algorithme a permise est aujourd'hui au cœur de procès antitrust aux États-Unis et en Europe, qui questionnent si un tel avantage algorithmique initial justifie une position de marché quasi inattaquable des décennies plus tard.",
        "La logique du classement par la structure du réseau plutôt que par le contenu brut a essaimé bien au-delà de la recherche : elle irrigue aujourd'hui les fils d'actualité des réseaux sociaux et les moteurs de recommandation.",
      ],
      connections: [
        { label: 'Information Management: A Proposal', note: 'le web que PageRank vient indexer', slug: 'www-proposal' },
        { label: 'Attention Is All You Need', note: 'le bond suivant en pertinence algorithmique', slug: 'attention-is-all-you-need' },
        { label: 'Aggregation Theory', note: 'explique la domination durable de Google', slug: 'aggregation-theory' },
      ],
    },
  },

  'black-scholes': {
    context:
      "Publié en 1973 dans le Journal of Political Economy, la même année où le Chicago Board Options Exchange (CBOE) ouvre ses portes : la première place boursière standardisée d'options cotées voit le jour juste au moment où la formule capable de les valoriser est publiée.",
    mechanism: [
      { label: 'Hypothèse de mouvement brownien', detail: "Le prix de l'action suit un mouvement brownien géométrique." },
      { label: 'Portefeuille de réplication', detail: "On construit un portefeuille action + obligation sans risque, rééquilibré en continu (delta hedging), qui reproduit le payoff de l'option." },
      { label: 'Absence d’arbitrage', detail: "Ce portefeuille étant sans risque, son rendement doit égaler le taux sans risque." },
      { label: 'Résolution de l’équation', detail: "On résout l'équation différentielle résultante pour obtenir un prix fermé de l'option." },
      { label: 'Cinq variables observables', detail: "Prix du sous-jacent, strike, échéance, volatilité, taux sans risque — aucune prévision de l'appétit au risque de l'investisseur n'est nécessaire." },
    ],
    since: [
      { year: '1973', text: "Le CBOE ouvre le 26 avril, créant le marché standardisé que la formule vient tarifer." },
      { year: '1980s-90s', text: "La formule devient le langage standard de pricing et de couverture sur tous les desks de dérivés." },
      { year: '1997', text: "Myron Scholes et Robert Merton reçoivent le prix Nobel d'économie (Fischer Black, décédé en 1995, n'était pas éligible)." },
      { year: '1998', text: "L'effondrement de LTCM, cofondé par Scholes et Merton, rappelle brutalement que les hypothèses du modèle (volatilité constante, absence de sauts) peuvent échouer sous stress." },
    ],
    stats: [
      { label: 'Publication', value: '1973, Journal of Political Economy' },
      { label: 'Ouverture du CBOE', value: '26 avril 1973' },
      { label: 'Prix Nobel', value: '1997 (Scholes et Merton)' },
    ],
    quiz: [
      {
        question: "Quel événement de marché a coïncidé avec la publication de la formule ?",
        options: ["L'ouverture du CBOE, premier marché d'options standardisé", "Le krach de 1929", "La création de la Fed", "Le lancement du Nasdaq"],
        correctIndex: 0,
        explanation: "La formule arrive au moment précis où un marché d'options coté et standardisé a besoin d'un prix de référence.",
      },
      {
        question: "À quoi sert le 'delta hedging' dans la démonstration ?",
        options: ["À réduire les frais de courtage", "À construire un portefeuille de réplication sans risque", "À prévoir la direction du marché", "À calculer les dividendes"],
        correctIndex: 1,
        explanation: "Le rééquilibrage continu du portefeuille de couverture élimine le risque, ce qui permet d'appliquer l'argument d'absence d'arbitrage.",
      },
      {
        question: "Quel événement de 1998 est devenu un avertissement sur les limites du modèle ?",
        options: ["La faillite d'Enron", "L'effondrement de LTCM", "La bulle internet", "La crise asiatique de 1997 seule"],
        correctIndex: 1,
        explanation: "LTCM, cofondé par deux des auteurs du modèle, s'est effondré quand la réalité du marché a violé les hypothèses de volatilité constante.",
      },
    ],
    deepDive: {
      paragraphs: [
        "Nassim Taleb et d'autres critiques reprochent au modèle de sous-estimer structurellement les événements extrêmes ('cygnes noirs') en supposant une distribution des rendements trop régulière — un défaut qui a contribué à plusieurs crises, de LTCM en 1998 à certains rouages de la crise de 2008.",
        "Malgré ces critiques, la formule reste enseignée et utilisée comme point de départ universel : la plupart des modèles de pricing plus sophistiqués (volatilité stochastique, sauts) sont construits comme des corrections apportées à Black-Scholes plutôt que des ruptures complètes.",
        "Le débat qu'elle a ouvert — peut-on réduire le risque financier à une formule mathématique fermée — reste au cœur de la tension entre les approches quantitatives et les approches qualitatives comme celle de Buffett dans 'The Superinvestors of Graham-and-Doddsville'.",
      ],
      connections: [
        { label: 'The Superinvestors of Graham-and-Doddsville', note: 'un paradigme rival : le jugement humain plutôt que le modèle', slug: 'superinvestors-graham-doddsville' },
        { label: 'Principles for Navigating Big Debt Crises', note: 'une autre tentative de systématiser le risque', slug: 'big-debt-crises' },
      ],
    },
  },

  'zero-to-one': {
    context:
      "Livre publié en septembre 2014, développé à partir des notes de cours de Peter Thiel à Stanford (CS183, 2012), compilées par son étudiant Blake Masters. La thèse centrale : le vrai progrès va de 0 à 1 (créer quelque chose de nouveau), pas de 1 à n (copier ce qui marche déjà).",
    mechanism: [
      { label: 'Monopole vs concurrence', detail: "La concurrence érode les profits ; le monopole (via technologie unique, effets de réseau, économies d'échelle, marque) les préserve." },
      { label: 'Commencer petit', detail: "Dominer d'abord un marché de niche, puis s'étendre progressivement (Amazon a commencé par les livres)." },
      { label: 'Technologie propriétaire 10x', detail: "Privilégier une technologie au moins dix fois meilleure que la meilleure alternative existante." },
      { label: 'Optimisme défini', detail: "Construire pour un futur précis et planifié, pas seulement 'itérer et voir'." },
      { label: 'Les secrets', detail: "Les meilleures startups partent souvent d'idées qui semblent mauvaises de l'extérieur mais ne le sont pas." },
    ],
    since: [
      { year: '2012', text: "Le cours de Thiel à Stanford, dont les notes de Blake Masters circulent largement en ligne avant même la publication du livre." },
      { year: '2014', text: "Publication du livre en septembre." },
      { year: 'Depuis', text: "Devient une lecture quasi obligatoire dans l'écosystème VC/Y Combinator, popularisant le vocabulaire 'monopole', 'secrets', '0 à 1'." },
      { year: 'Depuis', text: "Régulièrement cité — et critiqué — pour sa défense assumée du monopole comme objectif entrepreneurial." },
    ],
    stats: [
      { label: 'Publication', value: 'Septembre 2014' },
      { label: 'Origine', value: 'Cours CS183, Stanford, 2012' },
      { label: 'Co-auteur', value: 'Blake Masters (notes de cours)' },
    ],
    quiz: [
      {
        question: "Que signifie '0 à 1' dans le cadre de Thiel ?",
        options: ["Créer quelque chose de véritablement nouveau, par opposition à copier l'existant ('1 à n')", "Passer de zéro employé à un employé", "Le taux de croissance minimum d'une startup", "Le nombre de fondateurs idéal"],
        correctIndex: 0,
        explanation: "'0 à 1' désigne la création d'une innovation inédite, contrairement à '1 à n' qui consiste à répliquer un modèle existant.",
      },
      {
        question: "Pourquoi Thiel préfère-t-il le monopole à la concurrence pour une startup ?",
        options: ["La concurrence fait tendre les profits vers zéro, le monopole préserve la capacité à investir dans l'avenir", "Les monopoles sont toujours légaux", "Les investisseurs préfèrent les marchés très concurrentiels", "Cela réduit les coûts marketing"],
        correctIndex: 0,
        explanation: "Selon Thiel, une position concurrentielle pure élimine les marges, alors qu'un monopole permet de réinvestir dans l'innovation à long terme.",
      },
      {
        question: "Quelle matière est à l'origine du livre ?",
        options: ["Les notes du cours de Thiel à Stanford, prises par Blake Masters", "Une série d'articles de blog de Marc Andreessen", "Un mémo interne de Founders Fund", "Une thèse de doctorat"],
        correctIndex: 0,
        explanation: "Blake Masters a pris et diffusé les notes du cours CS183 de Thiel en 2012, qui sont devenues la base du livre.",
      },
    ],
    deepDive: {
      paragraphs: [
        "La thèse pro-monopole de Thiel reste débattue : ses détracteurs y voient une justification a posteriori de la concentration de marché des géants tech, tandis que ses défenseurs soulignent qu'un monopole 'créé' par une meilleure technologie diffère d'un monopole hérité d'une position de rente.",
        "Le livre a profondément marqué le vocabulaire de la Silicon Valley — 'secrets', 'optimisme défini', 'monopole créateur' sont devenus des réflexes de pitch chez plusieurs générations de fondateurs passés par Y Combinator et les cercles proches de Founders Fund.",
        "Cette même philosophie infuse des textes ultérieurs comme 'The Techno-Optimist Manifesto', qui prolonge l'idée que la concentration de capital et de talent autour de paris ambitieux est un bien, pas un problème à corriger.",
      ],
      connections: [
        { label: 'Competition Is for Losers', note: "l'article WSJ qui résume la même thèse", slug: 'competition-is-for-losers' },
        { label: 'Aggregation Theory', note: 'une autre théorie de la domination durable', slug: 'aggregation-theory' },
        { label: 'The Techno-Optimist Manifesto', note: 'un manifeste ultérieur porté par les mêmes cercles', slug: 'techno-optimist-manifesto' },
      ],
    },
  },

  'why-software-is-eating-the-world': {
    context:
      "Tribune publiée dans le Wall Street Journal le 20 août 2011 par Marc Andreessen, cofondateur d'Andreessen Horowitz. La thèse : chaque secteur — commerce, médias, finance, agriculture — est en train d'être réorganisé autour d'entreprises logicielles.",
    mechanism: [
      { label: 'Bande passante et calcul bon marché', detail: "La disparition des barrières de distribution et d'infrastructure permet à des entreprises purement logicielles d'exister." },
      { label: 'Dévoration sectorielle', detail: "Les entreprises logicielles surpassent les acteurs historiques sur le coût et la vitesse d'itération (Amazon vs librairies, Netflix vs Blockbuster, Skype vs opérateurs télécom)." },
      { label: 'Repricing boursier', detail: "Le marché commence à valoriser différemment les entreprises 'natives logiciel' face aux entreprises traditionnelles." },
      { label: 'Implication pour l’allocation de capital', detail: "Il faut financer les challengers logiciels dans chaque vertical, pas seulement dans le secteur 'tech'." },
    ],
    since: [
      { year: '2011', text: "Publication le 20 août dans le Wall Street Journal." },
      { year: 'Années 2010', text: "'Software is eating the world' devient un mantra utilisé pour justifier les valorisations tech dans tous les secteurs." },
      { year: 'Décennie suivante', text: "Des entreprises natives logiciel (Amazon, Netflix, Uber, Airbnb) dépassent en valeur boursière des acteurs historiques centenaires." },
      { year: '2023-25', text: "L'essai est prolongé (et parfois contesté) par le cadre 'l'IA dévore le logiciel'." },
    ],
    stats: [
      { label: 'Publication', value: '20 août 2011, Wall Street Journal' },
      { label: 'Fondation d’a16z', value: '2009, deux ans plus tôt' },
    ],
    quiz: [
      {
        question: "Où cet essai a-t-il été publié à l'origine ?",
        options: ["Le Wall Street Journal", "TechCrunch", "Le blog personnel d'Andreessen", "Harvard Business Review"],
        correctIndex: 0,
        explanation: "Il s'agit d'une tribune publiée dans le Wall Street Journal le 20 août 2011.",
      },
      {
        question: "Quels exemples Andreessen utilise-t-il pour illustrer sa thèse ?",
        options: ["Amazon vs librairies, Netflix vs Blockbuster, Skype vs opérateurs télécom", "Apple vs Microsoft", "Google vs Yahoo", "Tesla vs General Motors"],
        correctIndex: 0,
        explanation: "Ces trois comparaisons illustrent comment des entreprises logicielles ont supplanté des acteurs historiques dans leur secteur.",
      },
      {
        question: "Quelle thèse plus récente (2023+) fait écho à cet essai ?",
        options: ["'L'IA dévore le logiciel'", "'Le mobile dévore le monde'", "'La crypto dévore la finance'", "'Le cloud dévore le matériel'"],
        correctIndex: 0,
        explanation: "À partir de 2023, un cadre similaire émerge pour décrire comment l'IA générative rebat les cartes au sein même du secteur logiciel.",
      },
    ],
    deepDive: {
      paragraphs: [
        "L'essai reprend et actualise, seize ans plus tard, l'intuition du mémo de Bill Gates sur la vague Internet : à chaque changement de plateforme, les entreprises natives de la nouvelle technologie finissent par redéfinir des secteurs entiers plutôt que de simplement s'y ajouter.",
        "La thèse a aussi été critiquée pour avoir alimenté une survalorisation généralisée des entreprises 'tech' dans les années 2010, sans toujours distinguer les entreprises réellement structurées autour du logiciel de celles qui ne faisaient qu'en habiller un modèle traditionnel.",
        "En 2023, Andreessen prolonge lui-même cette idée avec 'Why AI Will Save the World', où l'IA devient la nouvelle vague qui doit dévorer jusqu'au logiciel lui-même.",
      ],
      connections: [
        { label: 'The Internet Tidal Wave', note: 'le mémo fondateur de cette idée, seize ans plus tôt', slug: 'internet-tidal-wave' },
        { label: 'Mobile Is Eating the World', note: 'la variante mobile de la même thèse', slug: 'mobile-is-eating-the-world' },
        { label: 'Why AI Will Save the World', note: 'la mise à jour version IA, par le même auteur', slug: 'why-ai-will-save-the-world' },
      ],
    },
  },

  'tesla-master-plan': {
    context:
      "Publié sur le blog de Tesla le 2 août 2006, peu après la présentation du Roadster. Musk y expose une séquence délibérément top-down : voiture de sport chère et peu produite, puis berline, puis voiture grand public, chaque étape finançant la suivante — jusqu'à des solutions d'énergie solaire.",
    mechanism: [
      { label: 'Étape 1 : Roadster', detail: "Construire une voiture électrique désirable à faible volume et prix élevé, pour prouver le concept et financer la R&D." },
      { label: 'Étape 2 : berline', detail: "Utiliser les revenus du Roadster pour construire une voiture moins chère et plus produite (Model S)." },
      { label: 'Étape 3 : voiture grand public', detail: "Utiliser les revenus de la berline pour financer une voiture encore plus abordable et à plus fort volume (Model 3)." },
      { label: 'Étape 4 : énergie propre', detail: "Proposer aussi des solutions de production d'électricité sans émission (solaire)." },
      { label: 'Financement en cascade', detail: "Chaque étape finance la suivante, sans exiger une rentabilité immédiate du premier produit." },
    ],
    since: [
      { year: '2008', text: "Le Roadster commence à être livré." },
      { year: '2012', text: "Lancement de la Model S." },
      { year: '2016', text: "'Master Plan, Part Deux' étend le plan au solaire résidentiel, au stockage par batterie, à l'autonomie et au covoiturage." },
      { year: '2017', text: "La Model 3, la voiture grand public promise, est lancée." },
      { year: '2023', text: "'Master Plan Part 3' vise une économie énergétique mondiale entièrement durable." },
    ],
    stats: [
      { label: 'Publication', value: '2 août 2006' },
      { label: 'Premier produit', value: 'Roadster (livraisons dès 2008)' },
      { label: 'Produit grand public promis', value: 'Model 3, lancée en 2017' },
    ],
    quiz: [
      {
        question: "Quelle était la séquence délibérée du plan ?",
        options: ["Voiture chère à faible volume d'abord, puis des voitures progressivement moins chères et plus produites", "Voiture bon marché d'abord, puis modèles premium", "Lancer simultanément tous les segments", "Commencer par le solaire avant les voitures"],
        correctIndex: 0,
        explanation: "Le plan finance chaque étape suivante grâce aux revenus de l'étape précédente, en partant du haut de gamme.",
      },
      {
        question: "Quel a été le premier produit conçu pour prouver le concept ?",
        options: ["La Model 3", "Le Roadster", "La Model S", "Le Cybertruck"],
        correctIndex: 1,
        explanation: "Le Roadster, présenté en 2006, a démontré qu'une voiture électrique pouvait être désirable.",
      },
      {
        question: "Quelle voiture ultérieure a rempli l'étape 'grand public, forte production' ?",
        options: ["La Model X", "La Model 3", "Le Roadster 2", "La Model S"],
        correctIndex: 1,
        explanation: "Lancée en 2017, la Model 3 est devenue le véhicule électrique le plus vendu aux États-Unis pendant plusieurs années.",
      },
    ],
    deepDive: {
      paragraphs: [
        "L'exécution du plan a été loin d'être linéaire : la montée en cadence de production de la Model 3 a traversé une période que Musk lui-même a qualifiée d''enfer de la production', illustrant l'écart fréquent entre la vision d'un plan et la difficulté réelle de le mettre à l'échelle industrielle.",
        "Le plan a néanmoins servi de modèle à d'autres paris industriels de long terme financés par étapes, où chaque produit finance délibérément le suivant plutôt que de viser une rentabilité immédiate.",
        "Cette philosophie de pari de long terme, assumé publiquement dès le premier jour, se retrouve dans des textes plus tardifs comme 'The Techno-Optimist Manifesto', qui défend la même idée que des paris ambitieux et patients sur la technologie valent mieux que la prudence à court terme.",
      ],
      connections: [
        { label: 'The Techno-Optimist Manifesto', note: 'une philosophie proche, une décennie plus tard', slug: 'techno-optimist-manifesto' },
        { label: 'UberCab Pitch Deck', note: 'un autre pari 2008 sur la mobilité', slug: 'ubercab-pitch-deck' },
      ],
    },
  },

  'superinvestors-graham-doddsville': {
    context:
      "Transcription d'une intervention de Warren Buffett à la Columbia Business School en 1984, publiée la même année dans le magazine Hermes, pour le 50e anniversaire de 'Security Analysis' de Benjamin Graham et David Dodd (1934). Buffett y répond à l'hypothèse des marchés efficients en pointant un groupe d'investisseurs ayant tous appris l'investissement value auprès de Graham et Dodd, et ayant tous battu le marché sur le long terme.",
    mechanism: [
      { label: 'Le défi de l’EMH', detail: "L'hypothèse des marchés efficients affirme que battre durablement le marché est statistiquement quasi impossible, sauf par chance." },
      { label: 'Un ‘village’ commun', detail: "Buffett identifie des investisseurs partageant la même origine intellectuelle (Security Analysis) mais investissant chacun de façon indépendante." },
      { label: 'Portefeuilles différents, discipline commune', detail: "Malgré des titres différents, tous partagent la discipline d'acheter sous la valeur intrinsèque avec une marge de sécurité." },
      { label: 'La preuve par la répétition', detail: "Leur surperformance conjointe et durable est présentée comme la preuve d'un processus reproductible, pas d'un coup de chance groupé." },
    ],
    since: [
      { year: '1934', text: "Publication de 'Security Analysis' par Graham et Dodd, le socle intellectuel commun." },
      { year: '1984', text: "Intervention de Buffett à Columbia pour le 50e anniversaire du livre." },
      { year: 'Depuis', text: "Devient l'une des réfutations les plus citées de l'hypothèse stricte des marchés efficients dans l'enseignement de la finance." },
      { year: 'Depuis', text: "Le vocabulaire 'investissement value' et 'marge de sécurité' devient un standard durable, avec Berkshire Hathaway comme cas d'école sur plusieurs décennies." },
    ],
    stats: [
      { label: 'Intervention', value: '1984, Columbia Business School' },
      { label: 'Livre de référence', value: "'Security Analysis', Graham & Dodd, 1934" },
      { label: 'Investisseurs cités', value: 'Walter Schloss, Bill Ruane, Charlie Munger, Rick Guerin, entre autres' },
    ],
    quiz: [
      {
        question: "Quelle idée académique Buffett cherche-t-il à réfuter ?",
        options: ["L'hypothèse des marchés efficients", "La théorie moderne du portefeuille", "Le modèle CAPM", "La théorie des jeux"],
        correctIndex: 0,
        explanation: "L'EMH postule qu'il est presque impossible de battre durablement le marché, sauf par chance.",
      },
      {
        question: "Qu'ont en commun les 'superinvestisseurs' malgré des portefeuilles différents ?",
        options: ["Un cadre intellectuel commun issu de Graham et Dodd (investissement value / marge de sécurité)", "Le même courtier", "Le même bureau", "Les mêmes actions exactement"],
        correctIndex: 0,
        explanation: "Ils ont tous appris l'investissement value auprès de Graham et Dodd, mais ont ensuite investi de manière indépendante.",
      },
      {
        question: "De quel livre ce 'village' intellectuel commun est-il issu ?",
        options: ["'The Intelligent Investor' de Graham seul", "'Security Analysis' de Graham et Dodd", "'Common Stocks and Uncommon Profits' de Fisher", "'Reminiscences of a Stock Operator'"],
        correctIndex: 1,
        explanation: "'Security Analysis' (1934) est le texte fondateur partagé par tous les investisseurs cités par Buffett.",
      },
    ],
    deepDive: {
      paragraphs: [
        "Des économistes ont opposé à Buffett un biais de sélection possible : sur un univers suffisamment large de gérants, il est statistiquement attendu qu'un petit groupe batte durablement le marché par pur hasard. Buffett répond que le point commun de filiation intellectuelle rend cette explication peu plausible pour ce groupe précis.",
        "L'investissement value qu'il défend a connu une décennie difficile dans les années 2010, sous-performant largement la croissance portée par les grandes valeurs technologiques — un rappel que même une discipline éprouvée traverse de longues périodes hors de forme.",
        "Le débat entre jugement humain discipliné et modèles quantitatifs, que ce texte incarne d'un côté, trouve son miroir de l'autre côté dans la formule de Black-Scholes, qui cherche au contraire à retirer le jugement subjectif du pricing du risque.",
      ],
      connections: [
        { label: 'The Pricing of Options and Corporate Liabilities', note: "l'approche quantitative rivale", slug: 'black-scholes' },
        { label: 'Buy American. I Am.', note: 'Buffett applique la doctrine en pleine crise de 2008', slug: 'buy-american' },
        { label: 'Principles for Navigating Big Debt Crises', note: 'une autre tentative de systématiser l’investissement', slug: 'big-debt-crises' },
      ],
    },
  },

  alexnet: {
    context:
      "Soumis au concours ImageNet Large Scale Visual Recognition Challenge (ILSVRC) 2012, ce réseau de neurones convolutif profond, entraîné sur deux cartes graphiques grand public, bat le meilleur concurrent (non basé sur le deep learning) avec une marge considérable — un résultat largement considéré comme l'étincelle du boom moderne du deep learning.",
    mechanism: [
      { label: '8 couches apprises', detail: "5 couches convolutives + 3 couches entièrement connectées, au lieu de caractéristiques conçues à la main." },
      { label: 'Entraînement sur GPU', detail: "Deux GPU NVIDIA GTX 580 rendent l'entraînement profond enfin réalisable en pratique." },
      { label: 'Activations ReLU', detail: "Des activations ReLU permettent un entraînement plus rapide que les fonctions saturantes précédentes." },
      { label: 'Dropout et augmentation de données', detail: "Ces techniques limitent le surapprentissage sur un jeu de données large mais fini." },
      { label: 'Résultat', detail: "Le taux d'erreur top-5 chute à environ 15,3%, contre environ 26,2% pour le meilleur concurrent 2012." },
    ],
    since: [
      { year: '2012', text: "Résultats de l'ILSVRC 2012 : la victoire d'AlexNet déclenche une ruée des investissements industriels vers le deep learning." },
      { year: '2013', text: "Google acquiert DNNresearch, la société cofondée par Geoffrey Hinton." },
      { year: '2014-15', text: "Des architectures plus profondes (VGG, GoogLeNet, puis ResNet en 2015) continuent d'améliorer la précision sur ImageNet." },
      { year: 'Depuis', text: "La recette 'ajouter du calcul et des données à un réseau profond', validée ici, devient le modèle repris et amplifié à l'ère des LLM." },
    ],
    stats: [
      { label: 'Jeu de données', value: '~1,2 million d’images, 1000 classes' },
      { label: 'Erreur top-5', value: '~15,3% vs ~26,2% pour le 2e' },
      { label: 'Matériel', value: '2x GPU NVIDIA GTX 580' },
    ],
    quiz: [
      {
        question: "Quel concours AlexNet a-t-il remporté ?",
        options: ["ILSVRC (ImageNet) 2012", "Le Netflix Prize", "Kaggle Titanic", "Le concours COCO"],
        correctIndex: 0,
        explanation: "AlexNet a remporté le défi de classification d'images ImageNet 2012 avec une marge inédite.",
      },
      {
        question: "Quel matériel a rendu son entraînement possible en pratique ?",
        options: ["Des CPU classiques", "Deux GPU grand public (GTX 580)", "Un supercalculateur dédié", "Des TPU"],
        correctIndex: 1,
        explanation: "L'entraînement s'est fait sur deux GPU NVIDIA GTX 580, une configuration alors accessible en recherche académique.",
      },
      {
        question: "De combien AlexNet a-t-il réduit le taux d'erreur par rapport au meilleur concurrent 2012 ?",
        options: ["Il l'a quasiment divisé par deux (~26% à ~15%)", "Il l'a réduit de 1%", "Il n'a pas amélioré le taux d'erreur", "Il l'a multiplié par deux"],
        correctIndex: 0,
        explanation: "Le taux d'erreur top-5 est passé d'environ 26,2% à environ 15,3%, un bond spectaculaire pour l'époque.",
      },
    ],
    deepDive: {
      paragraphs: [
        "Ce résultat a déclenché une ruée immédiate sur les GPU, alors conçus principalement pour le jeu vidéo, et a posé les bases de la position dominante de NVIDIA dans l'infrastructure IA une décennie plus tard.",
        "Il a aussi lancé une guerre des talents entre grandes entreprises tech pour recruter les chercheurs en deep learning, et relancé le débat sur l'interprétabilité : ces réseaux profonds sont efficaces, mais restent largement des boîtes noires difficiles à expliquer.",
        "Sur le plan des idées, AlexNet est souvent cité comme la première preuve empirique concrète de la thèse défendue plus tard par 'The Bitter Lesson' : la puissance de calcul brute, appliquée à des méthodes générales, finit par surpasser les systèmes conçus à la main par des experts.",
      ],
      connections: [
        { label: 'The Bitter Lesson', note: 'théorise pourquoi cette approche a fini par gagner', slug: 'the-bitter-lesson' },
        { label: 'Deep Residual Learning (ResNet)', note: 'pousse la profondeur des réseaux encore plus loin', slug: 'resnet' },
        { label: 'Attention Is All You Need', note: 'le second grand bond du deep learning, cinq ans plus tard', slug: 'attention-is-all-you-need' },
      ],
    },
  },

  'gpt-3': {
    context:
      "Publié en mai 2020 par OpenAI sous le titre 'Language Models are Few-Shot Learners', ce papier montre qu'un modèle de langage de 175 milliards de paramètres peut réaliser de nouvelles tâches à partir de simples exemples donnés dans le prompt, sans aucune mise à jour de poids — une capacité que les auteurs nomment 'apprentissage en contexte'.",
    mechanism: [
      { label: 'Mise à l’échelle', detail: "Un Transformer décodeur est agrandi jusqu'à 175 milliards de paramètres, environ 100x GPT-2." },
      { label: 'Corpus massif', detail: "Entraînement sur un immense corpus de texte, basé notamment sur Common Crawl et des sources sélectionnées." },
      { label: 'Exemples dans le prompt', detail: "Au moment de l'inférence, on donne au modèle figé quelques exemples entrée-sortie directement dans le prompt ('few-shot')." },
      { label: 'Généralisation sans entraînement', detail: "Le modèle généralise le motif sans aucune mise à jour de ses poids." },
      { label: 'Lois d’échelle', detail: "La performance sur de nombreuses tâches s'améliore de façon régulière avec la taille du modèle." },
    ],
    since: [
      { year: '2020', text: "L'API GPT-3 s'ouvre aux développeurs en juin, faisant naître une vague de startups 'wrapper GPT-3'." },
      { year: '2022', text: "ChatGPT, construit sur la lignée GPT-3.5, atteint 100 millions d'utilisateurs plus vite qu'aucune app grand public avant lui, en novembre." },
      { year: '2023', text: "GPT-4 et la course aux LLM suivent directement la validation que la mise à l'échelle continue de payer." },
    ],
    stats: [
      { label: 'Paramètres', value: '175 milliards' },
      { label: 'Publication', value: 'Mai 2020' },
      { label: 'Ouverture API', value: 'Juin 2020' },
    ],
    quiz: [
      {
        question: "Quelle capacité GPT-3 a-t-il démontrée sans fine-tuning ?",
        options: ["L'apprentissage few-shot / en contexte à partir d'exemples dans le prompt", "La génération d'images", "La traduction automatique parfaite", "Le raisonnement mathématique garanti"],
        correctIndex: 0,
        explanation: "GPT-3 peut apprendre le motif d'une tâche à partir de quelques exemples donnés dans le prompt, sans mise à jour de ses poids.",
      },
      {
        question: "Combien de paramètres comptait approximativement GPT-3 ?",
        options: ["175 milliards", "1,5 million", "17 millions", "1,75 trillion"],
        correctIndex: 0,
        explanation: "175 milliards de paramètres, environ 100 fois plus que GPT-2.",
      },
      {
        question: "Quel produit grand public, construit deux ans plus tard sur cette famille de modèles, a déclenché une adoption massive ?",
        options: ["ChatGPT", "Google Search", "Siri", "Alexa"],
        correctIndex: 0,
        explanation: "ChatGPT, lancé en novembre 2022 sur la base de GPT-3.5, a atteint 100 millions d'utilisateurs en un temps record.",
      },
    ],
    deepDive: {
      paragraphs: [
        "L'accès à l'API a fait naître, dès 2020, une vague de startups construites comme de simples 'surcouches' (wrappers) au-dessus du modèle d'OpenAI — un modèle d'affaires fragile, puisque chaque nouvelle version du modèle sous-jacent risque d'absorber la fonctionnalité que la startup avait ajoutée.",
        "GPT-3 a aussi ravivé le débat, déjà ouvert par GPT-2 en 2019, sur la diffusion responsable de modèles de plus en plus capables de générer du texte trompeur ou du contenu à grande échelle sans supervision humaine.",
        "Le résultat a validé empiriquement les lois d'échelle publiées un an plus tôt par la même équipe, et a directement motivé les recherches suivantes cherchant le bon équilibre entre taille du modèle et volume de données d'entraînement, notamment Chinchilla.",
      ],
      connections: [
        { label: 'Attention Is All You Need', note: "l'architecture que GPT-3 met à l'échelle", slug: 'attention-is-all-you-need' },
        { label: 'Scaling Laws for Neural Language Models', note: 'prédit ce résultat un an avant', slug: 'scaling-laws' },
        { label: 'Training Compute-Optimal LLMs (Chinchilla)', note: 'corrige la recette deux ans plus tard', slug: 'chinchilla' },
        { label: 'Situational Awareness', note: 'extrapole cette trajectoire vers l’AGI', slug: 'situational-awareness' },
      ],
    },
  },

  'www-proposal': {
    context:
      "Proposition interne au CERN (mars 1989, révisée en 1990 avec Robert Cailliau) suggérant un système hypertexte pour résoudre la perte d'information au CERN, où le personnel tournait constamment et où des systèmes non documentés et incompatibles fragmentaient les connaissances. Son responsable, Mike Sendall, annota le document d'un célèbre 'Vague, but exciting' ('Vague, mais excitant').",
    mechanism: [
      { label: 'Nœuds et liens', detail: "L'information est représentée en nœuds de texte reliés par des liens typés, plutôt que dans une hiérarchie de fichiers rigide." },
      { label: 'Décentralisation', detail: "N'importe quel nœud peut créer un lien vers n'importe quel autre, sans approbation centrale." },
      { label: 'Trois briques simples', detail: "Un langage de balisage (HTML), un système d'adressage (URI/URL) et un protocole de transfert (HTTP)." },
      { label: 'S’appuyer sur l’existant', detail: "Le système tourne sur le réseau Internet déjà en place, sans nouvelle infrastructure physique." },
      { label: 'Libre et sans brevet', detail: "La spécification et le code sont donnés gratuitement, sans verrou de licence bloquant l'adoption." },
    ],
    since: [
      { year: '1990', text: "Berners-Lee construit le premier navigateur/éditeur, nommé 'WorldWideWeb'." },
      { year: '1991', text: "Le premier site web au CERN est mis en ligne le 6 août." },
      { year: '1993', text: "Le CERN place le web dans le domaine public le 30 avril, sans redevance." },
      { year: '1994', text: "Fondation du W3C pour piloter les standards du web." },
      { year: 'Depuis', text: "Le web devient le substrat de toute l'économie internet : recherche, réseaux sociaux, e-commerce, streaming." },
    ],
    stats: [
      { label: 'Proposition initiale', value: 'Mars 1989' },
      { label: 'Premier site web', value: '6 août 1991' },
      { label: 'Domaine public', value: '30 avril 1993' },
    ],
    quiz: [
      {
        question: "Quel commentaire le responsable de Berners-Lee a-t-il écrit sur la proposition originale ?",
        options: ["'Vague, but exciting'", "'Rejeté'", "'À revoir en 1995'", "'Excellent projet'"],
        correctIndex: 0,
        explanation: "Mike Sendall a annoté le document 'Vague, mais excitant', une phrase devenue célèbre a posteriori.",
      },
      {
        question: "Quelle décision de 1993 a été déterminante pour l'adoption du web ?",
        options: ["Le CERN met le web dans le domaine public, sans redevance", "Le CERN dépose un brevet sur HTML", "Le CERN limite le web à un usage interne", "Le CERN vend la technologie à IBM"],
        correctIndex: 0,
        explanation: "Cette décision a permis au web de se répandre librement plutôt que de se fragmenter en systèmes hypertextes propriétaires concurrents.",
      },
      {
        question: "Quelles trois technologies fondatrices cette proposition a-t-elle en pratique fait naître ?",
        options: ["HTML, URL/URI, HTTP", "TCP/IP, DNS, FTP", "Java, JavaScript, CSS", "SMTP, POP3, IMAP"],
        correctIndex: 0,
        explanation: "Ces trois briques — le langage, l'adressage et le protocole — forment encore aujourd'hui le socle du web.",
      },
    ],
    deepDive: {
      paragraphs: [
        "Le choix de rendre le web libre de droits en 1993 est régulièrement présenté, a posteriori, comme l'une des décisions les plus lourdes de conséquences de l'histoire de la tech : un système hypertexte concurrent et propriétaire (comme le Xanadu de Ted Nelson, jamais vraiment sorti) aurait pu freiner ou fragmenter l'adoption.",
        "Trente ans plus tard, le web ouvert que cette proposition a lancé coexiste avec des écosystèmes bien plus fermés — applications mobiles, plateformes propriétaires — ce qui alimente un débat récurrent sur la 'refermeture' progressive d'Internet.",
        "Cette tension entre standards ouverts et plateformes propriétaires est la même que celle que Bill Gates identifie six ans plus tard dans 'The Internet Tidal Wave', lorsqu'il réalise que Microsoft doit s'adapter au web ouvert plutôt que d'imposer son propre système fermé.",
      ],
      connections: [
        { label: 'The Internet Tidal Wave', note: 'Microsoft réalise l’enjeu six ans plus tard', slug: 'internet-tidal-wave' },
        { label: 'The Anatomy of a Large-Scale Hypertextual Web Search Engine', note: 'indexe le web que cette proposition a créé', slug: 'pagerank' },
      ],
    },
  },

  'moores-law-for-everything': {
    context:
      "Essai publié en mars 2021 sur le blog personnel de Sam Altman, alors déjà à la tête d'OpenAI. Il soutient que l'automatisation portée par l'IA fera au prix des biens, des services et du travail ce que la loi de Moore a fait au coût du calcul — le faire tendre vers zéro — et propose de redistribuer la richesse qui en résulte via un mécanisme proche d'un fonds souverain financé par une taxe sur le capital et le foncier.",
    mechanism: [
      { label: 'Substitution progressive', detail: "L'IA et la robotique remplacent progressivement le travail humain sur un nombre croissant de tâches." },
      { label: 'Courbes de coût exponentielles', detail: "Comme pour le calcul, le coût des tâches automatisées chute de façon exponentielle." },
      { label: 'Concentration de la richesse', detail: "Cela concentre une richesse considérable chez les propriétaires du capital plutôt que chez les travailleurs." },
      { label: 'Mécanisme correctif proposé', detail: "Taxer les entreprises au-delà d'une certaine valeur (en actions) et le foncier, pour redistribuer les gains à tous les citoyens ('American Equity Fund')." },
      { label: 'Objectif', detail: "Partager largement les gains de l'abondance générée par l'IA plutôt que les laisser se concentrer." },
    ],
    since: [
      { year: '2021', text: "Publication en mars, plus d'un an avant le lancement de ChatGPT en novembre 2022 — ce qui donne rétrospectivement du poids à l'essai comme aperçu de la pensée dirigeante d'OpenAI." },
      { year: '2022', text: "ChatGPT accélère massivement le débat public sur les effets économiques de l'IA." },
      { year: '2023-25', text: "Les débats sur le revenu de base universel et la redistribution liée à l'IA s'intensifient à mesure que l'adoption de l'IA générative s'accélère, avec des pilotes de revenu de base menés autour d'OpenAI." },
    ],
    stats: [
      { label: 'Publication', value: 'Mars 2021, blog personnel de Sam Altman' },
      { label: 'Antériorité vs ChatGPT', value: 'Plus de 18 mois avant le lancement de ChatGPT' },
    ],
    quiz: [
      {
        question: "À quelle tendance historique Altman compare-t-il la déflation des coûts induite par l'IA ?",
        options: ["La loi de Moore (déclin exponentiel du coût du calcul)", "La loi de Say", "La courbe de Laffer", "La loi de Metcalfe"],
        correctIndex: 0,
        explanation: "L'essai transpose la logique de baisse exponentielle des coûts, historiquement observée en calcul, à l'ensemble des biens et services automatisables.",
      },
      {
        question: "Quel mécanisme de redistribution l'essai propose-t-il ?",
        options: ["Taxer les entreprises (en actions) et le foncier, puis redistribuer largement", "Supprimer tout impôt sur le capital", "Nationaliser les entreprises technologiques", "Interdire l'automatisation"],
        correctIndex: 0,
        explanation: "Altman propose un fonds financé par une taxe en actions sur les grandes entreprises et sur le foncier.",
      },
      {
        question: "Pourquoi la date de publication (2021) est-elle notable pour la lecture actuelle de cet essai ?",
        options: ["Elle précède le lancement de ChatGPT (nov. 2022), montrant que cette réflexion est antérieure au boom grand public de l'IA", "Elle coïncide avec la sortie de GPT-4", "Elle suit la fondation d'OpenAI de quelques semaines seulement", "Elle a été publiée le jour du lancement de DALL-E"],
        correctIndex: 0,
        explanation: "L'essai précède de plus d'un an le moment où l'IA générative est devenue un sujet grand public, ce qui en fait un document prémonitoire.",
      },
    ],
    deepDive: {
      paragraphs: [
        "La proposition de redistribution reste contestée : ses détracteurs doutent qu'une taxe en actions sur les grandes entreprises soit politiquement ou juridiquement réalisable à l'échelle qu'Altman envisage, et questionnent si l'automatisation détruira réellement plus d'emplois qu'elle n'en transformera.",
        "L'essai partage sa prémisse centrale — une abondance matérielle générée par l'IA — avec 'Machines of Loving Grace' de Dario Amodei, mais les deux textes divergent sur le mécanisme de partage des gains : contrat social redistributif chez Altman, retombées diffuses via la santé et la science chez Amodei.",
        "Il s'oppose aussi frontalement aux textes plus pessimistes du canon comme 'AGI Ruin: A List of Lethalities', qui doute que l'humanité maîtrise la transition vers une IA très puissante avant que les risques ne l'emportent sur les bénéfices décrits ici.",
      ],
      connections: [
        { label: 'Machines of Loving Grace', note: "une autre vision de l'abondance portée par l'IA", slug: 'machines-of-loving-grace' },
        { label: 'Situational Awareness', note: 'la même trajectoire vue sous l’angle géopolitique', slug: 'situational-awareness' },
        { label: 'AGI Ruin: A List of Lethalities', note: 'la thèse inverse : le risque l’emporte sur l’abondance', slug: 'agi-ruin' },
      ],
    },
  },

  'meditations-on-moloch': {
    context:
      "Essai publié en juillet 2014 sur le blog Slate Star Codex de Scott Alexander, construit autour du poème 'Howl' d'Allen Ginsberg. Le dieu 'Moloch' y devient une métaphore des pièges multipolaires : des situations où un comportement individuellement rationnel et compétitif produit un résultat collectivement pire, que personne ne souhaitait vraiment.",
    mechanism: [
      { label: 'Définir le piège multipolaire', detail: "De nombreux acteurs indépendants sont en compétition ; 'faire défection' unilatéralement (rogner sur la qualité, escalader) gagne localement, même si la défection généralisée appauvrit tout le monde." },
      { label: 'Exemples multiples', detail: "Biologie (queue du paon), économie (course vers le bas réglementaire), guerre (course aux armements), culture (médias optimisés pour l'indignation)." },
      { label: 'Le rôle des institutions', detail: "États, contrats, mécanismes de coordination existent précisément pour échapper à ces pièges en changeant le gradient d'incitation local." },
      { label: 'Une IA non alignée comme piège ultime', detail: "L'essai spécule qu'une intelligence suffisamment avancée pourrait être soit le meilleur outil pour échapper aux pièges, soit le piège ultime lui-même." },
    ],
    since: [
      { year: '2014', text: "Publication en juillet sur Slate Star Codex." },
      { year: 'Depuis', text: "Devient un texte de référence dans les communautés rationalistes et proches de l'altruisme efficace." },
      { year: 'Depuis', text: "Largement cité dans les débats sur la sécurité de l'IA, où la course entre laboratoires et nations reproduit la structure même du piège multipolaire décrit." },
      { year: 'Aujourd’hui', text: "'Moloch' devient un raccourci courant dans les commentaires tech/politique pour désigner tout échec de coordination ou course vers le bas." },
    ],
    stats: [
      { label: 'Publication', value: 'Juillet 2014' },
      { label: 'Longueur', value: '~8 000-9 000 mots' },
      { label: 'Inspiration', value: "'Howl', Allen Ginsberg" },
    ],
    quiz: [
      {
        question: "Que personnifie 'Moloch' dans cet essai ?",
        options: ["Les pièges multipolaires / échecs de coordination où l'incitation locale bat l'intérêt collectif", "Un dieu de la mythologie grecque lié à la sagesse", "Une entreprise technologique réelle", "Un algorithme de recherche"],
        correctIndex: 0,
        explanation: "Moloch symbolise les situations où la compétition rationnelle individuelle produit un résultat collectivement pire.",
      },
      {
        question: "Quel poème a inspiré la structure et le titre de l'essai ?",
        options: ["'Howl' d'Allen Ginsberg", "'The Waste Land' de T.S. Eliot", "'Leaves of Grass' de Whitman", "'Paradise Lost' de Milton"],
        correctIndex: 0,
        explanation: "L'essai emprunte sa structure et le motif de 'Moloch' au poème 'Howl' de Ginsberg.",
      },
      {
        question: "Dans quel débat contemporain le concept de 'Moloch' est-il fréquemment invoqué ?",
        options: ["La course à l'IA entre laboratoires et nations", "Le débat sur les taux d'intérêt", "La régulation des télécoms", "Le débat sur les brevets pharmaceutiques"],
        correctIndex: 0,
        explanation: "La course entre laboratoires d'IA et entre nations reproduit exactement la structure du piège multipolaire décrit par l'essai.",
      },
    ],
    deepDive: {
      paragraphs: [
        "L'essai a profondément marqué la communauté rationaliste et l'altruisme efficace, au point de servir de socle intellectuel implicite à des textes ultérieurs sur les risques existentiels de l'IA, comme 'AGI Ruin: A List of Lethalities' d'Eliezer Yudkowsky, lui aussi issu de cette même sphère.",
        "Certains critiques reprochent au cadre 'Moloch' un déterminisme excessif : présenter la coordination comme presque impossible risque de décourager justement les efforts institutionnels qui, historiquement, ont su sortir l'humanité de pièges similaires (traités de non-prolifération, régulations environnementales).",
        "L'essai reste néanmoins l'une des lentilles les plus citées pour décrire la course actuelle entre laboratoires d'IA et entre nations — un piège multipolaire concret que 'Situational Awareness' décrit sept ans plus tard sous un angle géopolitique très similaire.",
      ],
      connections: [
        { label: 'AGI Ruin: A List of Lethalities', note: 'applique la même logique de piège à l’IA', slug: 'agi-ruin' },
        { label: 'Situational Awareness', note: 'décrit une course USA-Chine, un piège multipolaire concret', slug: 'situational-awareness' },
        { label: 'The Sovereign Individual', note: 'une autre grande théorie de coordination sociale', slug: 'sovereign-individual' },
      ],
    },
  },

  'fat-protocols': {
    context:
      "Article de blog de Joel Monegro, alors chez Union Square Ventures, publié en novembre 2016. Il observe une inversion par rapport à la pile technologique traditionnelle d'internet : sur le web classique, la valeur se concentre dans les applications 'grasses' (Google, Facebook, Amazon) au-dessus de protocoles 'maigres' et gratuits (TCP/IP, HTTP). En crypto, Monegro soutient que la valeur se concentre au niveau du protocole lui-même.",
    mechanism: [
      { label: 'Pile internet classique', detail: "Les protocoles sont libres et ouverts ; les applications monétisent les données et l'attention qui y circulent (protocole maigre, application grasse)." },
      { label: 'Pile blockchain', detail: "Le protocole possède un token natif dont la valeur doit s'apprécier pour que le réseau reste sécurisé et utile (protocole gras)." },
      { label: 'Financement par la spéculation', detail: "La spéculation sur le token finance le développement du protocole avant même l'usage réel, contrairement à la pile classique financée par les profits des applications." },
      { label: 'Conséquence', detail: "Davantage de valeur agrégée s'accumulerait au niveau du protocole qu'au niveau applicatif — l'inverse du web 2.0." },
    ],
    since: [
      { year: '2016', text: "Publication en novembre sur le blog d'USV." },
      { year: '2017', text: "La thèse 'fat protocols' est utilisée pour justifier les levées de fonds par tokens pendant le boom des ICO." },
      { year: '2018-19', text: "Le marché baissier et l'observation que certaines applications (exchanges, wallets) captent une valeur disproportionnée nuancent la thèse initiale." },
      { year: 'Depuis', text: "Reste une référence standard dans les débats de théorie d'investissement crypto sur la répartition de la valeur dans les piles Web3." },
    ],
    stats: [
      { label: 'Publication', value: 'Novembre 2016, blog USV' },
      { label: 'Contexte d’usage massif', value: "Boom des ICO, 2017-2018" },
    ],
    quiz: [
      {
        question: "Sur la pile internet traditionnelle, où Monegro affirme-t-il que la valeur se concentre ?",
        options: ["Au niveau applicatif (protocoles maigres, applications grasses)", "Au niveau du protocole", "De façon égale entre protocole et application", "Au niveau du matériel réseau"],
        correctIndex: 0,
        explanation: "Sur le web classique, les protocoles (TCP/IP, HTTP) sont gratuits ; ce sont les applications qui captent la valeur.",
      },
      {
        question: "Quelle inversion Monegro observe-t-il dans les piles crypto ?",
        options: ["La valeur se concentre au niveau du protocole, l'application restant plus mince", "Aucune différence avec le web classique", "La valeur disparaît complètement", "Seuls les mineurs captent de la valeur"],
        correctIndex: 0,
        explanation: "Le token natif du protocole doit s'apprécier pour sécuriser le réseau, ce qui concentre la valeur à ce niveau.",
      },
      {
        question: "Qu'est-ce qui finance le développement du protocole tôt dans ce modèle ?",
        options: ["La spéculation / appréciation du token, avant même l'usage réel", "Les subventions publiques", "La publicité", "Les frais d'abonnement des applications"],
        correctIndex: 0,
        explanation: "Contrairement à la pile classique financée par les profits applicatifs, la pile crypto est financée en amont par la spéculation sur le token.",
      },
    ],
    deepDive: {
      paragraphs: [
        "Le marché baissier de 2018-2019 a nuancé la thèse : plusieurs applications (exchanges centralisés, plateformes de garde) ont en réalité capté une part de valeur disproportionnée par rapport aux protocoles sur lesquels elles s'appuyaient, à l'inverse de ce que le modèle prédisait.",
        "Le débat a rebondi avec la montée des solutions de couche 2 sur Ethereum : une partie de la valeur et des frais se déplace désormais vers ces couches applicatives d'agrégation, relançant la question de savoir à quel niveau de la pile la valeur finit réellement par s'accumuler.",
        "L'essai reste malgré tout une référence structurante pour justifier pourquoi un protocole décentralisé doit posséder son propre token plutôt que de rester une infrastructure gratuite comme HTTP ou TCP/IP — l'argument central de 'Why Decentralization Matters' un an plus tard.",
      ],
      connections: [
        { label: 'Bitcoin Whitepaper', note: "le premier protocole 'gras'", slug: 'bitcoin-whitepaper' },
        { label: 'Ethereum Whitepaper', note: 'généralise le protocole en plateforme programmable', slug: 'ethereum-whitepaper' },
        { label: 'Why Decentralization Matters', note: 'justifie pourquoi la valeur doit rester au protocole', slug: 'why-decentralization-matters' },
      ],
    },
  },

  'aggregation-theory': {
    context:
      "Essai publié en 2015 sur le blog Stratechery de Ben Thompson, expliquant pourquoi des entreprises de l'ère internet comme Google, Facebook et Amazon ont construit une domination durable, différente de la façon dont les entreprises de l'ère industrielle gagnaient leur marché.",
    mechanism: [
      { label: 'Coût de distribution quasi nul', detail: "En ligne, une plateforme peut servir un nombre illimité d'utilisateurs et de fournisseurs directement, sans passer par des intermédiaires physiques." },
      { label: 'Agréger la demande', detail: "La plateforme agrège les utilisateurs en possédant la relation et l'expérience utilisateur." },
      { label: 'Boucle auto-renforçante', detail: "Une meilleure expérience attire plus d'utilisateurs, ce qui attire plus de fournisseurs, ce qui améliore le choix et la qualité, ce qui attire encore plus d'utilisateurs." },
      { label: 'Commoditisation des fournisseurs', detail: "Les fournisseurs deviennent interchangeables, tandis que l'agrégateur capte une valeur et un pouvoir de fixation des prix disproportionnés." },
    ],
    since: [
      { year: '2015', text: "Publication sur Stratechery, prolongeant des essais antérieurs (2013-14) de Ben Thompson." },
      { year: 'Depuis', text: "Devient l'un des cadres stratégiques les plus cités dans les cercles tech/VC pour expliquer la domination de plateformes comme Google, Amazon, Facebook." },
      { year: 'Début 2020s', text: "Les régulateurs antitrust américains et européens construisent en partie leurs dossiers contre ces mêmes 'agrégateurs' sur la base de dynamiques proches de celles décrites par Thompson." },
    ],
    stats: [
      { label: 'Publication', value: '2015, Stratechery' },
      { label: 'Exemples cités', value: 'Google (recherche), Amazon (commerce), Facebook (social)' },
    ],
    quiz: [
      {
        question: "Qu'est-ce qui permet aux agrégateurs de contourner les intermédiaires de distribution traditionnels ?",
        options: ["Un coût marginal quasi nul pour servir des utilisateurs en ligne", "Des accords d'exclusivité avec les fournisseurs", "Des subventions gouvernementales", "Des brevets technologiques"],
        correctIndex: 0,
        explanation: "Contrairement aux distributeurs pré-internet qui avaient besoin d'accords exclusifs, une plateforme en ligne peut servir directement n'importe quel utilisateur à coût marginal quasi nul.",
      },
      {
        question: "Quelle est la boucle auto-renforçante décrite par Thompson ?",
        options: ["Meilleure expérience utilisateur → plus d'utilisateurs → plus de fournisseurs/choix → expérience encore meilleure", "Plus de publicité → plus de ventes → plus de publicité", "Plus de fournisseurs → moins d'utilisateurs", "Aucune boucle n'existe dans ce modèle"],
        correctIndex: 0,
        explanation: "C'est cette boucle qui rend la position de l'agrégateur dominant de plus en plus difficile à déloger avec le temps.",
      },
      {
        question: "Que devient le fournisseur dans ce modèle ?",
        options: ["Il se commoditise et perd son pouvoir de négociation face à l'agrégateur", "Il gagne en pouvoir de négociation", "Il devient propriétaire de la plateforme", "Il fusionne avec l'agrégateur"],
        correctIndex: 0,
        explanation: "Les fournisseurs deviennent interchangeables, et c'est l'agrégateur qui capte la majorité de la valeur créée.",
      },
    ],
    deepDive: {
      paragraphs: [
        "Ce cadre est devenu une pièce centrale des dossiers antitrust ouverts contre les grandes plateformes aux États-Unis et en Europe au début des années 2020, les régulateurs reprenant explicitement l'idée que le contrôle de la relation utilisateur confère un pouvoir de marché difficile à contester par les voies classiques.",
        "Les créateurs et fournisseurs qui dépendent de ces plateformes (vendeurs sur une marketplace, créateurs sur un réseau social) critiquent régulièrement cette dynamique : la commoditisation qui profite à l'agrégateur les laisse avec un pouvoir de négociation très réduit sur les règles et les prix.",
        "L'essai 'Invisible Asymptotes' vient nuancer la thèse trois ans plus tard : même un agrégateur dominant finit par heurter des plafonds de croissance qu'il ne voyait pas venir, obligeant à changer de moteur de croissance.",
      ],
      connections: [
        { label: 'The Anatomy of a Large-Scale Hypertextual Web Search Engine', note: "l'exemple fondateur : Google", slug: 'pagerank' },
        { label: 'Why Software Is Eating the World', note: 'le contexte plus large de cette thèse', slug: 'why-software-is-eating-the-world' },
        { label: 'Invisible Asymptotes', note: 'nuance : même les agrégateurs finissent par plafonner', slug: 'invisible-asymptotes' },
      ],
    },
  },

  'shannon-communication-theory': {
    context:
      "Publié en 1948 dans le Bell System Technical Journal, alors que Claude Shannon travaille aux Bell Labs. Cet article fonde le champ de la théorie de l'information en donnant une définition précise et quantifiable de 'l'information', détachée de tout sens, mesurée en bits, et en définissant les limites théoriques de la communication fiable sur un canal bruité.",
    mechanism: [
      { label: 'L’information comme surprise', detail: "Le contenu informationnel d'un message se mesure à son imprévisibilité, en bits (entropie)." },
      { label: 'Modèle source-canal-destination', detail: "Tout système de communication se modélise comme source → codeur → canal bruité → décodeur → destination." },
      { label: 'Capacité du canal', detail: "Chaque canal a un débit maximal de transmission fiable, fixé par sa bande passante et son bruit." },
      { label: 'Codage et fiabilité', detail: "En dessous de cette capacité, un codage suffisamment habile rend les erreurs dues au bruit arbitrairement rares." },
      { label: 'Séparation forme/sens', detail: "En détachant 'combien d'information' de 'quel sens', la théorie s'applique à tout médium : téléphone, télégraphe, puis ordinateurs et internet." },
    ],
    since: [
      { year: '1948', text: "Publication en deux parties (juillet et octobre) dans le Bell System Technical Journal." },
      { year: 'Depuis', text: "Devient le fondement mathématique des communications numériques, de la compression de données et des codes correcteurs d'erreurs." },
      { year: 'Depuis', text: "Sous-tend des technologies allant du modem et du CD au Wi-Fi, aux réseaux mobiles et à la transmission de données sur internet." },
      { year: 'Aujourd’hui', text: "Ses concepts d'entropie sont réutilisés en informatique et en apprentissage automatique, notamment dans les fonctions de perte d'entropie croisée qui entraînent les réseaux de neurones actuels, y compris les Transformers." },
    ],
    stats: [
      { label: 'Publication', value: '1948, Bell System Technical Journal' },
      { label: 'Unité formalisée', value: 'Le bit' },
      { label: 'Employeur de l’auteur', value: 'Bell Labs' },
    ],
    quiz: [
      {
        question: "Quelle unité l'article de Shannon a-t-il formalisée pour mesurer l'information ?",
        options: ["Le bit", "L'octet", "Le baud", "Le hertz"],
        correctIndex: 0,
        explanation: "Shannon a formalisé le bit comme unité de mesure fondamentale de l'information.",
      },
      {
        question: "Que définit la 'capacité de canal' ?",
        options: ["Le débit maximal de transmission fiable sur un canal bruité", "Le nombre d'utilisateurs simultanés", "La distance maximale de transmission", "Le coût du matériel réseau"],
        correctIndex: 0,
        explanation: "La capacité de canal fixe la limite théorique au-delà de laquelle aucun codage ne peut garantir une transmission fiable.",
      },
      {
        question: "Où Shannon travaillait-il lorsqu'il a écrit cet article ?",
        options: ["Bell Labs", "IBM", "MIT uniquement", "Xerox PARC"],
        correctIndex: 0,
        explanation: "Shannon était chercheur aux Bell Labs, où il a développé la théorie de l'information.",
      },
    ],
    deepDive: {
      paragraphs: [
        "Au-delà des télécommunications, Shannon avait aussi posé, dans un mémoire distinct de 1937, les bases de la conception des circuits numériques à partir de l'algèbre booléenne — ce qui en fait une figure fondatrice à la fois du contenu (l'information) et du contenant (le calcul numérique) de l'ère informatique.",
        "Ses concepts d'entropie et d'information ont depuis largement débordé les télécommunications : ils irriguent la théorie de la compression de données, la cryptographie moderne, et jusqu'aux fonctions de perte qui entraînent aujourd'hui les réseaux de neurones, y compris les architectures Transformer.",
        "Publiée l'année qui précède la première conférence d'intelligence artificielle (Dartmouth, 1956) et contemporaine des tout premiers ordinateurs commerciaux, cette théorie s'inscrit dans le même moment fondateur que les paris industriels de Fairchild Semiconductor ou de la future Digital Equipment Corporation.",
      ],
      connections: [
        { label: 'Attention Is All You Need', note: "l'entropie croisée entraîne ces modèles", slug: 'attention-is-all-you-need' },
        { label: 'A Proposal to American Research and Development', note: "l'ère des pionniers du calcul, la même décennie", slug: 'dec-proposal' },
      ],
    },
  },
}
