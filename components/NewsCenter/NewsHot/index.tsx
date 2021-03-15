import { Empty, Pagination, Spin } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import api from '../../../services';
import { SetupEnumType } from '../../../setup';
import MpImage from '../../common/MpImage';
import styles from './index.module.scss'

export default function index({ hotList, DataNumber, Page }) {
  const router = useRouter();

  // const [state, setstate] = useState({
  //   page: Page ? +Page : 1,
  // })

  const getTtemRender = (page, type, originalElement) => {
    const { Page } = router.query;
    const bool = page === +Page || page === 0 ? true : false;
    if (bool) return originalElement;
    return <Link href={`/news?Page=${page}`} scroll={false}>
      {originalElement}
    </Link>
  }

  // const onNewsClick = (id: number) => {
  //   router.push(`newsDetail?id=${id}`);
  // }
  return (
    <section className={styles['news-hot']}>
      <header>
        <h2 className='part-title'>新闻热议</h2>
        <h3 className='part-title-2'>{'News hot discussion'.toLocaleUpperCase()}</h3>
      </header>

      <ul>
        {
          hotList.map(it => (
            <li key={it.ID} >
              <Link href={`/newsDetail?id=${it.ID}`}>
                <a target='_blank'>
                  <MpImage src={`${SetupEnumType.baseUrl}/${it.Cover}`} height={185} width={380} />
                  <div className={styles.tip}>
                    <div>
                      <p>{it.Title}</p>
                      <span>{it.Introduce}</span>
                    </div>
                    <p>
                      <span>{it.Title}</span>
                      <i></i>
                    </p>
                  </div>
                </a>
              </Link>
            </li>
          ))
        }
        {
          hotList.length === 0 && <Empty description='暂无新闻，可能由于通信原因未获取到，请刷新重试' />
        }
      </ul>
      <footer>
        <Pagination
          current={Page}
          // onChange={onPageChange}
          itemRender={getTtemRender}
          pageSize={6}
          total={DataNumber}
          className={DataNumber === 0 ? 'opacity-0' : ''}
        />
      </footer>
    </section>
  )
}
