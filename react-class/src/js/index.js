async function getPage(URL) {
  try {
    const RESPONSE = await fetch(URL);
    const TEXT_HTML = await RESPONSE.text();
    const TEXT_HTML_TRIMMED = TEXT_HTML.trim();
    const PARSER = new DOMParser();
    const PAGE = PARSER.parseFromString(TEXT_HTML_TRIMMED, 'text/html');

    return PAGE;
  } catch (err) {
    console.err(err);
  }
}

function splitRate(elRate) {
  try {
    let results = [];

    if (elRate === null) {
      results = [elRate, elRate];
    } else {
      results = elRate.title
        .split('-')
        .map((val) => val.trim())
        .reduce((acc, val) => {
          const [VALUE] = val.split(/(\/|\s)/);
          acc.push(VALUE);
          return acc;
        }, []);
    }

    return results;
  } catch (err) {
    console.error(err);
  }
}

async function getProductInfo(URL) {
  try {
    const PAGE = await getPage(URL);
    const TITLE = PAGE.getElementById('name').textContent.trim();
    const IMG_LINKS = [
      ...PAGE.getElementsByClassName('lazy img-responsive'),
    ].map((val) => val.dataset.lazyload);
    const EL_RATE =
      PAGE.querySelector('#product-summary-header .stars') || null;
    const [STAR, REVIEW] = splitRate(EL_RATE);
    const STOCK_STATE = PAGE.querySelector(
      '#stock-status > *:first-child',
    ).textContent.trim();
    const ORIGINAL_PRICE = PAGE.getElementById('price').textContent.trim();
    const REDUCED_PRICE = PAGE.querySelector('#pricing b')
      ? PAGE.querySelector('#pricing b').textContent.trim()
      : '0';
    const SUGGESTED_USE =
      PAGE.getElementsByClassName('prodOverviewDetail')[0].textContent.trim();
    const SUP_TABLE = PAGE.querySelector('.supplement-facts-container');

    const PRODUCT = {
      TITLE,
      IMG_LINKS,
      URL,
      REVIEW,
      STAR,
      STOCK_STATE,
      ORIGINAL_PRICE,
      REDUCED_PRICE,
      SUGGESTED_USE,
      SUP_TABLE,
      isChecked: false,
    };

    return PRODUCT;
  } catch (err) {
    console.error(err);
  }
}

function getLastPageNum(page) {
  try {
    const EL_PAGE_NUMS = page.getElementsByClassName('pagination-link');

    return EL_PAGE_NUMS.length === 0
      ? 1
      : EL_PAGE_NUMS[EL_PAGE_NUMS.length - 1].textContent.trim() * 1;
  } catch (err) {
    console.error(err);
  }
}

function getProductUrls(page) {
  try {
    return [...page.querySelectorAll('.products .product-link')].map(
      (val) => val.href,
    );
  } catch (err) {
    console.error(err);
  }
}

function assembleQuery(queryParam) {
  try {
    let queryString = '?';

    for (const KEY in queryParam) {
      const VALUE = queryParam[KEY];

      if (VALUE !== null) {
        queryString += `${KEY}=${VALUE}&`;
      }
    }

    return queryString.slice(0, -1);
  } catch (err) {
    console.err(err);
  }
}

async function searchKeyword(URL, queryParam) {
  try {
    const MY_URL = URL + assembleQuery(queryParam);
    const PAGE = await getPage(MY_URL);
    let result;

    if (PAGE.getElementsByClassName('no-results')[0]) {
      result = null;
    } else {
      const LAST_PAGE_NUM = getLastPageNum(PAGE);
      const PRODUCT_URLS = getProductUrls(PAGE);

      result = {
        LAST_PAGE_NUM,
        PRODUCT_URLS,
      };
    }

    return result;
  } catch (err) {
    console.error(err);
  }
}

async function searchPage(URL, queryParam) {
  try {
    const MY_URL = URL + assembleQuery(queryParam);
    const PAGE = await getPage(MY_URL);

    return getProductUrls(PAGE);
  } catch (err) {
    console.err(err);
  }
}

export { searchKeyword, getProductInfo, searchPage, getPage, getLastPageNum };

