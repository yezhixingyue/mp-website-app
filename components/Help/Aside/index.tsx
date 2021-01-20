import Link from 'next/link'
import React from 'react'
import { IHelpClassItemType } from '../../../utils/types4TS'
import styles from './index.module.scss'

interface IProps {
  helpClassData: IHelpClassItemType[];
  classID: number
}


export default function index(props: IProps) {
  
  const createMenu = (type: number, title: string, key: string) => {
    return (
      <div className={props.classID && props.classID === type ? styles.active : ''} key={key}>
        <Link href={`/help?type=${type}`}>
          <a>{title}</a>
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
