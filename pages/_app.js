import '../styles/globals.scss';
import 'antd/dist/antd.css';
import Header from '../components/layout/CommonHeader';
import Footer from '../components/layout/CommonFooter';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if (router.pathname === '/login') return <Component {...pageProps} />
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
