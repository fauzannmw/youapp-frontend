import {
  TbZodiacAries,
  TbZodiacTaurus,
  TbZodiacGemini,
  TbZodiacCancer,
  TbZodiacLeo,
  TbZodiacVirgo,
  TbZodiacLibra,
  TbZodiacScorpio,
  TbZodiacSagittarius,
  TbZodiacCapricorn,
  TbZodiacAquarius,
  TbZodiacPisces,
} from "react-icons/tb";

import {
  GiBuffaloHead,
  GiChicken,
  GiGoat,
  GiHorseHead,
  GiMonkey,
  GiPig,
  GiRabbit,
  GiRat,
  GiSeaDragon,
  GiSittingDog,
  GiSnake,
  GiTiger,
} from "react-icons/gi";


export function checkIsEmail(input: string): boolean {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(input);
}

export function capitalizeFirstLetter(letter: string) {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}

export function calculateAge(
  birthDay: number,
  birthMonth: number,
  birthYear: number
) {
  let today = new Date();
  let birthDate = new Date(birthYear, birthMonth - 1, birthDay);

  if (birthDate > today) {
    return "Invalid Date";
  }

  let age = today.getFullYear() - birthYear;
  let monthDiff = today.getMonth() - birthMonth;
  let dayDiff = today.getDate() - birthDay;

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

export const getHoroscopeIcon = (horoscope: string) => {
  switch (horoscope.toLowerCase()) {
    case "aries":
      return <TbZodiacAries />;
    case "taurus":
      return <TbZodiacTaurus />;
    case "gemini":
      return <TbZodiacGemini />;
    case "cancer":
      return <TbZodiacCancer />;
    case "leo":
      return <TbZodiacLeo />;
    case "virgo":
      return <TbZodiacVirgo />;
    case "libra":
      return <TbZodiacLibra />;
    case "scorpio":
      return <TbZodiacScorpio />;
    case "sagittarius":
      return <TbZodiacSagittarius />;
    case "capricorn":
      return <TbZodiacCapricorn />;
    case "aquarius":
      return <TbZodiacAquarius />;
    case "pisces":
      return <TbZodiacPisces />;
    default:
      return null;
  }
};
export const getChineseZodiacIcon = (zodiac: string) => {
  switch (zodiac) {
    case "Rat":
      return <GiRat />;
    case "Ox":
      return <GiBuffaloHead />;
    case "Tiger":
      return <GiTiger />;
    case "Rabbit":
      return <GiRabbit />;
    case "Dragon":
      return <GiSeaDragon />;
    case "Snake":
      return <GiSnake />;
    case "Horse":
      return <GiHorseHead />;
    case "Goat":
      return <GiGoat />;
    case "Monkey":
      return <GiMonkey />;
    case "Rooster":
      return <GiChicken />;
    case "Dog":
      return <GiSittingDog />;
    case "Pig":
      return <GiPig />;
    default:
      return null;
  }
};

export function determineHoroscope(day: number, month: number) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return "Aries";
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return "Taurus";
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
    return "Gemini";
  } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
    return "Cancer";
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "Leo";
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "Virgo";
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
    return "Libra";
  } else if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) {
    return "Scorpio";
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return "Sagittarius";
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return "Capricorn";
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "Aquarius";
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return "Pisces";
  } else {
    return;
  }
}

