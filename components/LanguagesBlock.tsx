import classNames from "classnames";
import { FC } from "react";
import { SwitchedLanguages } from "./languages";
import style from './LanguagesBlock.module.scss'

interface Props {
    language: SwitchedLanguages
}

export const LanguageTile: FC<Props> = ({language}) => {
  return (
    <div className={classNames(style.tileContainer, style[language.short])}>
        {/* routing by onclick */}
        <span className={style.start}>Start</span>
            <span className={style.title}>{language.long}</span>
            <span className={classNames(style.languageFlag, style[language.short])}/>
            <span className={classNames(style.parrot, style[language.short])} />

            

            {/* {/* <span class="lang-o" style="background-image:url('../themes/images/v2/eng_o.jpg')">
              <span class="lang-parrot">
                <img src="../themes/images/v2/eng_parrot.png">
              </span>
            </span>  */}


      </div>
    )
}