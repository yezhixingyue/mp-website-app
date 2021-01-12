import React from 'react'
import Head from 'next/head'
import styles from './index.module.scss'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import api from '../../services';
import { Base64 } from 'js-base64';

interface IProps extends FormComponentProps {
  // 添加组件props类型
}

interface IState {
  isMobileActive: boolean;
  isPwdActive: boolean;
  loginData: {
    Mobile: string;
    Pwd: string;
    remember: boolean;
  };
  isLoading: boolean;
  errMsg: string;
  isLoginSuccess: boolean;
}

class NormalLoginForm extends React.Component<IProps, IState> {
  

  constructor(props) {
    super(props);

    let _loginData;
    if (process.browser) {
      const _loginStr = localStorage.getItem('loginData');
      if (_loginStr) _loginData = JSON.parse(_loginStr);
    }
    this.state = {
      isMobileActive: false,
      isPwdActive: false,
      loginData: {
        Mobile: _loginData ? _loginData.Mobile : '',
        Pwd: _loginData ? _loginData.Password : '',
        remember: true,
      },
      isLoading: false,
      errMsg: '',
      isLoginSuccess: false,
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { Mobile, Password, remember } = values;
        this.setState({ ...this.state, errMsg: '', isLoading: true, isLoginSuccess: false }); // 请求前先清除错误信息 及设置loading
        const _pwd = Password !== this.state.loginData.Pwd ? Base64.encode(Password) : Password;
        const loginReqData =  { Mobile, Password: _pwd };
        const res = await api.getLogin(loginReqData).catch(() => {
          this.setState({ ...this.state, errMsg: '登录失败，请重试', isLoading: false });
        });
        this.setState({ ...this.state, isLoading: false });
        if (!res) return;
        if (res.data.Status !== 1000) { // 登录失败
          this.setState({ ...this.state, errMsg: res.data.Message });
          return;
        }
        // 登录成功
        if (remember) localStorage.setItem('loginData', JSON.stringify(loginReqData));
        else localStorage.removeItem('loginData');
        this.setState({ ...this.state, isLoginSuccess: true });
      }
    });
  };

  componentDidMount() {
    this.props.form.setFieldsValue({ Mobile: this.state.loginData.Mobile });
    this.props.form.setFieldsValue({ Password: this.state.loginData.Pwd });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section className={styles['mp-login-page-wrap']}>
        <Head>
          <title>登录 - 郑州名片之家电子商务有限公司</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <div></div>
        </header>
        <div className={styles.content}>
          <section>
            <header>登录（sign in）</header>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('Mobile', {
                  rules: [
                    { required: true, message: '请输入手机号' },
                    { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确' }
                  ],
                  initialValue: ''
                })(
                  <Input
                    prefix={<i className={`${styles.phone} ${styles.icon}`}></i>}
                    placeholder="请输入手机号码"
                    onFocus={() => { this.setState({ ...this.state, isMobileActive: true }) }}
                    onBlur={() => { this.setState({ ...this.state, isMobileActive: false }) }}
                    className={this.state.isMobileActive ? styles.active : ''}
                    maxLength={11}
                    allowClear
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('Password', {
                  rules: [{ required: true, message: '请输入密码' }, { min: 6, message: '密码长度至少6位' }],
                  initialValue: ''
                })(
                  <Input
                    prefix={<i className={`${styles.pwd} ${styles.icon}`}></i>}
                    type="password"
                    placeholder="请输入密码"
                    onFocus={() => { this.setState({ ...this.state, isPwdActive: true }) }}
                    onBlur={() => { this.setState({ ...this.state, isPwdActive: false }) }}
                    className={this.state.isPwdActive ? styles.active : ''}
                    maxLength={16}
                    allowClear
                  />,
                )}
              </Form.Item>
              <Form.Item className={styles.checkLitem}>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: this.state.loginData.remember,
                })(<Checkbox className='login-check'>记住密码</Checkbox>)}
              </Form.Item>
              <Form.Item className={styles.btnBox}>
                <p>{this.state.errMsg}</p>
                <Button type="primary" htmlType="submit" disabled={this.state.isLoading}>
                  { this.state.isLoading ? (<><Icon type="loading" />登录中...</>) : this.state.isLoginSuccess ? '登录成功' : '登录' }
                </Button>
              </Form.Item>
            </Form>
          </section>
        </div>
      </section>
    )
  }
}

const callback = (props, changedValues, allValues) => {
  const fieldName = Object.keys(changedValues)[0];
  if (fieldName === 'Mobile' && allValues.Password) {
    props.form.setFieldsValue({ Password: '' });
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'login', onValuesChange: callback })(NormalLoginForm);

export default WrappedNormalLoginForm;