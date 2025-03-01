import { FlavorCategory } from '../types/flavors';

/**
 * Classification des saveurs de cigares
 * Niveau 1: Catégories principales
 * Structure hiérarchique adaptée pour les débutants
 */
export const LEVEL_1_CATEGORIES: Record<string, FlavorCategory> = {
  'Doux': {
    color: '#DEB887',
    items: [
      {
        name: 'Doux',
        description: 'Saveurs douces, subtiles et crémeuses',
        howToIdentify: 'Notes sucrées et délicates qui se développent doucement en bouche, sensation veloutée sur le palais'
      }
    ],
    gradient: ['#DEB887', '#CD853F'],
    howToIdentify: 'Recherchez des sensations douces et agréables, faciles à apprécier pour les débutants'
  },
  'Épicé': {
    color: '#D2691E',
    items: [
      {
        name: 'Épicé',
        description: 'Saveurs vives et épicées avec une certaine chaleur',
        howToIdentify: 'Picotements légers à moyens, chaleur sur la langue et le palais, sensation de réchauffement'
      }
    ],
    gradient: ['#D2691E', '#8B4513'],
    howToIdentify: 'Notez les sensations de chaleur et de picotement qui persistent après chaque bouffée'
  },
  'Terreux': {
    color: '#8B4513',
    items: [
      {
        name: 'Terreux',
        description: 'Notes de terre, cuir, bois et composés minéraux',
        howToIdentify: 'Rappelle les sensations de forêt humide, de sous-bois et d\'éléments naturels'
      }
    ],
    gradient: ['#8B4513', '#654321'],
    howToIdentify: 'Évoque la nature, le sol fertile, les feuilles d\'automne ou le cuir travaillé'
  },
  'Boisé': {
    color: '#A0522D',
    items: [
      {
        name: 'Boisé',
        description: 'Saveurs de différents types de bois et de leurs composés',
        howToIdentify: 'Évocation de bois noble, parfois fumé ou toast, similaire à certains whiskies vieillis en fût'
      }
    ],
    gradient: ['#A0522D', '#654321'],
    howToIdentify: 'Recherchez des sensations qui rappellent diverses essences de bois, du cèdre au chêne'
  },
  'Amer': {
    color: '#654321',
    items: [
      {
        name: 'Amer',
        description: 'Notes amères et robustes, souvent présentes dans les cigares corsés',
        howToIdentify: 'Sensation d\'amertume qui se développe progressivement, similaire au café noir ou au chocolat noir'
      }
    ],
    gradient: ['#654321', '#3E2723'],
    howToIdentify: 'L\'amertume se ressent principalement sur l\'arrière de la langue et peut persister'
  },
  'Sucré': {
    color: '#C4A484',
    items: [
      {
        name: 'Sucré',
        description: 'Saveurs naturellement sucrées, sans addition de sucre',
        howToIdentify: 'Douceur naturelle rappelant le caramel, le miel ou certains fruits secs'
      }
    ],
    gradient: ['#C4A484', '#A67B5B'],
    howToIdentify: 'Recherchez une douceur naturelle en début de dégustation, particulièrement présente en rétro-olfaction'
  },
  'Floral': {
    color: '#E6E6FA',
    items: [
      {
        name: 'Floral',
        description: 'Notes délicates évoquant différentes fleurs et leurs parfums',
        howToIdentify: 'Arômes légers et parfumés, souvent présents en rétro-olfaction'
      }
    ],
    gradient: ['#E6E6FA', '#D8BFD8'],
    howToIdentify: 'Ces notes se perçoivent souvent par le nez après l\'expiration, créant une sensation parfumée et élégante'
  },
  'Fruité': {
    color: '#FF7F50',
    items: [
      {
        name: 'Fruité',
        description: 'Évocation de divers fruits frais et séchés',
        howToIdentify: 'Notes fruitées qui apportent fraîcheur ou concentration selon le type de fruit'
      }
    ],
    gradient: ['#FF7F50', '#E9967A'],
    howToIdentify: 'Recherchez des sensations qui évoquent différents fruits, des agrumes aux fruits secs'
  }
};

/**
 * Niveau 2: Sous-catégories de saveurs
 * Classification plus détaillée des grands groupes
 */
export const LEVEL_2_CATEGORIES = {
  'Doux': {
    'Crémeux': ['Lait', 'Crème', 'Beurre', 'Vanille', 'Noisette', 'Amande'],
    'Pâtissier': ['Brioche', 'Pain frais', 'Viennoiserie', 'Céréales', 'Biscuit'],
    'Miel': ['Miel d\'acacia', 'Miel toutes fleurs', 'Miel de châtaignier', 'Mielleux']
  },
  'Épicé': {
    'Épices douces': ['Cannelle', 'Muscade', 'Clou de girofle', 'Cardamome', 'Anis étoilé', 'Safran'],
    'Épices chaudes': ['Poivre noir', 'Poivre blanc', 'Piment doux', 'Paprika', 'Gingembre'],
    'Herbes aromatiques': ['Thym', 'Romarin', 'Sauge', 'Origan', 'Laurier']
  },
  'Terreux': {
    'Cuir': ['Cuir neuf', 'Cuir ancien', 'Sellerie', 'Daim', 'Cuir tanné'],
    'Terre': ['Humus', 'Terre humide', 'Forêt après la pluie', 'Champignons'],
    'Minéral': ['Pierre à fusil', 'Craie', 'Graphite', 'Silex', 'Charbon']
  },
  'Boisé': {
    'Bois noble': ['Cèdre', 'Chêne', 'Acajou', 'Bois de rose', 'Santal'],
    'Bois résineux': ['Pin', 'Sapin', 'Eucalyptus', 'Cyprès', 'Résine'],
    'Bois traité': ['Bois fumé', 'Bois toasté', 'Bois vieilli', 'Bois exotique']
  },
  'Amer': {
    'Café': ['Espresso', 'Café torréfié', 'Café noir', 'Marc de café', 'Café vert'],
    'Cacao': ['Chocolat noir', 'Cacao brut', 'Fève de cacao', 'Chocolat amer'],
    'Amers végétaux': ['Feuille de tabac', 'Thé noir fort', 'Écorce', 'Racines', 'Herbes amères']
  },
  'Sucré': {
    'Caramel': ['Caramel brun', 'Caramel au beurre', 'Sucre brûlé', 'Toffee', 'Dulce de leche'],
    'Fruits confits': ['Raisins secs', 'Figues séchées', 'Dattes', 'Abricots secs', 'Pruneaux'],
    'Douceurs': ['Mélasse', 'Sirop d\'érable', 'Cassonade', 'Confiture', 'Praline']
  },
  'Floral': {
    'Fleurs blanches': ['Jasmin', 'Fleur d\'oranger', 'Lys', 'Chèvrefeuille', 'Gardénia'],
    'Fleurs aromatiques': ['Rose', 'Lavande', 'Violette', 'Géranium', 'Camomille'],
    'Herbes florales': ['Verveine', 'Tilleul', 'Citronnelle', 'Menthe douce', 'Angélique']
  },
  'Fruité': {
    'Agrumes': ['Citron', 'Orange', 'Pamplemousse', 'Bergamote', 'Mandarine', 'Kumquat'],
    'Fruits à noyau': ['Cerise', 'Prune', 'Pêche', 'Abricot', 'Nectarine'],
    'Fruits rouges': ['Fraise', 'Framboise', 'Groseille', 'Cassis', 'Mûre'],
    'Fruits exotiques': ['Banane', 'Ananas', 'Mangue', 'Fruit de la passion', 'Litchi']
  }
};

