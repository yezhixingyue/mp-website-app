import Link from 'next/link'
import React from 'react'
import { SetupEnumType } from '../../../setup'
import { IHelpClassItemType } from '../../../utils/types4TS'
import styles from './index.module.scss'

interface IProps {
  helpClassData: IHelpClassItemType[];
  classID: number
}


export default function index(props: IProps) {

  const getUrl = (type) => {
    if (type === +SetupEnumType.agreementLv2Type) return `/help/${SetupEnumType.agreementID}`;
    if (type === +SetupEnumType.accrualLv2Type) return `/help/${SetupEnumType.accrualID}`;
    return `/help?type=${type}&Page=1`;
  }

  const getTitle = (type, title) => {
    if (type === +SetupEnumType.agreementLv2Type) return '用户协议';
    if (type === +SetupEnumType.accrualLv2Type) return '权责声明';
    return title;
  }
  
  const createMenu = (type: number, title: string, key: string) => {
    return (
      <div className={props.classID && props.classID === type ? styles.active : ''} key={key}>
        <Link href={getUrl(type)}>
          <a>{getTitle(type, title)}</a>
        </Link>
      </div>
    )
  }

  return (
    <aside className={styles['mp-help-aside-comp-wrap']}>
      {
        props.helpClassData.map(it =>(createMenu(it.ID, it.Name, `${it.ID}`)))
      }
    </aside>
  )
}
