import React from 'react';
import style from './package.module.scss';
import { useTranslation } from '@utils/useTranslation';
import Image from 'next/image';

export interface PackageProps {
  duration: number | undefined;
  recurringPrice: number | undefined;
  image: string;
  identifier: string;
  onClick?: () => void;
  isChecked: boolean;
  index: number;
}

const Package: React.FC<PackageProps> = ({
  duration,
  recurringPrice,
  image,
  identifier,
  onClick,
  isChecked,
  index,
}) => {
  const { t } = useTranslation();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const price = (recurringPrice! / duration!).toFixed(2);

  return (
    <div className={`${style.packageContainer}`}>
      <div className={style.duration}>
        <h3>{duration + t('APP_PACKAGE_MONTHS')}</h3>
      </div>
      <div className={style.price}>
        <Image src={image} height={72} width={112} alt="parrot" />
        <h3>
          <span>{price + ' '}</span>
          {identifier + ' '}
          {t('APP_PACKAGE_MONTH_ge')}
        </h3>
      </div>
      <div className={style.select} onClick={handleClick}>
          <a
            href={'https://ecommerce.ufc.ge/ecomm2/ClientHandler'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button disabled={!isChecked}>Select</button>
          </a>
      </div>
    </div>
  );
};

export default Package;