// function checkIngredient(content) {
//   const INGREDIENTS = [
//     'bovine',
//     'bovine gelatin',
//     'beef gelatin',
//     'cow gelatin',
//     'Raspberry Ketones',
//     'Pygeum',
//     'Magnolia Bark Extract',
//     'sibutramine',
//     'CBD',
//     'Cannabidiol',
//     'White willow bark',
//     'Goldenseal Root Extract',
//     'Lithium',
//     'mucuna pruriens seed extract',
//     'Slippery Elm Bark',
//     'Azorubine',
//     'collagen',
//     'gelatin',
//     'BSE',
//     'glutathione',
//     '5-HTP',
//     '5-hydroxytryptophan',
//     'Griffonia',
//     'Griffonia simplicifolia seed extract',
//     'Acetyl-L-carnitine',
//     'N-Acetyl-L-Carnitine 3',
//     'Agmatine Sulfate',
//     'Agmapure',
//     'Alpha-Lipoic Acid',
//     'ALA',
//     'α-Lipoic acid,',
//     'R-Lipoic acid',
//     'Lipoic acid',
//     'Aphanizomenon flos-aquae',
//     'AFA',
//     'Microcystin',
//     'Arachidonic acid',
//     'Bacopa',
//     'Brahmi',
//     'Berberine',
//     'Black Cohosh',
//     'black snake root',
//     'Actaea racemosa',
//     'Cimicifuga recomosa',
//     'Buckthorn',
//     'Rhamnus frangula bark',
//     'Butea superba',
//     'Creeping butea',
//     'Butea gum tree',
//     'Redkwaokrua',
//     'Butterfly Pea',
//     "Cat's Claw",
//     'Uncaria Tomentosa',
//     'Catuaba',
//     'Charcoal',
//     'Activated charcoal',
//     'Chromium Picolinate',
//     'Citicoline',
//     'cognizen',
//     'Clubmoss Extract',
//     'Clubmoss',
//     'Chinese Clubmoss',
//     "Colt's foot",
//     'Coltsfoot',
//     'Farfarae flos',
//     "Ass's foot",
//     "Bull's foot",
//     'Coughwort',
//     'Farfara',
//     "Foal's Wort",
//     'Fieldhove',
//     'Horse hoof',
//     'Horse-foot',
//     'Horse-shoe',
//     'Horsehoof',
//     'Tussilago farfara Linne',
//     "Devil's Claw Root",
//     'Harpagophytum procumbens',
//     'DHEA',
//     'Dehydroepiandrosterone',
//     'Diindolylmethane',
//     'DIM',
//     'Diosmin',
//     'Echinacea spp',
//     'Epimedium sagittatum',
//     'Epimedium Grandiflorum',
//     'Horny goat weed',
//     'Forsythia suspensa extract',
//     'Forsythia suspensa Fruit',
//     'Fur Seal',
//     'Gamma-aminobutyric acid',
//     'GABA',
//     'Garcinia Quaesita',
//     'Germanium',
//     'Goldenseal Root',
//     'OX-EYE DAISY',
//     'Guggul Extract',
//     'Guggul resin',
//     'guggulsterones',
//     'Gymnema Sylvestre',
//     'Hemp',
//     'Cannabis sativa L.',
//     'Histamine',
//     'Histamine Hydrochloride',
//     'Histamine HCl',
//     'Horse Chestnut',
//     'Icariin',
//     'Indian Snake Root',
//     'Rauwolfia serpentina',
//     'kaempferia parviflora',
//     'Kava kava',
//     'kawa kawa',
//     'Kavain',
//     'L-citrulline',
//     'Citrulline Malate',
//     'Lobelia',
//     'Rhodea japonica Roth',
//     'Longjack',
//     'Eurycoma Longifolia',
//     'Tongkat Ali',
//     'L-ornithine',
//     'L-Selenomethionine',
//     'Magnesium citrate',
//     'Magnolia',
//     'magnolia officinalis',
//     'magnolia officinalis Extract',
//     'Mamushi',
//     'Melatonin',
//     'Methylcobalamin',
//     'Methyl-B12',
//     'Active-B12',
//     'L-dopa',
//     'Montanoa',
//     'Montanoa Tomentosa',
//     'Muira Puama',
//     'Ptychopetalum olacoides',
//     'N-acetyl-cysteine',
//     'NAC',
//     'N-acetyl-L-cysteine',
//     'Orlistat',
//     'Para-aminobenzoic acid',
//     'PABA',
//     'Phellodendri Cortex',
//     'Phellodendron',
//     'Phellodendron bark',
//     'Phellodendron amurense Ruprecht',
//     'Phellodendron chinense',
//     'Schneider',
//     'Phenylethylamine',
//     'PEA',
//     'β-Phenylethylamine',
//     'β-PEA,',
//     '2-Phenethylamine',
//     'β-phenethylamine·Hydrochloride',
//     'β-PEA·HCl',
//     'Pinellia Tuber',
//     'Pinellia ternata Breitenbach',
//     'Pomegranate Seed',
//     'Pomegranate bark',
//     'Poppy',
//     'Papaver somniferum',
//     'Pueraria mirifica',
//     'Pygeum Africanum',
//     'Pygeum Africanum bark',
//     'Raspberry Ketone',
//     'Rhubarb',
//     'Rheum palmatum',
//     'Rheum tanguticum',
//     'Rheum officinale Bailon',
//     'Salacia',
//     'Scorpion',
//     'scorpio',
//     'Buthus martensii Karsch',
//     'Senna',
//     'Silver',
//     'Slippery Elm',
//     'Ulmus rubra',
//     'Synephrine',
//     'Vervain',
//     'Verbena',
//     'Verbanalin',
//     'Vinpocetine',
//     'Vinca minor',
//     'lesser periwinkle',
//     'Vitamin K2',
//     'Menaquinone',
//     'MK-4',
//     'MK-7',
//     'White willow',
//     'Salix Alba',
//     'Wild Yam',
//     'Yohimbe',
//     'Yohimbin',
//     'Zinc citrate',
//     'E131 Patent blue V',
//     'Mucuna Pruriens seed',
//     'Magnesium glycinate',
//     'Magnesium diglycinate',
//     'Magnesium bisglycinate',
//     '1,3-dimethylamylamine',
//     'DMAA',
//     '1,3-dimethylbutylamine',
//     'DMBA',
//     'Acetaminotadalafil',
//     'Acetyl acid',
//     'Acetylvardenafil',
//     'Adrenaline',
//     'Epinephrine',
//     'Ajuga Decumbens',
//     'Aminotadalafil',
//     'Anemarrhennae asphodelides',
//     'Avanafil',
//     'Belladonna',
//     'Atropa belladonna',
//     'Benzylsildenafil',
//     'Bergenin',
//     'Buchu leaf',
//     'Agathosma betulina',
//     'Agathosma creunlata',
//     'Caesalpinia Benthamiana',
//     'Carbodenafil',
//     'Cascara sagrada',
//     'Cascaroside',
//     'Cha De bugre',
//     'Cha De bugre herb powder',
//     'Chlorodenafil',
//     'Chloropretadalafil',
//     'Chlorosibutramine',
//     'Chlorosipentramine',
//     'Chromium Argninate',
//     'Cinnamyldenafil',
//     'Cis-cyclopentyltadalafil',
//     'Cordia Salicifolia',
//     'Couch Grass',
//     'Agropyron repens',
//     'Elymus repens',
//     'Cyanotis Vaga',
//     'Cyclopentynafil',
//     'D-chlorpheniramine',
//     'Demethylhongdenafil',
//     'Demethyltadalafil',
//     'Descarbonsildenafil',
//     'desmethylcarbodenafil',
//     'Desmethylsibutramine',
//     'Desulfovardenafil',
//     'Dexamethasone',
//     'Dichlorodenafil',
//     'Didesmethylsibutramine',
//     'Dimethylsildenafil',
//     'Dimethylthiosildenafil',
//     'Dithiopropylcarbodenafil',
//     'Dolmite',
//     'DNP',
//     'dinitrophenyl',
//     'Dinitrophenol',
//     'Ebony',
//     'Ephedrine',
//     'Fenfluramine',
//     'Fluoxetine',
//     'Fucoxanthin',
//     'Furosemide',
//     'Gelsemium Sempervirens',
//     'Gendenafil',
//     'Glibenclamide',
//     'Gliclazide',
//     'Glimepiride',
//     'Glipizide',
//     'Gravel Root',
//     'Homosildenafil',
//     'homotadalafil',
//     'Hongdenafil',
//     'Hoodia Cactus powder',
//     'Hoodia Gordonii',
//     'Hydroxychlorodenafil',
//     'Hydroxyhomosildenafil',
//     'Hydroxyhongdenafil',
//     'Hydroxythiohomosildenafil',
//     'Hydroxyvardenafil',
//     'Imidazosagtriazinone',
//     'Isopropylnortadalafil',
//     'Levothyroxine',
//     'Ligustrum Berry',
//     'Liothyronine',
//     'Lumbrokinase',
//     'Methylhydroxyhomosildenafil',
//     'Mirodenafil',
//     'Nitrodenafil',
//     'N-nitrosofenfluramine',
//     'N-octylnortadalafil',
//     'Norneosildenafil',
//     'Norneovardenafil',
//     'Oxilofrine',
//     'Oxohongdenafil',
//     'Phenolphthalein',
//     'Piperidinohongdenafil',
//     'Prickly Chaff',
//     'Achyranthes aspera',
//     'Achyranthes aspera flower',
//     'Achyranthes aspera flower Extract',
//     'Propoxyphenyl-thioaildenafil',
//     'Propoxyphenylthiohomosildenafil',
//     'Propoxyphenylthiohydroxyhomosildenafil',
//     'Propoxyphenylthiosildenafil',
//     'Pseudovardenafil',
//     'Radix morindae officinalis',
//     'Red root bark',
//     'quinna tree bark',
//     'cichona bark',
//     'PavonetKlotzsch',
//     'Rhaponticum Carthamoides',
//     'Seman Pruni',
//     'Sennoside',
//     'Sibutramine',
//     'Sildenafil',
//     'Tadalafil',
//     'Thiohomosildenafil',
//     'Thioquinapiperifil',
//     'Thiosildenafil',
//     'Trans-cyclopentyltadalafil',
//     'Trichopus Zeylanicus',
//     'Udenafil',
//     'Vardenafil',
//     'Veratrum',
//     'White Hellebore',
//     'Veratri Rhizoma et Radix',
//     'Xanthoanthrafil',
//     'β-methylphenethylamine·Hydrochloride',
//     'β-MPEA·HCl',
//     'β-methylphenethylamine',
//     'β-MPEA',
//     'Orthosiphon stamineus',
//     'sildenafil',
//     'tadalafil',
//     'vardenafil',
//     'udenafil',
//     'mirodenafil',
//     'avanafil',
//     'homosildenafil',
//     'hongdenafil',
//     'hydroxy homosildenafil',
//     'amino tadalafil',
//     'pseudo-vardenafil',
//     'hydroxy hongdenafil',
//     'dimethylsildenafil',
//     'xanthoanthrafil',
//     'hydroxyvadenafil',
//     'norneosildenafil',
//     'demethylhongdenafil',
//     'piperidinohongdenafil',
//     'carbodenafil',
//     'thiosildenafil',
//     'dimethylthiosildenafil',
//     'acetylvardenafil',
//     'benzylsildenafil',
//     'norneovardenafil',
//     'oxohongdenafil',
//     'thiohomosildenafil',
//     'desulfovardenafil',
//     'nitrodenafil',
//     'cyclopentynafil',
//     'octylnortadalafil',
//     'cinnamyldenafil',
//     'thioquinapiperifil',
//     'hydroxythiohomosildenafil',
//     'chloropretadalafil',
//     'hydroxychlorodenafil',
//     'dichlorodenafil',
//     'demethyltadalafil',
//     'acetaminotadalafil',
//     'methylhydroxyhomosildenafil',
//     'propoxyphenylthiosildenafil',
//     'propoxyphenylthiohydroxyhomosildenafil',
//     'propoxyphenylthioaildenafil',
//     'acetyl acid',
//     'gendenafil',
//     'imidazosagatriazinone',
//     'cis-cyclopentyltadalafil',
//     'trans-cyclopentyltadalafil',
//     'descarbonsildenafil',
//     'orlistat',
//     'desmethylsibutramine',
//     'didesmethylsibutramine',
//     'chlorosibutramine',
//     'glibenclamide',
//     'gliclazide',
//     'glimepiride',
//     'glipizide',
//     'T3',
//     'T4',
//     'ephedrine',
//     'fluoxetine',
//     'fenfluramine',
//     'phenolphthaleine',
//     'yohimbine',
//     'icarine',
//     'sennoside',
//     'cascaroside',
//     'chelated',
//     'chelate',
//     'chelated magnesium',
//     'Cassia occidentalis',
//     'Terminalia arjuna',
//     'Andrographis',
//     'Phyllanthus amarus',
//     'Shilajit',
//     'Echinacea',
//     'Forsythia',
//     'Tejocote root',
//     'Crataegus mexicana',
//   ];
// }