export function determineChineseZodiac(
  day: number,
  month: number,
  year: number
) {
  const signs = [
    ["20990121", "Goat"],
    ["20980201", "Horse"],
    ["20970212", "Snake"],
    ["20960125", "Dragon"],
    ["20950205", "Rabbit"],
    ["20940215", "Tiger"],
    ["20930127", "Ox"],
    ["20920207", "Rat"],
    ["20910218", "Pig"],
    ["20900130", "Dog"],
    ["20890210", "Rooster"],
    ["20880124", "Monkey"],
    ["20870203", "Goat"],
    ["20860214", "Horse"],
    ["20850126", "Snake"],
    ["20840206", "Dragon"],
    ["20830217", "Rabbit"],
    ["20820129", "Tiger"],
    ["20810209", "Ox"],
    ["20800122", "Rat"],
    ["20790202", "Pig"],
    ["20780212", "Dog"],
    ["20770124", "Rooster"],
    ["20760205", "Monkey"],
    ["20750215", "Goat"],
    ["20740127", "Horse"],
    ["20730207", "Snake"],
    ["20720219", "Dragon"],
    ["20710131", "Rabbit"],
    ["20700211", "Tiger"],
    ["20690123", "Ox"],
    ["20680203", "Rat"],
    ["20670214", "Pig"],
    ["20660126", "Dog"],
    ["20650205", "Rooster"],
    ["20640217", "Monkey"],
    ["20630129", "Goat"],
    ["20620209", "Horse"],
    ["20610121", "Snake"],
    ["20600202", "Dragon"],
    ["20590212", "Rabbit"],
    ["20580124", "Tiger"],
    ["20570204", "Ox"],
    ["20560215", "Rat"],
    ["20550128", "Pig"],
    ["20540208", "Dog"],
    ["20530219", "Rooster"],
    ["20520201", "Monkey"],
    ["20510211", "Goat"],
    ["20500123", "Horse"],
    ["20490202", "Snake"],
    ["20480214", "Dragon"],
    ["20470126", "Rabbit"],
    ["20460206", "Tiger"],
    ["20450217", "Ox"],
    ["20440130", "Rat"],
    ["20430210", "Pig"],
    ["20420122", "Dog"],
    ["20410201", "Rooster"],
    ["20400212", "Monkey"],
    ["20390124", "Goat"],
    ["20380204", "Horse"],
    ["20370215", "Snake"],
    ["20360128", "Dragon"],
    ["20350208", "Rabbit"],
    ["20340219", "Tiger"],
    ["20330131", "Ox"],
    ["20320211", "Rat"],
    ["20310123", "Pig"],
    ["20300203", "Dog"],
    ["20290213", "Rooster"],
    ["20280126", "Monkey"],
    ["20270206", "Goat"],
    ["20260217", "Horse"],
    ["20250129", "Snake"],
    ["20240210", "Dragon"],
    ["20230122", "Rabbit"],
    ["20220201", "Tiger"],
    ["20210212", "Ox"],
    ["20200125", "Rat"],
    ["20190205", "Pig"],
    ["20180216", "Dog"],
    ["20170128", "Rooster"],
    ["20160208", "Monkey"],
    ["20150219", "Goat"],
    ["20140131", "Horse"],
    ["20130210", "Snake"],
    ["20120123", "Dragon"],
    ["20110203", "Rabbit"],
    ["20100214", "Tiger"],
    ["20090126", "Ox"],
    ["20080207", "Rat"],
    ["20070218", "Pig"],
    ["20060129", "Dog"],
    ["20050209", "Rooster"],
    ["20040122", "Monkey"],
    ["20030201", "Goat"],
    ["20020212", "Horse"],
    ["20010124", "Snake"],
    ["20000205", "Dragon"],
    ["19990216", "Rabbit"],
    ["19980128", "Tiger"],
    ["19970207", "Ox"],
    ["19960219", "Rat"],
    ["19950131", "Pig"],
    ["19940210", "Dog"],
    ["19930123", "Rooster"],
    ["19920204", "Monkey"],
    ["19910215", "Goat"],
    ["19900127", "Horse"],
    ["19890206", "Snake"],
    ["19880217", "Dragon"],
    ["19870129", "Rabbit"],
    ["19860209", "Tiger"],
    ["19850220", "Ox"],
    ["19840202", "Rat"],
    ["19830213", "Pig"],
    ["19820125", "Dog"],
    ["19810205", "Rooster"],
    ["19800216", "Monkey"],
    ["19790128", "Goat"],
    ["19780207", "Horse"],
    ["19770218", "Snake"],
    ["19760131", "Dragon"],
    ["19750211", "Rabbit"],
    ["19740123", "Tiger"],
    ["19730203", "Ox"],
    ["19720215", "Rat"],
    ["19710127", "Pig"],
    ["19700206", "Dog"],
    ["19690217", "Rooster"],
    ["19680130", "Monkey"],
    ["19670209", "Goat"],
    ["19660121", "Horse"],
    ["19650202", "Snake"],
    ["19640213", "Dragon"],
    ["19630125", "Rabbit"],
    ["19620205", "Tiger"],
    ["19610215", "Ox"],
    ["19600128", "Rat"],
    ["19590208", "Pig"],
    ["19580218", "Dog"],
    ["19570131", "Rooster"],
    ["19560212", "Monkey"],
    ["19550124", "Goat"],
    ["19540203", "Horse"],
    ["19530214", "Snake"],
    ["19520127", "Dragon"],
    ["19510206", "Rabbit"],
    ["19500217", "Tiger"],
    ["19490129", "Ox"],
    ["19480210", "Rat"],
    ["19470122", "Pig"],
    ["19460202", "Dog"],
    ["19450213", "Rooster"],
    ["19440125", "Monkey"],
    ["19430205", "Goat"],
    ["19420215", "Horse"],
    ["19410127", "Snake"],
    ["19400208", "Dragon"],
    ["19390219", "Rabbit"],
    ["19380131", "Tiger"],
    ["19370211", "Ox"],
    ["19360124", "Rat"],
    ["19350204", "Pig"],
    ["19340214", "Dog"],
    ["19330126", "Rooster"],
    ["19320206", "Monkey"],
    ["19310217", "Goat"],
    ["19300130", "Horse"],
    ["19290210", "Snake"],
    ["19280123", "Dragon"],
    ["19270202", "Rabbit"],
    ["19260213", "Tiger"],
    ["19250124", "Ox"],
    ["19240205", "Rat"],
    ["19230216", "Pig"],
    ["19220128", "Dog"],
    ["19210208", "Rooster"],
    ["19200220", "Monkey"],
    ["19190201", "Goat"],
    ["19180211", "Horse"],
    ["19170123", "Snake"],
    ["19160203", "Dragon"],
    ["19150214", "Rabbit"],
    ["19140126", "Tiger"],
    ["19130206", "Ox"],
    ["19120218", "Rat"],
    ["19110130", "Pig"],
    ["19100210", "Dog"],
    ["19090122", "Rooster"],
    ["19080202", "Monkey"],
    ["19070213", "Goat"],
    ["19060125", "Horse"],
    ["19050204", "Snake"],
    ["19040216", "Dragon"],
    ["19030129", "Rabbit"],
    ["19020208", "Tiger"],
    ["19010219", "Ox"],
    ["19000131", "Rat"],
    ["19000000", "Pig"],
  ];

  let birthdaySign = "";

  for (let yearIndex = 0; yearIndex < signs.length; yearIndex++) {
    if (
      parseInt(signs[yearIndex][0]) <=
      parseInt(
        `${year}${month < 10 ? "0" : ""}${month}${day < 10 ? "0" : ""}${day}`
      )
    ) {
      birthdaySign = signs[yearIndex][1];
      break;
    }
  }

  return birthdaySign;
}
