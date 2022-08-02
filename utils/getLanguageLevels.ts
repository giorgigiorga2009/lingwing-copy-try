import axios from "axios";
import { SwitchedLanguage } from "./languages";

interface LanguageLevel {
  _id: {
    _id: string;
    name: string;
    smallDescription: {
      eng: string;
      geo: string;
      esp: string;
      rus: string;
      tur: string;
      ben: string;
    };
    fullDescription: {
      eng: "This course is designed for absolute beginners. We'll take things slow!";
      geo: "მათთვის, ვინც სრულიად არ იცის ენა, ან ადრე ნასწავლის გახსენება სურს.";
      esp: "Este curso está diseñado para las personas que desean empezar desde cero.";
      rus: "для тех, кто абсолютно не владеет языком, либо желает восстановить ранее полученные знания";
      tur: "Dili hiç bilmeyen veya dil hatırlamak isteyen kişiler için";
      ben: "এই কোর্সটি একদম শিক্ষানবিশদের জন্য নকশা করা হয়েছে। আমরা ধীরে কাজ করবো!";
    };
    uniqueStudentsCount: 169171;
  };
}

export const getLanguageLevels = (
  learnLanguage: string,
  languageFrom: string,
  locale: SwitchedLanguage
) => {
  return axios
    .get(
      `https://api.lingwing.com/api/v2/public/getLanguageStandard/${learnLanguage}/${languageFrom}?lang=${locale}`
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
};
