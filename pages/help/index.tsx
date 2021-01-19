import React from 'react'
import Head from 'next/head'
import styles from './index.module.scss'
import Question from '../../components/Help/Question'
import Software from '../../components/Help/Software'
import PrintHelp from '../../components/Help/PrintHelp'
import Agreement from '../../components/Help/Agreement'
import Statement from '../../components/Help/Statement'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { HelpPageEnumType } from '../../utils/types4TS';


export default function index(props) {
  console.log(props, "props");
  const router = useRouter();

  const createMenu = (type: HelpPageEnumType, title: string) => {
    return (
      <div className={router.query.type === `${type}` ? styles.active : ''}>
        <Link href={`/help?type=${type}`}>
          <a>{title}</a>
        </Link>
      </div>
    )
  }

  const getContent = () => {
    let title = '';
    let content = null;
    switch (+router.query.type) {
      case HelpPageEnumType.question:
        title = '常见问题';
        content = <Question />;
        break;
      case HelpPageEnumType.software:
        title = '软件帮助';
        content = <Software />;
        break;
      case HelpPageEnumType.print:
        title = '印刷帮助';
        content = <PrintHelp />;
        break;
      case HelpPageEnumType.agreement:
        title = '用户协议';
        content = <Agreement />;
        break;
      case HelpPageEnumType.statement:
        title = '权责声明';
        content = <Statement />;
        break;
      default:
        break;
    }
    if (title && content) {
      return (<>
        {<header>{title}</header>}
        {content}
      </>)
    } else {
      return null;
    }
  }

  return (
    <section className={styles['mp-help-page-wrap']}>
      <Head>
        <title>帮助中心 - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <aside>
          {createMenu(HelpPageEnumType.question, '常见问题')}
          {createMenu(HelpPageEnumType.software, '软件帮助')}
          {createMenu(HelpPageEnumType.print, '印刷帮助')}
          {createMenu(HelpPageEnumType.agreement, '用户协议')}
          {createMenu(HelpPageEnumType.statement, '权责声明')}
        </aside>
        <section>
          {getContent()}
        </section>
      </div>
    </section>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {
      a: 10
    }
  }
}