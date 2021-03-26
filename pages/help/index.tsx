import React, { useEffect } from 'react'
import Head from 'next/head'
import styles from './index.module.scss'
import { useRouter } from 'next/router';
import { ArticleClassEnum, IArticleListItemType, IHelpClassItemType, IParams4GetHelpList } from '../../utils/types4TS';
import api from '../../services'
import { formatDateOnlyYear } from '../../utils'
import { Empty, Pagination } from 'antd'
import AsideComp from '../../components/Help/Aside'
import Link from 'next/link';

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

  useEffect(() => {
    if (!props.curClass) return;
    router.push(`/help?type=${props.curClass.ID}&Page=${props.Page}`, '', {shallow: true});
  }, [])

  // const onPageChange = (page: number) => {
  //   router.push(`?type=${props.curClass.ID}&Page=${page}`);
  // }
  const getTtemRender = (page, type, originalElement) => {
    const { Page } = router.query;
    const bool = page === +Page || page === 0 ? true : false;
    if (bool) return originalElement;
    return <Link href={`/help?type=${props.curClass.ID}&Page=${page}`}>
      {originalElement}
    </Link>
  }

  const listContent = props.helpListCount > 0 && props.helpListData.map(it => (
    <li key={it.ID} className={styles.listItem}>
      <Link href={'/help/' + it.ID}>
        <a title={it.Title}>
          <div>{it.Title}</div>
          <span>{formatDateOnlyYear(it.CreateTime)}</span>
        </a>
      </Link>
    </li>
  ))

  const emptyContent = props.helpListCount === 0 && <li className={styles.empty}>
    <Empty description='暂无内容' />
  </li>

  const pagination = props.helpListCount > pageSize && <Pagination
    current={props.Page}
    // onChange={onPageChange}
    pageSize={pageSize}
    itemRender={getTtemRender}
    total={props.helpListCount}
    className={props.helpListCount === 0 ? 'opacity-0' : ''}
  />

  return (
    <section className={styles['mp-help-page-wrap']}>
      <Head>
        <title>{props.curClass ? props.curClass.Name : '帮助中心'} - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content={`${props.curClass && (props.curClass.Name + ',' )}帮助中心,传统专版,商务合版,PVC制卡,商业包装,数码快印`}></meta>
        <meta name="description" content={`${props.curClass ? props.curClass.Name : '帮助中心'} - 帮助中心 - 郑州名片之家电子商务有限公司`}></meta>
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
    const _type = (type || type === 0) ? type : helpClassData.length > 0 ? helpClassData[0].ID : null;
    if (!_type) return;
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