import { Breadcrumb, Icon, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import MpImage from '../../components/common/MpImage';
import api from '../../services';
import { changeRichContentImgUrl, formatDateOnlyYear } from '../../utils';
import { IArticleClassType, INewsHelpsArticleType } from '../../utils/types4TS';
import styles from './index.module.scss';
import Head from 'next/head';
import { SetupEnumType } from '../../setup';

const { Paragraph } = Typography;


interface IProps {
  data: INewsHelpsArticleType,
  articleClass: IArticleClassType[],
}

export default function index(props: IProps) {
  const router = useRouter();
  const { data } = props;
  // console.log(data);
  if (!data) {
    if (process.browser) router.replace('/news');
    return null;
  }

  const onAsideClick = (id: number) => {
    router.push(`?id=${id}`);
  }

  const content = (<section className={styles['news-detail-content']}>
    <header>
      <h2>{props.data.Title}</h2>
      <p>
        <span style={{marginRight: 50}}>
          <i></i>
          {formatDateOnlyYear(props.data.CreateTime)}
        </span>
        <span>来源：名片之家</span>
      </p>
    </header>
    <div>
      <div className='rich-edit-content mce-content-body ql-editor ql-snow' dangerouslySetInnerHTML={{ __html: changeRichContentImgUrl(props.data.Content) }}></div>
      <aside>
        <header>相关新闻推荐</header>
        <ul>
          {props.data.AboutList.map(it => (
            <li key={it.ID}>
              <Link href={`/newsDetail?id=${it.ID}`}>
                <a title={it.Title}>
                  <div>
                    <MpImage src={SetupEnumType.baseUrl + it.Cover} alt={it.Title} title={it.Title} height={65} width={65} />
                  </div>
                  <section>
                    <Paragraph ellipsis={{ rows: 2, expandable: false }}>{it.Title}</Paragraph>
                  </section>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <footer>
          <Link href='/news'>
              <a style={{color: '#999'}}>查看更多</a>
          </Link>
        </footer>
      </aside>
    </div>
    <footer>
      <div style={{left: 0}}>
        {/* {
          <p>{props.data.PreArticle ? props.data.PreArticle.Title : '没有了'}</p>
        } */}
        {
          props.data.PreArticle
          ? (<Link href={`/newsDetail?id=${props.data.PreArticle.ID}`}>
              <a title={props.data.PreArticle.Title}>
                <h2>上一篇</h2>
                <span>{props.data.PreArticle.Title}</span>
              </a>
            </Link>)
          : <>
              <h2>上一篇</h2>
              <span>没有了</span>
            </>
        }
      </div>
      <div style={{right: 0, textAlign: 'right'}}>
        {
          props.data.NextArticle
          ? (<Link href={`/newsDetail?id=${props.data.NextArticle.ID}`}>
              <a title={props.data.NextArticle.Title}>
                <h2>下一篇</h2>
                <span>{props.data.NextArticle.Title}</span>
              </a>
            </Link>)
            : <>
                <h2>下一篇</h2>
                <span>没有了</span>
              </>
        }
      </div>
    </footer>
  </section>)
  

  return (
    <section className={styles['mp-news-detail-page']}>
      <Head>
        <title>{props && props.data && props.data.Title ? props.data.Title : '新闻详情'} - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content={`新闻详情,行业资讯,公司动态,产品上新,展会活动,传统专版,商务合版,PVC制卡,商业包装,数码快印`}></meta>
        <meta name="description" content={`${props && props.data && props.data.Title && (props.data.Title + ',' )} - 郑州名片之家电子商务有限公司`}></meta>
      </Head>
      <header>
        <Breadcrumb separator={<Icon type="right" />} className={`mp-breadcrumb ${styles.breadcrumb}`}>
          <Breadcrumb.Item>
            <Link href="/"><a>首页</a></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href='/news'><a>新闻中心</a></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >新闻详情</Breadcrumb.Item>
        </Breadcrumb>
      </header>
      <div className={`${styles['tabs-wrap']}`}>
        {content}
      </div>
    </section>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { id } = query;
  let data = null;
  // let articleClass = [];
  if (id) {
    let key = true;
    // let key2 = true;
    const res = await api.getNewsDetail(+id).catch((e) => { console.log(e); key = false; });
    // const classResp = await api.getArticleClass(ArticleGetEnumType.news).catch(() => { key2 = false });
    if (key && res && res.data.Status === 1000) {
      data = res.data.Data;
    }
    // if (key2 && classResp && classResp.data.Status === 1000) {
    //   articleClass = classResp.data.Data;
    // }
  }
  return {
    props: {
      data,
      // articleClass,
    }
  }
}
