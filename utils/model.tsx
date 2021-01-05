import { Modal, Tooltip } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';

const iconWarn = (
  <span className='anticon warn'></span>
)

const iconSuccess = (
  <span className='anticon success'></span>
)

/**
 * @description: 用于确认的弹窗，有标题和内容
 * @param {*}
 * @return {*}
 */
export function showConfirm({title = '注意', msg = '', onOk = () => {}, onCancel = () => {}, okText = '确定'}) {
  Modal.confirm({
    title,
    icon: <>{iconWarn}</>,
    content: msg,
    className: 'mp-show-confirm-message-box',
    okText,
    cancelText: '取消',
    maskClosable: true,
    onOk() {
      if (onOk) onOk();
    },
    onCancel() {
      if (onCancel) onCancel();
    },
  });
}

/**
 * @description: 只有标题的确认弹窗信息
 * @param {*}
 * @return {*}
 */
export function showConfirmWithoutMsg({title = '注意', onOk = () => {}, onCancel = () => {}}) {
  Modal.confirm({
    title,
    icon: <>{iconWarn}</>,
    className: 'mp-show-confirm-message-box with-null-msg',
    okText: '确定',
    cancelText: '取消',
    maskClosable: true,
    onOk() {
      if (onOk) onOk();
    },
    onCancel() {
      if (onCancel) onCancel();
    },
  });
}

/**
 * @description: 警告提示框 有内容和标题
 * @param {*}
 * @return {*}
 */
export function showWarn({title = '错误', msg = '',onOk = () => {}, onCancel = () => {}}) {
  Modal.warn({
    title,
    icon: <>{iconWarn}</>,
    className: 'mp-show-confirm-message-box warn-box',
    okText: '关闭',
    content: msg,
    maskClosable: true,
    onOk() {
      if (onOk) onOk();
    },
    onCancel() {
      if (onCancel) onCancel();
    },
  });
}

/**
 * @description: 成功的提示框 有内容和标题
 * @param {*}
 * @return {*}
 */
export function showSuccess({title = '成功', msg = '', onOk = () => {}, onCancel = () => {}, okText = '关闭'}) {
  Modal.warn({
    title,
    icon: <>{iconSuccess}</>,
    className: 'mp-show-confirm-message-box with-null-msg warn-box',
    okText,
    content: msg,
    maskClosable: true,
    centered: true,
    onOk() {
      if (onOk) onOk();
    },
    onCancel() {
      if (onCancel) onCancel();
      else if (onOk) onOk();
    },
  });
}
/**
 * @description: 成功的提示框 有内容和标题
 * @param {*}
 * @return {*}
 */
export function showSuccessWithDoubleBtn({title = '成功', msg1 = '', msg2 = '', onOk = () => {}, onCancel = () => {}, okText = '确定'}) {
  Modal.confirm({
    title,
    icon: <>{iconSuccess}</>,
    content: <div>
    <p className='gray'>{msg1}</p>
    <p>{msg2}</p>
  </div>,
    className: 'mp-show-confirm-message-box double-msg',
    okText,
    cancelText: '取消',
    maskClosable: true,
    onOk() {
      if (onOk) onOk();
    },
    onCancel() {
      if (onCancel) onCancel();
    },
  });
}
/**
 * @description: 警告提示框 不含内容
 * @param {*}
 * @return {*}
 */
export function showWarnWithoutMsg({title = '错误', onOk = () => {}, onCancel = () => {}}) {
  Modal.warn({
    title,
    icon: <>{iconWarn}</>,
    className: 'mp-show-confirm-message-box with-null-msg warn-box',
    okText: '关闭',
    maskClosable: true,
    onOk() {
      if (onOk) onOk();
    },
    onCancel() {
      if (onCancel) onCancel();
    },
  });
}

export function PrintOrderIDConfirm({title = '注意', msg1= '',  msg2= '', onOk = () => {}, onCancel = () => {}, okText = '确定'}) {
  Modal.confirm({
    title,
    icon: <>{iconWarn}</>,
    content: <div>
    <p>{msg1}</p>
    <Tooltip title={msg2}>
      <p>{msg2}</p>
    </Tooltip>
  </div>,
    className: 'mp-show-confirm-message-box print-orderid-confirm-wrap',
    okText,
    cancelText: '取消',
    maskClosable: true,
    onOk() {
      // console.log('OK');
      if (onOk) onOk();
    },
    onCancel() {
      // console.log('Cancel');
      if (onCancel) onCancel();
    },
  });
}


export default {
  showConfirm,
  showSuccess,
  showConfirmWithoutMsg,
  showWarn,
  showWarnWithoutMsg,
  showSuccessWithDoubleBtn,
  PrintOrderIDConfirm,
}