/**
 * Niveau 3: Détails des sous-catégories
 * Description précise pour comprendre chaque nuance
 */
export const LEVEL_3_CATEGORIES = {
  'Lait': 'Douceur légère et crémeuse rappelant le lait frais, apportant une sensation soyeuse en bouche',
  'Crème': 'Plus riche que le lait, avec une onctuosité et une rondeur qui enrobe le palais',
  'Beurre': 'Notes beurrées riches et grasses, parfois légèrement salées, apportant une texture veloutée',
  'Vanille': 'Douceur aromatique caractéristique, avec des nuances allant de la vanille fraîche à la vanille confite',
  'Noisette': 'Saveur douce et boisée avec une légère note sucrée et une texture rappelant l\'oléagineux',
  'Amande': 'Saveur douce et légèrement sucrée, avec une note distinctive d\'amande fraîche ou grillée',

  'Brioche': 'Évocation de pâte légèrement fermentée et beurrée, avec une douceur réconfortante',
  'Pain frais': 'Arôme chaleureux de croûte de pain fraîchement sorti du four, légèrement toasté',
  'Viennoiserie': 'Combinaison de beurre, de pâte feuilletée et de notes douces de fermentation',
  'Céréales': 'Rappelle les grains torréfiés, avec une légère douceur rustique et une note de céréale complète',
  'Biscuit': 'Douceur sèche et croquante évoquant les biscuits sablés ou les speculoos selon l\'intensité',

  'Miel d\'acacia': 'Douceur délicate, florale et transparente, très peu persistante',
  'Miel toutes fleurs': 'Plus complexe, avec différentes couches aromatiques florales et une douceur plus prononcée',
  'Miel de châtaignier': 'Miel ambré avec une légère amertume et des notes boisées qui équilibrent sa douceur',
  'Mielleux': 'Sensation générale de douceur sirupeuse et enveloppante, sans référence à un miel spécifique',

  'Cannelle': 'Épice douce et chaude avec une légère note boisée et sucrée, peut être perçue comme une chaleur aromatique',
  'Muscade': 'Épice chaude et complexe avec des notes boisées et légèrement poivrées',
  'Clou de girofle': 'Très aromatique avec une chaleur intense et une légère anesthésie sur les muqueuses',
  'Cardamome': 'Notes complexes, entre l\'eucalyptus et le citron, avec une fraîcheur mentholée',
  'Anis étoilé': 'Arôme anisé doux et légèrement sucré, avec des notes de réglisse claire',
  'Safran': 'Épice florale avec des notes terreuses et une légère amertume distinctive',

  'Poivre noir': 'Épice chaude avec une morsure distinctive et des notes boisées et fruitées en arrière-plan',
  'Poivre blanc': 'Plus doux que le noir, avec une chaleur plus directe et moins d\'arômes secondaires',
  'Piment doux': 'Chaleur progressive sans être brûlante, avec des notes fruitées soutenant la sensation d\'épice',
  'Paprika': 'Douceur poivrée avec une chaleur modérée et des notes légèrement fruitées et terreuses',
  'Gingembre': 'Fraîcheur piquante et épicée avec une légère note citronnée et une chaleur persistante',

  'Thym': 'Herbe aromatique avec des notes terreuses, légèrement florales et poivrées',
  'Romarin': 'Arôme puissant et résineux avec des notes de pin et d\'eucalyptus',
  'Sauge': 'Notes herbacées puissantes avec des aspects terreux et légèrement mentholés',
  'Origan': 'Arôme herbacé intense avec une légère amertume et des notes chaudes',
  'Laurier': 'Notes aromatiques complexes, entre le thé, l\'eucalyptus et des notes légèrement amères',

  'Cuir neuf': 'Arôme de cuir frais, avec une certaine vivacité et des notes légèrement tanniques',
  'Cuir ancien': 'Plus doux que le cuir neuf, avec des nuances plus profondes et une légère patine',
  'Sellerie': 'Évocation de cuir travaillé avec des notes animales discrètes et une certaine noblesse',
  'Daim': 'Version plus douce et veloutée du cuir, avec une texture aromatique plus fine',
  'Cuir tanné': 'Notes plus intenses et complexes, avec des aspects presque fumés ou boisés',

  'Humus': 'Évocation de matière végétale décomposée, riche et fertile, sans être désagréable',
  'Terre humide': 'Rappelle l\'odeur de la terre après la pluie, fraîche et minérale',
  'Forêt après la pluie': 'Combinaison complexe de terre humide, de végétation et de notes légèrement fongiques',
  'Champignons': 'Notes terreuses et umami, avec une profondeur qui rappelle les champignons sauvages séchés',

  'Pierre à fusil': 'Minéralité intense avec une trace métallique, comme deux pierres frottées ensemble',
  'Craie': 'Minéralité sèche et poudreuse, avec une légère astringence et une sensation tactile distinctive',
  'Graphite': 'Minéralité avec des notes légèrement métalliques et une texture perçue comme dense',
  'Silex': 'Notes minérales vives et tranchantes, avec un aspect presque électrique ou pétillant',
  'Charbon': 'Minéralité sombre avec des aspects terreux profonds et une légère note de fumée froide',

  'Cèdre': 'Bois aromatique avec une fraîcheur distinctive et des notes résineuses douces',
  'Chêne': 'Bois noble avec des tanins et une structure complexe, souvent avec des notes de vanille',
  'Acajou': 'Bois exotique avec une richesse aromatique et une profondeur distinctive',
  'Bois de rose': 'Élégance boisée avec des notes florales subtiles et une douceur caractéristique',
  'Santal': 'Bois crémeux et doux avec des notes lactées et une persistance remarquable',

  'Pin': 'Résine fraîche et verte avec des notes toniques et une certaine astringence',
  'Sapin': 'Similaire au pin mais plus doux, avec des notes vertes plus délicates',
  'Eucalyptus': 'Notes mentholées puissantes avec une fraîcheur presque médicinale',
  'Cyprès': 'Boisé vert avec une fraîcheur distinctive et des notes légèrement résineuses',
  'Résine': 'Concentration aromatique de pin ou sapin, avec une intensité collante caractéristique',

  'Bois fumé': 'Notes de bois exposé à la fumée, avec des aspects brûlés mais non âcres',
  'Bois toasté': 'Évocation de bois chauffé, avec des notes de vanille et parfois de caramel',
  'Bois vieilli': 'Complexité aromatique rappelant les meubles anciens, avec des notes de cire et de patine',
  'Bois exotique': 'Notes boisées peu communes avec des aspects fruitées ou épicées selon l\'essence',

  'Espresso': 'Amertume intense du café concentré avec des notes de torréfaction prononcées',
  'Café torréfié': 'Notes de grains de café fraîchement torréfiés, avec une amertume contrôlée et des notes chocolatées',
  'Café noir': 'Amertume équilibrée du café préparé, avec une certaine rondeur et profondeur',
  'Marc de café': 'Notes plus terreuses et moins vives que le café frais, avec une amertume plus sèche',
  'Café vert': 'Notes herbacées et légèrement acidulées du café non torréfié, avec une amertume végétale',

  'Chocolat noir': 'Amertume équilibrée avec une richesse cacaotée et parfois des notes fruitées',
  'Cacao brut': 'Amertume plus intense et rustique que le chocolat transformé, avec des notes terreuses',
  'Fève de cacao': 'Notes amères brutes avec des aspects fruités et une certaine acidité',
  'Chocolat amer': 'Concentration intense de cacao avec très peu de sucre, amertume prononcée mais raffinée',

  'Feuille de tabac': 'Amertume végétale caractéristique avec des notes vertes et une structure tannique',
  'Thé noir fort': 'Amertume tannique avec des notes maltées et parfois légèrement fumées',
  'Écorce': 'Amertume rustique rappelant l\'écorce des arbres, avec des notes ligneuses et terreuses',
  'Racines': 'Amertume terreuse profonde avec des notes médicinales selon le type de racine',
  'Herbes amères': 'Amertume fraîche et végétale comme celle de la gentiane ou de l\'absinthe',

  'Caramel brun': 'Douceur profonde du sucre caramélisé, avec des notes légèrement brûlées',
  'Caramel au beurre': 'Plus riche que le caramel simple, avec une onctuosité beurrée et une douceur complexe',
  'Sucre brûlé': 'Notes plus intenses et moins douces que le caramel, avec une légère amertume',
  'Toffee': 'Caramel beurré avec une texture perçue comme plus épaisse et une douceur intense',
  'Dulce de leche': 'Caramel lacté avec des notes de lait concentré et une douceur enveloppante',

  'Raisins secs': 'Douceur concentrée du raisin, avec des notes qui peuvent rappeler le vin doux ou le xérès',
  'Figues séchées': 'Douceur profonde et complexe avec des notes de miel et parfois une légère minéralité',
  'Dattes': 'Extrêmement douces avec des notes de caramel et une texture perçue comme moelleuse',
  'Abricots secs': 'Douceur vive avec une acidité conservée et des notes fruitées ensoleillées',
  'Pruneaux': 'Douceur profonde avec des notes complexes de fruits mûrs et parfois des aspects épicés',

  'Mélasse': 'Douceur intense et profonde, presque minérale, avec des notes de réglisse et une légère amertume',
  'Sirop d\'érable': 'Douceur boisée avec une complexité aromatique unique et des notes de vanille',
  'Cassonade': 'Sucre non raffiné avec des notes plus riches et parfois légèrement épicées',
  'Confiture': 'Douceur fruitée concentrée, avec des aspects de fruits cuits et caramélisés',
  'Praline': 'Douceur des noix caramélisées, avec une richesse huileuse et des notes toastées',

  'Jasmin': 'Arôme floral intense et enivrant, légèrement citronné et très parfumé',
  'Fleur d\'oranger': 'Notes délicates et légèrement crémeuses, avec une fraîcheur distinctive',
  'Lys': 'Floral riche et opulent, avec une intensité parfumée presque crémeuse',
  'Chèvrefeuille': 'Floral doux et miellé, avec une légère note verte en arrière-plan',
  'Gardénia': 'Floral exotique et intense, avec des notes crémeuses et légèrement fruitées',

  'Rose': 'Notes florales classiques, variant de la rose fraîche à la rose plus confite ou épicée',
  'Lavande': 'Floral aromatique avec des notes herbacées et légèrement camphrées',
  'Violette': 'Délicat et poudreux, avec une douceur caractéristique et parfois des notes légèrement bonbonnées',
  'Géranium': 'Floral vert et vif, avec une certaine astringence et des notes légèrement citronnées',
  'Camomille': 'Floral doux et herbacé avec des notes de pomme et une légère amertume apaisante',

  'Verveine': 'Herbacée et citronnée, avec une fraîcheur florale et légèrement acidulée',
  'Tilleul': 'Floral doux et miellé, avec une légère note verte et une finesse aromatique',
  'Citronnelle': 'Herbacée avec des notes d\'agrumes prononcées et une fraîcheur stimulante',
  'Menthe douce': 'Fraîcheur aromatique moins intense que la menthe poivrée, avec des notes plus florales',
  'Angélique': 'Herbe aromatique complexe avec des notes de céleri, de pin et de musc',

  'Citron': 'Agrume vif et acidulé, avec une fraîcheur distinctive et des notes de zeste',
  'Orange': 'Agrume plus doux que le citron, avec un équilibre entre acidité et sucrosité',
  'Pamplemousse': 'Agrume légèrement amer, avec une fraîcheur distinctive et des notes zestées intenses',
  'Bergamote': 'Agrume complexe entre l\'orange et le citron, avec des notes florales et une amertume élégante',
  'Mandarine': 'Agrume doux et sucré, avec des notes plus rondes et moins acidulées que l\'orange',
  'Kumquat': 'Petit agrume à la peau douce et à la pulpe acidulée, avec une complexité aromatique unique',

  'Cerise': 'Notes fruitées prononcées, variant de la cerise fraîche acidulée à la cerise noire plus sucrée',
  'Prune': 'Fruit charnu avec un équilibre entre douceur et acidité, et parfois des notes d\'amande',
  'Pêche': 'Fruit doux et parfumé avec une texture aromatique veloutée et une légère acidité',
  'Abricot': 'Similaire à la pêche mais plus intense et concentré, avec une acidité plus marquée',
  'Nectarine': 'Croisement entre la pêche et la prune, avec une douceur équilibrée et aromatique',

  'Fraise': 'Fruit rouge acidulé et aromatique, avec des notes fraîches et parfois légèrement herbacées',
  'Framboise': 'Fruit rouge intense avec un équilibre parfait entre douceur et acidité, très aromatique',
  'Groseille': 'Baie très acidulée avec une faible douceur et une intensité vibrante',
  'Cassis': 'Notes puissantes et reconnaissables, avec un profil aromatique intense et une légère astringence',
  'Mûre': 'Fruit noir avec une douceur prononcée et des aspects plus sombres et complexes',

  'Banane': 'Notes fruitées douces et légèrement lactées, avec des aspects parfois légèrement épicés',
  'Ananas': 'Fruit tropical à la fois sucré et acidulé, avec une intensité aromatique distinctive',
  'Mangue': 'Fruit exotique doux et parfumé, avec des notes résineuses et une richesse aromatique',
  'Fruit de la passion': 'Combinaison unique d\'acidité vive et de sucrosité intense, avec des notes florales',
  'Litchi': 'Fruit exotique floral et délicat, avec une douceur subtile et une texture aromatique unique'
};

