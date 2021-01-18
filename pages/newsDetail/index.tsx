import { Breadcrumb, Icon } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import MpImage from '../../components/common/MpImage';
import api from '../../services';
import { formatDateOnlyYear } from '../../utils';
import { ArticleGetEnumType, IArticleClassType, INewsHelpsArticleType } from '../../utils/types4TS';
import styles from './index.module.scss';


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
      <div className='rich-edit-content' dangerouslySetInnerHTML={{ __html: props.data.Content }}></div>
      <aside>
        <header>相关新闻推荐</header>
        <ul>
          {props.data.AboutList.map(it => (
            <li key={it.ID} onClick={() => onAsideClick(it.ID)}>
              <div>
                <MpImage src={'http://192.168.1.92:8055/' + it.Cover} alt="" height={65} width={65} />
              </div>
              <p>{it.Title}</p>
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
      <div style={{left: 0}} onClick={() => { props.data.PreArticle && router.push(`?id=${props.data.PreArticle.ID}`) }}>
        <h2>上一篇</h2>
        {
          <p>{props.data.PreArticle ? props.data.PreArticle.Title : '没有了'}</p>
        }
      </div>
      <div style={{right: 0, textAlign: 'right'}} onClick={() => { props.data.NextArticle && router.push(`?id=${props.data.NextArticle.ID}`) }}>
        <h2>下一篇</h2>
        {
          <p style={{textAlign: 'right'}}>{props.data.NextArticle ? props.data.NextArticle.Title : '没有了'}</p>
        }
      </div>
    </footer>
  </section>)
  
  return (
    <section className={styles['mp-news-detail-page']}>
      <header>
        <Breadcrumb separator={<Icon type="right" />} className={`mp-breadcrumb ${styles.breadcrumb}`}>
          <Breadcrumb.Item>
            <Link href="/"><a>名片之家</a></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href='/news'><a>新闻介绍</a></Link>
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
