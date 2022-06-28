import classNames from "classnames";
import { FC } from "react";
import { Language } from "./languages";
import style from './LanguagesBlock.module.scss'

interface Props {
    language: Language
}

export const LanguageTile: FC<Props> = ({language}) => {
  return (
    <div className={classNames(style.tileContainer, style[language.short])}>
        {/* routing by onclick */}
            <span className={classNames(style.languageImage, style[language.short])}>
              <span className={style.title}>{language.long}</span>
            </span>

            {/* <span class="lang-o" style="background-image:url('../themes/images/v2/eng_o.jpg')">
              <span class="lang-start ng-binding">Start</span>
              <span class="lang-parrot">
                <img src="../themes/images/v2/eng_parrot.png">
              </span>
            </span>

            <img class="lang-flag" src="../themes/images/v2/eng_flag.png"> */}

      </div>
    )
}