/**
 * Niveau 4: Variantes spécifiques et accords recommandés
 * Détails précis avec conseils d'accords pour chaque saveur
 */
export const LEVEL_4_CATEGORIES: Record<string, {
  variants: string[];
  pairings: {
    beverages: string[];
    foods: string[];
  };
  characteristics?: string;
  foundIn?: string[];
}> = {
  // DOUX - CRÉMEUX
  'Lait': {
    variants: ['Lait frais', 'Lait de coco', 'Lait d\'amande'],
    pairings: {
      beverages: ['Thé noir léger', 'Café au lait', 'Champagne doux'],
      foods: ['Chocolat au lait', 'Biscuits sablés', 'Fruits frais']
    },
    characteristics: 'Notes lactées douces qui adoucissent l\'expérience du cigare',
    foundIn: ['Cigares dominicains doux', 'Certains connecticut shade']
  },
  'Crème': {
    variants: ['Crème fraîche', 'Crème pâtissière', 'Crème anglaise'],
    pairings: {
      beverages: ['Porto blanc', 'Sauternes', 'Liqueur de café'],
      foods: ['Desserts à la vanille', 'Pâtisseries légères', 'Fruits à chair blanche']
    },
    characteristics: 'Plus riche que le lait, avec une sensation onctueuse en bouche',
    foundIn: ['Cigares avec des capes claires et soyeuses', 'Certains cigares du Nicaragua à cape connecticut']
  },
  'Beurre': {
    variants: ['Beurre doux', 'Beurre salé', 'Beurre noisette'],
    pairings: {
      beverages: ['Whisky écossais doux', 'Cognac VSOP', 'Rhum ambré léger'],
      foods: ['Pain frais', 'Fruits secs', 'Fromages doux']
    },
    characteristics: 'Notes beurrées qui apportent une richesse crémeuse et parfois légèrement salée',
    foundIn: ['Certains cigares cubains légers', 'Cigares équatoriens à cape connecticut']
  },
  'Vanille': {
    variants: ['Vanille Bourbon', 'Vanille de Madagascar', 'Vanille sucrée', 'Extrait de vanille'],
    pairings: {
      beverages: ['Rhum vieux', 'Porto tawny', 'Whisky single malt fruité', 'Lait de poule'],
      foods: ['Chocolat blanc', 'Crème brûlée', 'Fruits secs', 'Biscuits']
    },
    characteristics: 'Douceur aromatique emblématique souvent présente dans les cigares premium',
    foundIn: ['Nombreux cigares dominicains', 'Certains cigares cubains vieillis', 'Cigares avec cape Connecticut']
  },
  'Noisette': {
    variants: ['Noisette fraîche', 'Noisette grillée', 'Praline', 'Pâte de noisette'],
    pairings: {
      beverages: ['Cognac XO', 'Armagnac', 'Amaretto', 'Café noisette'],
      foods: ['Chocolat au lait', 'Desserts aux fruits secs', 'Biscotti', 'Pain aux noix']
    },
    characteristics: 'Saveur douce et légèrement sucrée avec une texture rappelant l\'oléagineux',
    foundIn: ['Cigares du Honduras', 'Certains cigares nicaraguayens à cape colorado']
  },
'Amande': {
    variants: ['Amande fraîche', 'Amande grillée', 'Amande amère', 'Massepain'],
    pairings: {
      beverages: ['Sherry fino', 'Vin blanc sec', 'Vin mousseux', 'Lait d\'amande'],
      foods: ['Financiers', 'Biscuits aux amandes', 'Fruits secs', 'Chocolat noir']
    },
    characteristics: 'Saveur délicate et légèrement sucrée avec une finesse distinctive',
    foundIn: ['Cigares dominicains à cape claire', 'Certains cigares du Honduras', 'Mélanges doux-moyens']
  },

  // DOUX - PÂTISSIER
  'Brioche': {
    variants: ['Brioche beurrée', 'Brioche sucrée', 'Pain au lait', 'Brioche toastée'],
    pairings: {
      beverages: ['Café au lait', 'Champagne', 'Thé noir', 'Cidre doux'],
      foods: ['Confitures légères', 'Miel', 'Fruits frais', 'Fromages à pâte molle']
    },
    characteristics: 'Évocation de pâte légèrement fermentée avec une douceur réconfortante',
    foundIn: ['Cigares légers dominicains', 'Certains cigares du Honduras', 'Cigares à cape Connecticut']
  },
  'Pain frais': {
    variants: ['Mie de pain', 'Croûte de pain', 'Pain de campagne', 'Pain au levain'],
    pairings: {
      beverages: ['Café noir léger', 'Bière blonde', 'Vin blanc sec', 'Eau pétillante'],
      foods: ['Fromages doux', 'Charcuteries légères', 'Beurre frais', 'Miel de fleurs']
    },
    characteristics: 'Arôme chaleureux et légèrement fermenté, réconfortant et familier',
    foundIn: ['Cigares des Canaries', 'Certains cigares dominicains', 'Cigares de faible puissance']
  },
  'Viennoiserie': {
    variants: ['Croissant', 'Pain au chocolat', 'Kouign-amann', 'Chausson aux pommes'],
    pairings: {
      beverages: ['Cappuccino', 'Vin doux naturel', 'Thé Earl Grey', 'Cidre brut'],
      foods: ['Confitures fruitées', 'Crème fraîche', 'Fruits rouges', 'Chocolat au lait']
    },
    characteristics: 'Combinaison de beurre et de pâte feuilletée avec des notes sucrées',
    foundIn: ['Certains cigares équatoriens', 'Cigares dominicains à cape Connecticut', 'Blends légers']
  },
  'Céréales': {
    variants: ['Avoine', 'Blé entier', 'Malt', 'Granola', 'Céréales grillées'],
    pairings: {
      beverages: ['Whisky single malt léger', 'Bière ambrée', 'Café filtre', 'Thé noir'],
      foods: ['Fromages à pâte pressée', 'Noix', 'Miel', 'Fruits secs']
    },
    characteristics: 'Rappelle les grains torréfiés avec une légère douceur rustique',
    foundIn: ['Certains cigares du Nicaragua', 'Cigares mexicains', 'Mélanges avec tabacs Sun Grown']
  },
  'Biscuit': {
    variants: ['Sablé', 'Petit beurre', 'Speculoos', 'Biscuit sec', 'Biscotti'],
    pairings: {
      beverages: ['Vin santo', 'Muscat', 'Thé à la bergamote', 'Café aromatisé'],
      foods: ['Fruits secs', 'Compotes douces', 'Crèmes dessert', 'Chocolat blanc']
    },
    characteristics: 'Douceur sèche et croquante avec des notes de beurre et de blé',
    foundIn: ['Certains cigares du Honduras', 'Cigares dominicains légers', 'Cigares à cape Connecticut']
  },

  // DOUX - MIEL
  'Miel d\'acacia': {
    variants: ['Miel d\'acacia clair', 'Miel d\'acacia crémeux', 'Miel de printemps'],
    pairings: {
      beverages: ['Vin blanc liquoreux', 'Tisane de fleurs', 'Whisky Highland', 'Eau de source'],
      foods: ['Fromages frais', 'Pâtisseries légères', 'Fruits blancs', 'Noix fraîches']
    },
    characteristics: 'Douceur délicate et florale, très peu persistante mais élégante',
    foundIn: ['Cigares dominicains légers', 'Certains cigares cubains jeunes', 'Cigares à cape claire']
  },
  'Miel toutes fleurs': {
    variants: ['Miel polyfloral', 'Miel de prairie', 'Miel d\'été', 'Miel ambré'],
    pairings: {
      beverages: ['Rhum ambré', 'Bourbon léger', 'Cidre bouché', 'Thé vert'],
      foods: ['Fruits secs', 'Fromages de chèvre', 'Pains d\'épices légers', 'Fruits jaunes']
    },
    characteristics: 'Plus complexe que l\'acacia, avec différentes couches aromatiques florales',
    foundIn: ['Cigares nicaraguayens doux', 'Certains cigares dominicains vieillis', 'Cigares à cape colorado']
  },
  'Miel de châtaignier': {
    variants: ['Miel de châtaignier corsé', 'Miel de forêt', 'Miel ambré foncé'],
    pairings: {
      beverages: ['Whisky tourbé léger', 'Cognac VS', 'Vin rouge léger', 'Café noir'],
      foods: ['Fromages à pâte persillée', 'Noix', 'Chocolat noir', 'Desserts aux épices']
    },
    characteristics: 'Miel ambré avec une légère amertume et des notes boisées',
    foundIn: ['Certains cigares cubains', 'Cigares honduriens moyens', 'Mélanges à cape maduro légère']
  },
  'Mielleux': {
    variants: ['Miellat', 'Sirop de miel', 'Miel cristallisé', 'Bonbon au miel'],
    pairings: {
      beverages: ['Porto ruby', 'Whisky fruité', 'Vin doux naturel', 'Thé noir sucré'],
      foods: ['Desserts orientaux', 'Gâteaux aux amandes', 'Fruits confits', 'Chocolat au lait']
    },
    characteristics: 'Sensation générale de douceur sirupeuse et enveloppante',
    foundIn: ['Cigares dominicains vieillis', 'Certains cigares nicaraguayens doux', 'Mélanges avec tabac Piloto Cubano']
  },

  // ÉPICÉ - ÉPICES DOUCES
  'Cannelle': {
    variants: ['Cannelle douce', 'Cannelle épicée', 'Cannelle boisée', 'Cannelle en poudre'],
    pairings: {
      beverages: ['Cognac', 'Vin rouge épicé', 'Café aromatisé', 'Rhum épicé'],
      foods: ['Pain d\'épices', 'Tarte aux pommes', 'Chocolat noir', 'Desserts orientaux']
    },
    characteristics: 'Épice douce et chaude avec une légère note boisée et sucrée',
    foundIn: ['Certains cigares nicaraguayens', 'Cigares cubains moyens', 'Mélanges avec tabac Criollo']
  },
  'Muscade': {
    variants: ['Muscade moulue', 'Muscade fraîche', 'Muscade épicée', 'Muscade crémeuse'],
    pairings: {
      beverages: ['Punch chaud', 'Bière brune d\'abbaye', 'Xérès', 'Lait de poule'],
      foods: ['Gâteaux aux épices', 'Plats de viande', 'Purées', 'Fromages crémeux']
    },
    characteristics: 'Épice chaude et complexe avec des notes boisées et légèrement poivrées',
    foundIn: ['Cigares du Nicaragua moyens', 'Certains cigares dominicains corsés', 'Mélanges avec tabac Piloto']
  },
  'Clou de girofle': {
    variants: ['Clou de girofle entier', 'Clou de girofle moulu', 'Clou de girofle intense', 'Clou de girofle fumé'],
    pairings: {
      beverages: ['Vin chaud', 'Whisky écossais épicé', 'Rhum vieux', 'Porto vintage'],
      foods: ['Charcuteries épicées', 'Desserts aux fruits', 'Foie gras', 'Plats orientaux']
    },
    characteristics: 'Très aromatique avec une chaleur intense et une légère anesthésie des muqueuses',
    foundIn: ['Certains cigares cubains', 'Cigares indonésiens', 'Mélanges avec tabac Sumatra']
  },
  'Cardamome': {
    variants: ['Cardamome verte', 'Cardamome noire', 'Cardamome fraîche', 'Cardamome séchée'],
    pairings: {
      beverages: ['Café turc', 'Thé chaï', 'Liqueur d\'agrumes', 'Eau de rose'],
      foods: ['Desserts indiens', 'Riz parfumé', 'Chocolats fins', 'Pâtisseries orientales']
    },
    characteristics: 'Notes complexes, entre l\'eucalyptus et le citron, avec une fraîcheur mentholée',
    foundIn: ['Certains cigares asiatiques', 'Cigares du Nicaragua à cape naturelle', 'Mélanges Habano']
  },
  'Anis étoilé': {
    variants: ['Badiane', 'Anis chinois', 'Anis doux', 'Anis réglissé'],
    pairings: {
      beverages: ['Pastis', 'Sambuca', 'Ouzo', 'Absinthe légère'],
      foods: ['Desserts méditerranéens', 'Fruits poêlés', 'Biscuits aux épices', 'Confiseries']
    },
    characteristics: 'Arôme anisé doux et légèrement sucré, avec des notes de réglisse claire',
    foundIn: ['Certains cigares mexicains', 'Mélanges avec tabac oriental', 'Cigares indonésiens légers']
  },
  'Safran': {
    variants: ['Safran pur', 'Safran doux', 'Safran terreux', 'Safran floral'],
    pairings: {
      beverages: ['Vin blanc sec', 'Thé blanc', 'Liqueur de fleurs', 'Champagne'],
      foods: ['Riz safrané', 'Fruits de mer', 'Desserts délicats', 'Chocolat blanc']
    },
    characteristics: 'Épice florale avec des notes terreuses et une légère amertume distinctive',
    foundIn: ['Rares cigares premium', 'Certains mélanges cubains vieillis', 'Cigares à cape naturelle claire']
  },

  // ÉPICÉ - ÉPICES CHAUDES
  'Poivre noir': {
    variants: ['Poivre noir frais', 'Poivre noir moulu', 'Poivre noir grillé', 'Poivre de Kampot'],
    pairings: {
      beverages: ['Whisky Islay', 'Vin rouge tannique', 'Rhum agricole', 'Bourbon épicé'],
      foods: ['Viandes rouges', 'Fromages affinés', 'Chocolat noir intense', 'Charcuteries']
    },
    characteristics: 'Épice chaude avec une morsure distinctive et des notes boisées et fruitées',
    foundIn: ['Cigares nicaraguayens corsés', 'Mélanges avec tabac Ligero', 'Cigares à cape Maduro']
  },
  'Poivre blanc': {
    variants: ['Poivre blanc frais', 'Poivre blanc moulu', 'Poivre blanc doux', 'Poivre blanc crémeux'],
    pairings: {
      beverages: ['Gin premium', 'Vodka de caractère', 'Saké sec', 'Vin blanc sec'],
      foods: ['Poissons', 'Viandes blanches', 'Fromages frais épicés', 'Plats asiatiques']
    },
    characteristics: 'Plus doux que le noir, avec une chaleur plus directe et moins d\'arômes secondaires',
    foundIn: ['Certains cigares dominicains', 'Cigares équatoriens moyens', 'Mélanges à cape Connecticut']
  },
  'Piment doux': {
    variants: ['Paprika doux', 'Piment d\'Espelette', 'Piment fumé', 'Piment fruité'],
    pairings: {
      beverages: ['Tequila reposado', 'Vin rouge fruité', 'Bière ambrée', 'Mezcal léger'],
      foods: ['Tapas', 'Charcuteries ibériques', 'Fromages fermentés', 'Chocolat au piment']
    },
    characteristics: 'Chaleur progressive sans être brûlante, avec des notes fruitées soutenant la sensation d\'épice',
    foundIn: ['Cigares honduriens corsés', 'Mélanges avec tabac Corojo', 'Certains cigares mexicains']
  },
  'Paprika': {
    variants: ['Paprika doux', 'Paprika fumé', 'Paprika hongrois', 'Paprika piquant'],
    pairings: {
      beverages: ['Vin rouge de l\'Est', 'Palinka', 'Brandy', 'Bière ambrée'],
      foods: ['Goulash', 'Charcuteries fumées', 'Fromages affinés', 'Plats mijotés']
    },
    characteristics: 'Douceur poivrée avec une chaleur modérée et des notes légèrement fruitées et terreuses',
    foundIn: ['Cigares honduriens', 'Certains cigares cubains moyens', 'Mélanges avec tabac Sun Grown']
  },
  'Gingembre': {
    variants: ['Gingembre frais', 'Gingembre confit', 'Gingembre séché', 'Gingembre citronné'],
    pairings: {
      beverages: ['Whisky japonais', 'Rhum épicé', 'Thé vert au gingembre', 'Kombucha'],
      foods: ['Plats asiatiques', 'Desserts épicés', 'Chocolats fins', 'Fruits exotiques']
    },
    characteristics: 'Fraîcheur piquante et épicée avec une légère note citronnée et une chaleur persistante',
    foundIn: ['Certains cigares indonésiens', 'Cigares du Nicaragua à cape naturelle', 'Mélanges avec tabac oriental']
  },

  // ÉPICÉ - HERBES AROMATIQUES
  'Thym': {
    variants: ['Thym frais', 'Thym séché', 'Thym citronné', 'Thym sauvage'],
    pairings: {
      beverages: ['Vin blanc sec', 'Vermouth', 'Gin aromatique', 'Pastis'],
      foods: ['Olives', 'Fromages de chèvre', 'Tomates séchées', 'Grillades']
    },
    characteristics: 'Herbe aromatique avec des notes terreuses, légèrement florales et poivrées',
    foundIn: ['Certains cigares cubains légers', 'Cigares dominicains', 'Mélanges avec tabac Seco']
  },
  'Romarin': {
    variants: ['Romarin frais', 'Romarin séché', 'Romarin résineux', 'Romarin fleuri'],
    pairings: {
      beverages: ['Gin botaniques', 'Vin rouge de Provence', 'Grappa', 'Eau infusée'],
      foods: ['Agneau', 'Fromages de brebis', 'Légumes grillés', 'Focaccia']
    },
    characteristics: 'Arôme puissant et résineux avec des notes de pin et d\'eucalyptus',
    foundIn: ['Cigares des Canaries', 'Certains cigares nicaraguayens à cape claire', 'Mélanges avec tabac du bassin méditerranéen']
  },
  'Sauge': {
    variants: ['Sauge fraîche', 'Sauge officinale', 'Sauge anisée', 'Sauge séchée'],
    pairings: {
      beverages: ['Amaro', 'Vin blanc herbacé', 'Bière saison', 'Tisane'],
      foods: ['Veau', 'Pâtes aux herbes', 'Fromages affinés', 'Plats mijotés']
    },
    characteristics: 'Notes herbacées puissantes avec des aspects terreux et légèrement mentholés',
    foundIn: ['Certains cigares mexicains', 'Cigares honduriens légers', 'Mélanges avec tabac Burley']
  },
  'Origan': {
    variants: ['Origan frais', 'Origan séché', 'Origan grec', 'Origan mexicain'],
    pairings: {
      beverages: ['Vin rouge italien', 'Sangria', 'Limoncello', 'Soda aux herbes'],
      foods: ['Pizza', 'Pâtes tomate', 'Fromages à pâte molle', 'Antipasti']
    },
    characteristics: 'Arôme herbacé intense avec une légère amertume et des notes chaudes',
    foundIn: ['Cigares italiens', 'Certains cigares dominicains', 'Mélanges avec tabac Volado']
  },
  'Laurier': {
    variants: ['Laurier frais', 'Laurier séché', 'Laurier noble', 'Laurier aromatique'],
    pairings: {
      beverages: ['Vin rouge structuré', 'Porto blanc', 'Vermouth rouge', 'Tisane'],
      foods: ['Daube', 'Gibier', 'Fromages affinés', 'Plats en sauce']
    },
    characteristics: 'Notes aromatiques complexes, entre le thé, l\'eucalyptus et des notes légèrement amères',
    foundIn: ['Certains cigares cubains vieillis', 'Cigares dominicains Premium', 'Mélanges avec tabac Viso']
  },

  // TERREUX - CUIR
  'Cuir neuf': {
    variants: ['Cuir frais', 'Cuir tanné', 'Cuir clair', 'Cuir aromatique'],
    pairings: {
      beverages: ['Whisky Speyside', 'Jerez Fino', 'Bourbon traditionnel', 'Bière blonde'],
      foods: ['Viandes séchées', 'Fromages à pâte dure', 'Fruits secs', 'Chocolat au lait']
    },
    characteristics: 'Arôme de cuir frais, avec une certaine vivacité et des notes légèrement tanniques',
    foundIn: ['Cigares cubains jeunes', 'Certains cigares nicaraguayens', 'Mélanges avec tabac Habano']
  },
  'Cuir ancien': {
    variants: ['Cuir patiné', 'Cuir vieilli', 'Cuir ciré', 'Bibliothèque'],
    pairings: {
      beverages: ['Whisky single malt vieilli', 'Cognac XO', 'Porto vintage', 'Vin rouge vieilli'],
      foods: ['Viandes rouges', 'Fromages affinés longuement', 'Chocolat noir intense', 'Champignons sauvages']
    },
    characteristics: 'Plus doux que le cuir neuf, avec des nuances plus profondes et une légère patine',
    foundIn: ['Cigares cubains vieillis', 'Certains cigares dominicains premium', 'Mélanges avec cape Maduro']
  },
  'Sellerie': {
    variants: ['Cuir de selle', 'Cuir et huile', 'Cuir et poussière', 'Écurie'],
    pairings: {
      beverages: ['Bourbon haut de gamme', 'Scotch Highlands', 'Armagnac', 'Bière brune'],
      foods: ['Gibier', 'Fromages bleus', 'Chocolat noir épicé', 'Plats relevés']
    },
    characteristics: 'Évocation de cuir travaillé avec des notes animales discrètes et une certaine noblesse',
    foundIn: ['Cigares cubains classiques', 'Certains nicaraguayens premium', 'Mélanges avec tabac Ligero']
  },
  'Daim': {
    variants: ['Daim souple', 'Daim poudré', 'Daim neuf', 'Nubuck'],
    pairings: {
      beverages: ['Champagne rosé', 'Vin blanc de Bourgogne', 'Scotch fruité', 'Cocktail Manhattan'],
      foods: ['Poulet rôti', 'Fromages crémeux', 'Fruits rouges', 'Chocolat au lait']
    },
    characteristics: 'Version plus douce et veloutée du cuir, avec une texture aromatique plus fine',
    foundIn: ['Cigares dominicains légers', 'Certains cigares équatoriens', 'Mélanges avec cape Connecticut']
  },
  'Cuir tanné': {
    variants: ['Cuir robuste', 'Cuir travaillé', 'Cuir épais', 'Cuir de Cordoue'],
    pairings: {
      beverages: ['Vin rouge corsé', 'Whisky tourbé', 'Calvados', 'Bière Stout'],
      foods: ['Bœuf grillé', 'Fromages à croûte lavée', 'Chocolat noir corsé', 'Aubergines grillées']
    },
    characteristics: 'Notes plus intenses et complexes, avec des aspects presque fumés ou boisés',
    foundIn: ['Cigares nicaraguayens corsés', 'Mélanges avec triple ligero', 'Cigares à cape oscuro']
  },

  // TERREUX - TERRE
  'Humus': {
    variants: ['Terre riche', 'Compost noble', 'Sous-bois fertile', 'Terreau'],
    pairings: {
      beverages: ['Vin rouge Bourgogne', 'Whisky tourbé léger', 'Bière Trappiste', 'Porto Ruby'],
      foods: ['Champignons sauvages', 'Fromages persillés', 'Truffes', 'Plats rustiques']
    },
    characteristics: 'Évocation de matière végétale décomposée, riche et fertile',
    foundIn: ['Cigares cubains', 'Certains cigares dominicains vieillis', 'Mélanges avec tabac de la vallée de Jalapa']
  },
  'Terre humide': {
    variants: ['Pétrichor', 'Terre après la pluie', 'Argile humide', 'Sol humide'],
    pairings: {
      beverages: ['Saké', 'Vin rouge de Loire', 'Vodka pure', 'Eau de source'],
      foods: ['Légumes racines', 'Fromages de chèvre frais', 'Poissons d\'eau douce', 'Plats végétariens']
    },
    characteristics: 'Rappelle l\'odeur de la terre après la pluie, fraîche et minérale',
    foundIn: ['Certains cigares mexicains', 'Cigares nicaragua légers', 'Mélanges avec tabac Seco']
  },
  'Forêt après la pluie': {
    variants: ['Sous-bois', 'Bois humide', 'Mousse et lichen', 'Feuilles humides'],
    pairings: {
      beverages: ['Scotch Highland', 'Vin rouge léger', 'Gentiane', 'Bière blanche'],
      foods: ['Gibier à plumes', 'Fromages doux', 'Champignons', 'Plats herbacés']
    },
    characteristics: 'Combinaison complexe de terre humide, de végétation et de notes légèrement fongiques',
    foundIn: ['Cigares cubains moyens', 'Certains cigares dominicains', 'Mélanges avec cape Corojo']
  },
  'Champignons': {
    variants: ['Champignons frais', 'Champignons séchés', 'Truffe', 'Cèpes'],
    pairings: {
      beverages: ['Vin rouge vieilli', 'Xérès Oloroso', 'Whisky Speyside', 'Saké premium'],
      foods: ['Risotto', 'Viandes maturées', 'Fromages affinés', 'Plats umami']
    },
    characteristics: 'Notes terreuses et umami, avec une profondeur qui rappelle les champignons sauvages',
    foundIn: ['Cigares cubains vieillis', 'Certains cigares honduriens', 'Mélanges avec tabac Piloto Cubano']
  },

  // TERREUX - MINÉRAL
  'Pierre à fusil': {
    variants: ['Silex frotté', 'Pierre à feu', 'Minéral vif', 'Étincelle'],
    pairings: {
      beverages: ['Chablis', 'Vodka premium', 'Gin dry', 'Eau minérale gazeuse'],
      foods: ['Fruits de mer', 'Fromages de chèvre', 'Plats iodés', 'Crudités']
    },
    characteristics: 'Minéralité intense avec une trace métallique, comme deux pierres frottées ensemble',
    foundIn: ['Certains cigares cubains jeunes', 'Cigares du Nicaragua à cape claire', 'Mélanges avec tabac Vuelta Abajo']
  },
  'Craie': {
    variants: ['Craie sèche', 'Calcaire', 'Poudre minérale', 'Poussière blanche'],
    pairings: {
      beverages: ['Champagne Blanc de Blancs', 'Sauvignon blanc', 'Vodka froide', 'Eau très minérale'],
      foods: ['Huîtres', 'Fromages frais', 'Coquillages', 'Plats méditerranéens légers']
    },
    characteristics: 'Minéralité sèche et poudreuse, avec une légère astringence',
    foundIn: ['Cigares dominicains légers', 'Certains cigares équatoriens', 'Mélanges avec cape Connecticut très claire']
  },
  'Graphite': {
    variants: ['Mine de crayon', 'Graphite pur', 'Carbone', 'Minéral dense'],
    pairings: {
      beverages: ['Bordeaux', 'Whisky Japonais', 'Vin rouge structuré', 'Eau très minérale'],
      foods: ['Agneau', 'Fromages affinés', 'Plats méditerranéens', 'Olives noires']
    },
    characteristics: 'Minéralité avec des notes légèrement métalliques et une texture perçue comme dense',
    foundIn: ['Certains cigares nicaraguayens', 'Cigares cubains classiques', 'Mélanges avec tabac San Andrés']
  },
  'Silex': {
    variants: ['Pierre à feu', 'Minéral tranchant', 'Roche vive', 'Caillou frotté'],
    pairings: {
      beverages: ['Sancerre', 'Gin premium', 'Vodka glacée', 'Eau minérale froide'],
      foods: ['Crustacés', 'Fromages de chèvre secs', 'Tartares', 'Plats crus']
    },
    characteristics: 'Notes minérales vives et tranchantes, avec un aspect presque électrique',
    foundIn: ['Cigares cubains légers', 'Certains cigares du Honduras', 'Mélanges avec tabac Volado']
  },
  'Charbon': {
    variants: ['Braise froide', 'Charbon de bois', 'Cendre froide', 'Minéral brûlé'],
    pairings: {
      beverages: ['Vin rouge corsé', 'Whisky Islay', 'Bière Stout', 'Mezcal'],
      foods: ['Viandes grillées', 'Fromages fumés', 'Légumes charbonnés', 'Plats robustes']
    },
    characteristics: 'Minéralité sombre avec des aspects terreux profonds et une légère note de fumée froide',
    foundIn: ['Certains cigares nicaraguayens puissants', 'Cigares cubains moyens', 'Mélanges avec tabac Burley']
  },
};