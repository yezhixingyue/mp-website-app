import React from 'react';
// import styled from 'styled-components';
import { Icon, Spin } from 'antd';
// import { SyncOutlined } from '@ant-design/icons'
// import { CSSTransition } from "react-transition-group"

// const Container = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: 999;
//   background-color: rgba(0, 0, 0, 0.5);
// `
// const antIcon = <SyncOutlined style={{ fontSize: 24 }} spin /> ; // <Icon type="sync" spin />
// const antIcon = <Icon style={{ fontSize: 24 }} type="sync" spin /> ; // 

const Loading = (props) => (
  <>
    {/* {
      props.loading
        ? <Container className={props.loading ? 'loading fixed-model' : 'fixed-model'}>
          <Spin tip="加载中..." wrapperClassName='spinning-style' size="large" />
        </Container> : <></>
    } */}
    <div className={props.loading ? 'loading fixed-model' : 'fixed-model'}>
      <Spin tip="请稍后，加载中..." wrapperClassName='spinning-style' size="large" />
    </div>
  </>
  // <Container className={props.loading ? 'loading fixed-model' : 'fixed-model'}>
  //   <Spin tip="加载中..." wrapperClassName='spinning-style' size="large" />
  // </Container>
)

export default Loading
