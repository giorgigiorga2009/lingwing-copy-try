import { FC } from "react";
import style from "./PageTitle.module.scss";

interface Props {
  text: string;
}

export const PageTitle: FC<Props> = ({ text }) => {
  return <div className={style.title}>{text}</div>;
};
