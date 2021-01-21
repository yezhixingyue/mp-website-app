import { Empty, Pagination, Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import api from '../../../services';
import { SetupEnumType } from '../../../utils/types4TS'
import MpImage from '../../common/MpImage';
import styles from './index.module.scss'

export default function index({ hotList, DataNumber }) {
  const router = useRouter();

  const [state, setState] = useState({
    newsList: hotList,
    page: 1,
    pageSize: 6,
    DataNumber: DataNumber,
    loading: false,
  })

  const onPageChange = async (page: number) => {
    setState({ ...state, loading: true });
    let key = true;
    const resp = await api.getNewsHotList({ Page: page, pageSize: state.pageSize }).catch(() => { key = false });

    if (key && resp && resp.data.Status === 1000) {
      const { Data, DataNumber } = resp.data;
      setState({ ...state, loading: false, page, newsList: Data, DataNumber });
    } else {
      setState({ ...state, loading: false });
    }
  }

  const onNewsClick = (id: number) => {
    router.push(`newsDetail?id=${id}`);
  }
  return (
    <section className={styles['news-hot']}>
      <header>
        <h2>新闻热议</h2>
        <h3>{'News hot discussion'.toLocaleUpperCase()}</h3>
      </header>

      <Spin spinning={state.loading}>
        <ul>
          {
            state.newsList.map(it => (
              <li key={it.ID} onClick={() => { onNewsClick(it.ID) }}>
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
              </li>
            ))
          }
          {
            state.newsList.length === 0 && <Empty description='暂无新闻，可能由于通信原因未获取到，请刷新重试' />
          }
        </ul>
        <footer>
          <Pagination
            current={state.page}
            onChange={onPageChange}
            pageSize={state.pageSize}
            total={state.DataNumber}
            className={state.DataNumber === 0 ? 'opacity-0' : ''}
          />
        </footer>
      </Spin>
    </section>
  )
}
