import { FlavorCategory } from '../types/flavors';

export const CATEGORIES: Record<string, FlavorCategory> = {
  'Terre & Bois': {
    color: '#8B4513',
    items: [
      {
        name: 'Cèdre',
        description: 'Arôme boisé doux et légèrement épicé, signature des cigares premium',
        howToIdentify: 'Note dominante en début de fumée, rappelant l\'odeur d\'une cave à cigares bien entretenue'
      },
      {
        name: 'Chêne',
        description: 'Note boisée robuste et complexe, typique des cigares vieillis longuement',
        howToIdentify: 'Se développe en milieu de fumée, avec une sensation de bois noble et sec'
      },
      {
        name: 'Pin',
        description: 'Arôme résineux frais, apportant une dimension forestière',
        howToIdentify: 'Note légèrement acide et fraîche, souvent présente dans les cigares légers'
      },
      {
        name: 'Acajou',
        description: 'Boisé fin et légèrement sucré',
        howToIdentify: 'Subtilité boisée en milieu de fumée'
      },
      {
        name: 'Santal',
        description: 'Bois précieux aux notes douces et crémeuses',
        howToIdentify: 'Arôme boisé élégant avec une touche exotique'
      },
      {
        name: 'Terre Humide',
        description: 'Note minérale profonde évoquant l\'humus et le terroir',
        howToIdentify: 'Comme l\'odeur de la terre après la pluie, particulièrement présente dans les cigares cubains'
      },
      {
        name: 'Terre Sèche',
        description: 'Note poussiéreuse et minérale',
        howToIdentify: 'Rappelle un chemin de terre par temps sec'
      },
      {
        name: 'Cuir Neuf',
        description: 'Note riche et complexe, signe d\'un cigare bien construit',
        howToIdentify: 'Texture en bouche rappelant le cuir tanné, souvent accompagnée d\'une légère douceur'
      },
      {
        name: 'Tourbe',
        description: 'Arôme terreux intense avec des notes fumées',
        howToIdentify: 'Similaire aux whiskys tourbés, se développe en fin de fumée'
      },
      {
        name: 'Sous-bois',
        description: 'Mélange complexe de terre, de feuilles et d\'humus',
        howToIdentify: 'Évoque une promenade en forêt après la pluie'
      }
    ],
    gradient: ['#8B4513', '#654321'],
    howToIdentify: 'Ces notes fondamentales forment souvent la base du profil. Expirez lentement par le nez tout en gardant la fumée en bouche pour mieux les percevoir.'
  },
  'Épices': {
    color: '#D2691E',
    items: [
      {
        name: 'Poivre Noir',
        description: 'Épice mordante et complexe, signe d\'un cigare corsé',
        howToIdentify: 'Picotement caractéristique sur la langue et le palais'
      },
      {
        name: 'Poivre Blanc',
        description: 'Version plus subtile et raffinée du poivre',
        howToIdentify: 'Chaleur douce et épicée, moins agressive que le poivre noir'
      },
      {
        name: 'Poivre Rouge',
        description: 'Notes épicées chaudes avec une touche de fruits rouges',
        howToIdentify: 'Chaleur progressive avec une légère douceur'
      },
      {
        name: 'Cannelle',
        description: 'Épice douce et chaleureuse, apportant une note sucrée',
        howToIdentify: 'Chaleur douce sur la langue avec une légère sucrosité'
      },
      {
        name: 'Muscade',
        description: 'Note épicée chaude et boisée',
        howToIdentify: 'Arôme complexe mêlant chaleur et boisé'
      },
      {
        name: 'Safran',
        description: 'Épice exotique et subtile aux notes florales',
        howToIdentify: 'Légère note florale et épicée'
      },
      {
        name: 'Cardamome',
        description: 'Épice exotique aux notes fraîches et mentholées',
        howToIdentify: 'Fraîcheur épicée distinctive'
      },
      {
        name: 'Piment',
        description: 'Chaleur vive et persistante',
        howToIdentify: 'Sensation de chaleur qui monte progressivement'
      },
      {
        name: 'Cumin',
        description: 'Note épicée terrienne et chaude',
        howToIdentify: 'Arôme distinctif légèrement âcre'
      },
      {
        name: 'Clou de Girofle',
        description: 'Épice chaude et légèrement anesthésiante',
        howToIdentify: 'Sensation d\'engourdissement léger sur la langue'
      },
      {
        name: 'Coriandre',
        description: 'Note épicée fraîche et citronnée',
        howToIdentify: 'Fraîcheur herbacée avec une pointe d\'agrumes'
      }
    ],
    gradient: ['#D2691E', '#8B4513'],
    howToIdentify: 'Les épices se révèlent souvent en milieu de fumée. Faites rouler la fumée sur votre langue pour détecter les différentes notes.'
  },
  'Sucré': {
    color: '#DEB887',
    items: [
      {
        name: 'Caramel',
        description: 'Douceur riche et profonde, signe d\'un tabac bien fermenté',
        howToIdentify: 'Note sucrée naturelle, comme du caramel au beurre'
      },
      {
        name: 'Miel',
        description: 'Douceur florale et délicate',
        howToIdentify: 'Sucrosité légère et naturelle'
      },
      {
        name: 'Mélasse',
        description: 'Sucré profond et complexe avec des notes de réglisse',
        howToIdentify: 'Douceur intense et foncée'
      },
      {
        name: 'Vanille',
        description: 'Note douce et crémeuse, typique des cigares premium',
        howToIdentify: 'Arôme doux et rond'
      },
      {
        name: 'Chocolat Noir',
        description: 'Sucré amer sophistiqué',
        howToIdentify: 'Note cacaotée avec une amertume plaisante'
      },
      {
        name: 'Chocolat au Lait',
        description: 'Sucré gourmand et crémeux',
        howToIdentify: 'Note sucrée douce et lactée'
      },
      {
        name: 'Caramel Salé',
        description: 'Sucré complexe avec une touche saline',
        howToIdentify: 'Douceur contrebalancée par une pointe de sel'
      },
      {
        name: 'Sirop d\'Érable',
        description: 'Sucré boisé et complexe',
        howToIdentify: 'Douceur qui rappelle le bois sucré'
      },
      {
        name: 'Pain d\'Épices',
        description: 'Mélange de sucré et d\'épices douces',
        howToIdentify: 'Douceur épicée caractéristique'
      }
    ],
    gradient: ['#DEB887', '#CD853F'],
    howToIdentify: 'Les notes sucrées sont subtiles et naturelles. Cherchez-les particulièrement en début de tirage et en rétro-olfaction.'
  },
  'Torréfié': {
    color: '#8B4513',
    items: [
      {
        name: 'Café Noir',
        description: 'Note torréfiée équilibrée, signe d\'une belle maturation',
        howToIdentify: 'Comme l\'arôme d\'un café fraîchement moulu'
      },
      {
        name: 'Espresso',
        description: 'Version intense du café, avec des notes amères plaisantes',
        howToIdentify: 'Plus intense que le café, avec une légère amertume'
      },
      {
        name: 'Café Crème',
        description: 'Notes torréfiées adoucies par une touche crémeuse',
        howToIdentify: 'Torréfaction douce avec une finale soyeuse'
      },
      {
        name: 'Cacao Pur',
        description: 'Note profonde de cacao non sucré',
        howToIdentify: 'Amertume noble rappelant le cacao à 100%'
      },
      {
        name: 'Amande Grillée',
        description: 'Arôme de fruits secs torréfiés',
        howToIdentify: 'Note gourmande et grillée'
      },
      {
        name: 'Noisette Torréfiée',
        description: 'Note grillée douce et ronde',
        howToIdentify: 'Arôme chaleureux de fruits secs grillés'
      },
      {
        name: 'Pain Grillé',
        description: 'Note céréalière torréfiée',
        howToIdentify: 'Rappelle la croûte du pain bien cuit'
      },
      {
        name: 'Malt',
        description: 'Note céréalière torréfiée douce',
        howToIdentify: 'Comme un whisky single malt léger'
      }
    ],
    gradient: ['#A0522D', '#7E3517'], // Brun-roux à café torréfié
    howToIdentify: 'Ces notes se développent souvent en milieu et fin de fumée. La rétro-olfaction est essentielle pour les apprécier pleinement.'
  },
  'Floral': {
    color: '#9932CC',
    items: [
      {
        name: 'Rose',
        description: 'Note florale délicate et sophistiquée',
        howToIdentify: 'Parfum subtil rappelant les pétales de rose fraîche'
      },
      {
        name: 'Jasmin',
        description: 'Arôme floral intense et exotique',
        howToIdentify: 'Note florale prononcée avec une touche de miel'
      },
      {
        name: 'Fleur d\'Oranger',
        description: 'Note florale fraîche et légèrement sucrée',
        howToIdentify: 'Délicate fragrance d\'agrumes et de fleurs'
      },
      {
        name: 'Lavande',
        description: 'Aromatique et herbacée',
        howToIdentify: 'Note florale sèche et parfumée'
      },
      {
        name: 'Violette',
        description: 'Florale délicate et poudrée',
        howToIdentify: 'Note subtile et raffinée'
      },
      {
        name: 'Géranium',
        description: 'Note florale verte et fraîche',
        howToIdentify: 'Arôme floral avec une touche herbacée'
      },
      {
        name: 'Ylang-Ylang',
        description: 'Floral exotique et capiteux',
        howToIdentify: 'Note florale riche et crémeuse'
      },
      {
        name: 'Lilas',
        description: 'Florale printanière et délicate',
        howToIdentify: 'Note douce et légèrement poudrée'
      }
    ],
    gradient: ['#BA55D3', '#9932CC'], // Violet orchidée à violet profond
    howToIdentify: 'Les notes florales sont plus présentes en début de fumée. Respirez doucement la fumée par le nez pour les détecter.'
  },
  'Fruits': {
    color: '#FF8C00',
    items: [
      {
        name: 'Agrumes',
        description: 'Notes vives et fraîches d\'orange et citron',
        howToIdentify: 'Fraîcheur acidulée en début de fumée'
      },
      {
        name: 'Orange Confite',
        description: 'Agrume sucré et confit',
        howToIdentify: 'Douceur d\'orange avec une pointe d\'amertume'
      },
      {
        name: 'Citron Vert',
        description: 'Note fraîche et vive',
        howToIdentify: 'Acidité rafraîchissante'
      },
      {
        name: 'Raisins Secs',
        description: 'Notes concentrées et vineuses',
        howToIdentify: 'Douceur naturelle de raisin séché'
      },
      {
        name: 'Figue Séchée',
        description: 'Fruit sec riche et miellé',
        howToIdentify: 'Douceur concentrée et complexe'
      },
      {
        name: 'Datte',
        description: 'Note sucrée profonde et riche',
        howToIdentify: 'Sucrosité naturelle intense'
      },
      {
        name: 'Prune',
        description: 'Fruit charnu et juteux',
        howToIdentify: 'Note fruitée ronde et sucrée'
      },
      {
        name: 'Mûre',
        description: 'Notes de fruits noirs sauvages',
        howToIdentify: 'Comme des baies fraîches cueillies'
      },
      {
        name: 'Cassis',
        description: 'Baie noire intense et complexe',
        howToIdentify: 'Note fruitée profonde et légèrement acidulée'
      },
      {
        name: 'Cerise Noire',
        description: 'Fruit rouge profond et charnu',
        howToIdentify: 'Note fruitée intense avec une pointe d\'amande'
      }
    ],
    gradient: ['#FFA500', '#D2691E'],
    howToIdentify: 'Les notes fruitées sont plus évidentes en début de fumée. Elles se mêlent souvent aux notes sucrées.'
  },
  'Herbacé': {
    color: '#228B22',
    items: [
      {
        name: 'Foin Frais',
        description: 'Aromatique et vert, évoquant les champs fraîchement coupés',
        howToIdentify: 'Note fraîche au nez, souvent au démarrage'
      },
      {
        name: 'Foin Sec',
        description: 'Note herbacée séchée et douce',
        howToIdentify: 'Rappelle une grange en été'
      },
      {
        name: 'Thé Vert',
        description: 'Note végétale douce et apaisante',
        howToIdentify: 'Subtilité herbacée, légère amertume en bouche'
      },
      {
        name: 'Menthe Poivrée',
        description: 'Fraîcheur vivifiante intense',
        howToIdentify: 'Sensation très fraîche en bouche'
      },
      {
        name: 'Menthe Verte',
        description: 'Fraîcheur plus douce et herbacée',
        howToIdentify: 'Fraîcheur végétale naturelle'
      },
      {
        name: 'Basilic',
        description: 'Note herbacée légèrement épicée',
        howToIdentify: 'Arôme vert distinctif'
      },
      {
        name: 'Sauge',
        description: 'Herbacée aromatique et complexe',
        howToIdentify: 'Note verte légèrement médicinale'
      },
      {
        name: 'Romarin',
        description: 'Note herbacée résineuse',
        howToIdentify: 'Arôme proche du pin mais plus délicat'
      },
      {
        name: 'Herbe Fraîche',
        description: 'Note verte et vivifiante',
        howToIdentify: 'Comme l\'odeur d\'une pelouse fraîchement coupée'
      }
    ],
    gradient: ['#228B22', '#006400'],
    howToIdentify: 'Les notes herbacées sont légères, perçues surtout en début de fumée et en rétro-olfaction.'
  },
  'Minéral': {
    color: '#708090',
    items: [
      {
        name: 'Sel Marin',
        description: 'Note salée pure et iodée',
        howToIdentify: 'Sensation saline rappelant l\'air marin'
      },
      {
        name: 'Sel de Roche',
        description: 'Note minérale salée plus terrienne',
        howToIdentify: 'Salinité sèche et minérale'
      },
      {
        name: 'Graphite',
        description: 'Aromatique et sèche, légèrement métallique',
        howToIdentify: 'Rappel d ardoise ou de crayon à papier'
      },
      {
        name: 'Craie',
        description: 'Note sèche et crayeuse',
        howToIdentify: 'Sensation minérale poussiéreuse'
      },
      {
        name: 'Pierre à Fusil',
        description: 'Note minérale vive et métallique',
        howToIdentify: 'Comme une étincelle en bouche'
      },
      {
        name: 'Ardoise',
        description: 'Minéralité sèche et complexe',
        howToIdentify: 'Note pierreuse distinctive'
      }
    ],
    gradient: ['#708090', '#4A5D6A'], // Gris ardoise à gris-bleu profond
    howToIdentify: 'Les notes minérales sont plus subtiles, perçues en milieu de fumée et souvent en arrière-plan.'
  },
  'Animal': {
    color: '#A0522D', // Changement de la couleur de base pour un brun cuir plus naturel
    items: [
      {
        name: 'Musc',
        description: 'Note animale complexe et puissante',
        howToIdentify: 'Arôme chaud et animal caractéristique'
      },
      {
        name: 'Cuir Vieilli',
        description: 'Note riche et profonde de cuir patiné',
        howToIdentify: 'Plus intense et complexe que le cuir neuf'
      },
      {
        name: 'Viande Fumée',
        description: 'Note salée et charnue',
        howToIdentify: 'Évoque un barbecue sophistiqué'
      },
      {
        name: 'Gibier',
        description: 'Note animale sauvage',
        howToIdentify: 'Rappelle la venaison'
      },
      {
        name: 'Ambre Gris',
        description: 'Note animale marine et complexe',
        howToIdentify: 'Arôme marin chaleureux'
      }
    ],
    gradient: ['#8B0000', '#4B0082'],
    howToIdentify: 'Les notes animales émergent souvent en fin de fumée, avec une certaine rondeur et complexité.'
  },
  'Fermenté': {
    color: '#8B7500',
    items: [
      {
        name: 'Tabac Fermenté',
        description: 'Arôme signature de la fermentation longue',
        howToIdentify: 'Parfum profond et rond au nez'
      },
      {
        name: 'Pain au Levain',
        description: 'Note fermentée, légèrement aigre-douce',
        howToIdentify: 'Rappel des boulangeries artisanales'
      },
      {
        name: 'Vinaigre Balsamique',
        description: 'Note acide et sucrée complexe',
        howToIdentify: 'Acidité noble et concentrée'
      },
      {
        name: 'Kombucha',
        description: 'Note fermentée fraîche et légère',
        howToIdentify: 'Légère acidité rafraîchissante'
      },
      {
        name: 'Kimchi',
        description: 'Note fermentée épicée',
        howToIdentify: 'Fermentation vive et complexe'
      }
    ],
    gradient: ['#8B7500', '#654321'],
    howToIdentify: 'Les notes fermentées sont très distinctives, perçues surtout au nez et en début de dégustation.'
  },
  'Alcools & Spiritueux': {
    color: '#722F37',
    items: [
      {
        name: 'Rhum',
        description: 'Note sucrée et complexe de canne fermentée',
        howToIdentify: 'Douceur caractéristique du rhum vieilli'
      },
      {
        name: 'Whisky',
        description: 'Notes céréalières et boisées',
        howToIdentify: 'Complexité maltée et tourbée'
      },
      {
        name: 'Cognac',
        description: 'Notes fruitées et boisées élégantes',
        howToIdentify: 'Chaleur sophistiquée en bouche'
      },
      {
        name: 'Porto',
        description: 'Notes vineuses et fruits confits',
        howToIdentify: 'Douceur vineuse caractéristique'
      },
      {
        name: 'Xérès',
        description: 'Notes oxydatives et fruits secs',
        howToIdentify: 'Complexité sèche et noisettée'
      }
    ],
    gradient: ['#722F37', '#451E22'], // Deep burgundy to dark wine colors
    howToIdentify: 'Ces notes apparaissent souvent dans les cigares vieillis en fût ou naturellement complexes.'
  },
  'Fruits Secs & Noix': {
    color: '#DEB887',
    items: [
      {
        name: 'Amande',
        description: 'Note douce et crémeuse',
        howToIdentify: 'Douceur subtile et raffinée'
      },
      {
        name: 'Noix',
        description: 'Note boisée et huileuse',
        howToIdentify: 'Rappelle les cerneaux frais'
      },
      {
        name: 'Noix de Pécan',
        description: 'Note douce et beurrée',
        howToIdentify: 'Plus riche que la noix simple'
      },
      {
        name: 'Pistache',
        description: 'Note verte et crémeuse',
        howToIdentify: 'Légèrement sucrée et herbacée'
      },
      {
        name: 'Noisette',
        description: 'Note douce et ronde',
        howToIdentify: 'Gourmandise naturelle'
      }
    ],
    gradient: ['#DEB887', '#8B4513'],
    howToIdentify: 'Ces notes sont souvent présentes en milieu de fumée, apportant une dimension crémeuse.'
  }
};