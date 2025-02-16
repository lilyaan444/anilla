import { useTranslation } from '../hooks/useTranslation';

export const useCigarData = () => {
  const { t } = useTranslation();

  const origins = [
    t('origins.cuba'),
    t('origins.dominicanRepublic'),
    t('origins.nicaragua'),
    t('origins.honduras'),
    t('origins.mexico'),
    t('origins.brazil'),
    t('origins.costaRica'),
    t('origins.ecuador'),
    t('origins.peru'),
    t('origins.colombia'),
    t('origins.panama'),
    t('origins.indonesia'),
    t('origins.cameroon'),
    t('origins.philippines'),
    t('origins.jamaica'),
    t('origins.usa'),
  ];

  const formats = [
    t('formats.robusto'),
    t('formats.corona'),
    t('formats.churchill'),
    t('formats.toro'),
    t('formats.gordo'),
    t('formats.lancero'),
    t('formats.petitCorona'),
    t('formats.doubleCorona'),
    t('formats.belicoso'),
    t('formats.torpedo'),
    t('formats.perfecto'),
    t('formats.pyramide'),
    t('formats.culebra'),
    t('formats.panatela'),
    t('formats.rothschild'),
    t('formats.lonsdale'),
    t('formats.ninfas'),
    t('formats.diadema'),
    t('formats.presidente'),
    t('formats.gigante'),
  ];

  const flavorKeywords = [
    // Saveurs principales
    t('flavors.earthy'),
    t('flavors.woody'),
    t('flavors.spicy'),
    t('flavors.sweet'),
    t('flavors.creamy'),
    t('flavors.nutty'),
    t('flavors.leather'),
    t('flavors.coffee'),
    t('flavors.chocolate'),
    t('flavors.cedar'),
    t('flavors.pepper'),
    t('flavors.vanilla'),
    t('flavors.floral'),
    t('flavors.citrus'),
    t('flavors.caramel'),
    // Saveurs supplémentaires
    t('flavors.almond'),
    t('flavors.cinnamon'),
    t('flavors.cocoa'),
    t('flavors.honey'),
    t('flavors.molasses'),
    t('flavors.oak'),
    t('flavors.pineNuts'),
    t('flavors.raisins'),
    t('flavors.roasted'),
    t('flavors.tobacco'),
    t('flavors.walnut'),
    t('flavors.herbal'),
    t('flavors.mineral'),
    t('flavors.musty'),
    t('flavors.nutmeg'),
    t('flavors.peanut'),
    t('flavors.blackPepper'),
    t('flavors.redPepper'),
    t('flavors.toast'),
    t('flavors.hay'),
    t('flavors.grass'),
    t('flavors.barnyard'),
    t('flavors.malt'),
    t('flavors.espresso'),
    t('flavors.clove'),
  ];

  return {
    origins,
    formats,
    flavorKeywords,
  };
};