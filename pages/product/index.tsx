import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import api from '../../services';
import styles from './index.module.scss';

export default function index() {
  const router = useRouter();

  const getProductIntroduce = async (id: string) => {
    let key = true;
    const resp = await api.getProductIntroduce(id).catch(() => { key = false });
    if (key && resp && resp.data.Status === 1000) {
      console.log(resp);
    }
  }

  useEffect(() => {
    const arr = router.asPath.split('=');
    if (arr.length !== 2) {
      router.replace('/productIntro');
      return;
    }
    const id = arr[1];
    getProductIntroduce(id);
  }, [])
  return (
    <div>
      产品详情页面
    </div>
  )
}
