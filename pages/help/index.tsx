import React from 'react'
import Head from 'next/head'
import styles from './index.module.scss'
import { useRouter } from 'next/router';
import { ArticleClassEnum, IArticleListItemType, IHelpClassItemType, IParams4GetHelpList } from '../../utils/types4TS';
import api from '../../services'
import { formatDateOnlyYear } from '../../utils'
import { Empty, Pagination } from 'antd'
import AsideComp from '../../components/Help/Aside'

interface IProps {
  helpClassData: IHelpClassItemType[];
  helpListData: IArticleListItemType[];
  helpListCount: number;
  curClass: IHelpClassItemType | null;
  Page: number;
}

const pageSize = 12;

export default function index(props: IProps) {
  const router = useRouter();

  const onPageChange = (page: number) => {
    router.push(`?type=${props.curClass.ID}&Page=${page}`);
  }

  const listContent = props.helpListCount > 0 && props.helpListData.map(it => (
    <li key={it.ID} className={styles.listItem} onClick={() => { router.push('/help/' + it.ID) }}>
      <div>{it.Title}</div>
      <span>{formatDateOnlyYear(it.CreateTime)}</span>
    </li>
  ))

  const emptyContent = props.helpListCount === 0 && <li className={styles.empty}>
    <Empty description='暂无内容' />
  </li>

  const pagination = props.helpListCount > pageSize && <Pagination
    current={props.Page}
    onChange={onPageChange}
    pageSize={pageSize}
    total={props.helpListCount}
    className={props.helpListCount === 0 ? 'opacity-0' : ''}
  />

  return (
    <section className={styles['mp-help-page-wrap']}>
      <Head>
        <title>帮助中心 - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <AsideComp helpClassData={props.helpClassData} classID={props.curClass ? props.curClass.ID : null} />
        <section>
          <header>{props.curClass ? props.curClass.Name : '分类为空'}</header>
          <ul>
            {listContent}
            {emptyContent}
          </ul>
          {
            props.helpListCount > pageSize && <footer>{pagination}</footer>
          }
        </section>
      </div>
    </section>
  )
}

export const getServerSideProps = async ({ query }) => {
  let helpClassData: IHelpClassItemType[] = [];
  let helpListData: IArticleListItemType[] = [];
  let helpListCount = 0;
  let curClass = null;
  let _key = true;
  let Page = query.Page ? +query.Page : 1;
  const resp = await api.getArticleClass(ArticleClassEnum.help).catch(() => { _key = false });
  if (resp && _key && resp.data.Status === 1000) {
    helpClassData = resp.data.Data;
  }
  if (helpClassData.length > 0) {
    const { type } = query;
    const _type = (type || type === 0) ? type : helpClassData[0].ID;
    const t = helpClassData.find(it => it.ID === +_type);
    if (t) {
      curClass = t;
      const _temp: IParams4GetHelpList = {
        Type: _type,
        Page,
        PageSize: pageSize
      }
      const listResp = await api.getHelpList(_temp).catch(() => { _key = false });
      if (listResp && _key && listResp.data.Status === 1000) {
        helpListData = listResp.data.Data;
        helpListCount = listResp.data.DataNumber;
      }
    }
  }
  return {
    props: {
      helpClassData,
      helpListData,
      helpListCount,
      curClass,
      Page,
    }
  }
}