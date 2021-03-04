import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect } from 'react'
import api from '../../../services';
import { ArticleClassEnum, IHelpClassItemType, IHelpDetailType } from '../../../utils/types4TS';
import styles from './index.module.scss';
import AsideComp from '../../../components/Help/Aside'
import { Icon } from 'antd';
import { useRouter } from 'next/router';
import { changeRichContentImgUrl } from '../../../utils';

interface IProps {
  helpDetailData: IHelpDetailType | null;
  helpClassData: IHelpClassItemType[];
}

export default function index(props: IProps) {
  const router = useRouter();

  const header = props.helpDetailData
   ? <header>
      <span onClick={() => { router.push(`/help?type=${props.helpDetailData.Class.ID}`) }}> <Icon type="left" /> {props.helpDetailData.Class.Name}<em>/</em></span>
      <i>{props.helpDetailData.Title}</i>
    </header>
   : null
  
  return (
    <section className={styles['mp-help-detail-page-wrap']}>
      <Head>
        <title>帮助中心 - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <AsideComp helpClassData={props.helpClassData} classID={props.helpDetailData ? props.helpDetailData.Class.ID : null} />
        <section>
          {/* {getContent()} */}
          {header}
          <div>
            {
              props.helpDetailData
               ? <div className='rich-edit-content mce-content-body ql-editor ql-snow' dangerouslySetInnerHTML={{ __html: changeRichContentImgUrl(props.helpDetailData.Content) }}></div>
               : null
            }
          </div>
        </section>
      </div>
    </section>
  )
}

export const getServerSideProps = async ({ query }) => {
  let helpClassData: IHelpClassItemType[] = [];
  let helpDetailData = null;
  const id = query.id;
  if (id) {
    let _key = true;
    const resp = await api.getArticleClass(ArticleClassEnum.help).catch(() => { _key = false });
    if (resp && _key && resp.data.Status === 1000) {
      helpClassData = resp.data.Data;
    }
    if (helpClassData.length > 0) {
      const listResp = await api.getHelpDetail(id).catch(() => { _key = false });
      if (listResp && _key && listResp.data.Status === 1000) {
        helpDetailData = listResp.data.Data;
      }
    }
  }
  return {
    props: {
      helpClassData,
      helpDetailData,
    }
  }
}