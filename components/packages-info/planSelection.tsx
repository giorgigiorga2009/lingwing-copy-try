import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import style from './planSelection.module.scss';
import classNames from 'classnames';
import rocketParrot from '@public/assets/images/rocketParrot.png';
import starIcon from '@public/assets/images/pr-star-icon.png';
import { PackageResponse } from '@utils/getPayments';
import {
  PackagesInfoProps,
  getCheckedPackageInfo,
  getPackageDataByIdInfo,
} from '@utils/getPackagesInfo';

const PlanSelection: React.FC<PackagesInfoProps> = ({
  header,
  paragraph,
  buttonText,
  index,
  fromGelText,
}) => {
  const [data, setData] = useState<PackageResponse | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    async function fetchPackageData() {
      try {
        const checkedPackage = await getCheckedPackageInfo();
        if (checkedPackage?.orderId && isMounted) {
          const packageData = await getPackageDataByIdInfo(checkedPackage.orderId);
          setData(packageData as PackageResponse | undefined)
        }
      } catch (error) {
        console.error('An error occurred while fetching package data:', error);
      }
    }

    fetchPackageData();

    return () => {
      isMounted = false;
    };
  }, []);

  const isPremium = index === 2;
  const monthlyPayment = data?.packages[0].currency[0].recurringPrice 
    ? data.packages[0].currency[0].recurringPrice / data.packages[0].duration
    : undefined;

  return (
    <div className={classNames(style.container, { [style.differentBG]: index === 1 })}>
      <div className={style.buble} />
      <div className={classNames(style.header, { [style.premiumHeader]: isPremium })}>
        <h3>{header}</h3>
        <p>{paragraph}</p>
      </div>
      {isPremium && (
        <Image
          src={rocketParrot}
          className={style.rocketParrot}
          alt=""
          width={500}
          height={500}
          priority
        />
      )}
      <div className={isPremium ? style.premiumButtonDiv : style.buttonDiv}>
        <Link href={isPremium ? '/packages' : '/free-trial'}>
          <button className={classNames(style.button, { [style.premiumButton]: isPremium })}>
            <div className={style.buttonWrapper}>
              {isPremium && (
                <Image
                  src={starIcon}
                  alt=""
                  width={30}
                  height={30}
                  priority
                />
              )}
              {buttonText}
            </div>
          </button>
        </Link>
        <div className={style.monthlyPayment}>
          {isPremium && `${fromGelText} ${monthlyPayment}`}
        </div>
      </div>
    </div>
  );
}

export default PlanSelection;
