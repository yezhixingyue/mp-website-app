import { Form, Input, Button, AutoComplete, Spin, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import api from '../../../services';
import { showSuccess } from '../../../utils/model';
import { IOpinionSubmitType, User } from '../../../utils/types4TS';
import styles from './index.module.scss';

const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

interface IProps extends FormComponentProps {
  // 添加组件props类型
  user?: null | User;
}

class RegistrationForm extends React.Component<IProps> {
  state = {
    autoCompleteResult: [],
    loading: false,
    CaptchaLoading: false,
    CaptchaData: null,
  };


  getApiCaptcha = async () => {
    this.setState({
      ...this.state,
      CaptchaLoading: true,
    })
    let key = true;
    const res = await api.getApiCaptcha().catch(() => { key = false });
    this.setState({
      ...this.state,
      CaptchaLoading: false,
    })
    if (key && res && res.data.Status === 1000) {
      this.setState({
        ...this.state,
        CaptchaData: res.data.Data,
      })
    }
  }

  submit = async (data: IOpinionSubmitType) => {
    this.setState({ ...this.state, loading: true });
    let key = true;
    const res = await api.getOpinionSubmit(data).catch(() => { key = false });
    this.setState({ ...this.state, loading: false });
    if (key && res && res.data.Status === 1000) {
      showSuccess({
        title: '提交成功',
        msg: '感谢您的提交!',
        onOk: () => {
          this.props.form.resetFields();
        },
        okText: '确定',
        onCancel: () => {
          this.props.form.resetFields();
        },
      });
    }
    if (res && res.data.Status !== 7009) {
      this.getApiCaptcha();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 验证通过执行该处方法
        this.submit(values);
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };


  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value || value.indexOf('@') > -1) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['@qq.com', '@163.com', '@'].map(domain => `${value}${domain}`);
    }
    this.setState({ ...this.state, autoCompleteResult });
  };

  // CaptchaBox = ()

  componentDidMount() {
    this.getApiCaptcha();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const emailOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    const userIcon = (<div className={styles.icon}>
      <img src="/opinion-user.png" alt=""/>
    </div>)
    const phoneIcon = (<div className={styles.icon}>
      <img src="/opinion-phone.png" alt=""/>
    </div>)
    const emailIcon = (<div className={styles.icon}>
      <img src="/opinion-email.png" alt=""/>
    </div>)
    const vcodeIcon = (<div className={styles.icon}>
      <img src="/opinion-vcode.png" alt=""/>
    </div>)

    return (
      <div className={styles['form-wrap']}>
        <Spin spinning={this.state.loading}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark className='opinion-form-wrap'>
            {
              !this.props.user
              ? <div className={`${styles['line']} ${styles['first-l']}`}>
                  <Form.Item style={{marginRight: 90}}>
                    {getFieldDecorator('NickName', {
                      rules: [
                        { required: true, message: '请输入姓名', whitespace: false },
                        { min: 2, message: '请输入2 - 5个字符', whitespace: false },
                        { max: 5, message: '请输入2 - 5个字符', whitespace: false },
                      ],
                    })(<Input prefix={userIcon} placeholder="请输入姓名 *" maxLength={5} />)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('Phone', {
                      rules: [{ required: true, message: '请输入电话' }, { pattern: /(^\d{8}$)|(^\d{7}$)|(^1[3456789]\d{9}$)/, message: '电话格式不正确' }],
                    })(<Input prefix={phoneIcon} placeholder="请输入电话 *" maxLength={11} />)}
                  </Form.Item>
              </div>
              : <div className={styles.tip}>
                  您好，<h2>{this.props.user.CustomerName}</h2>
                  <span>
                    如果您认为名片之家有可以做到更好的地方，请在此输入您宝贵的意见和建议吧 ... <img src="/smile.png" alt=""/>
                  </span>
              </div>
            }

            <div className={styles.line}>
              <Form.Item  style={{marginRight: 90, height: 40}}>
                {getFieldDecorator('Email', {
                  rules: [
                    {
                      type: 'email',
                      message: '邮箱类型不正确',
                    },
                    {
                      required: true,
                      message: '请输入邮箱',
                    },
                  ],
                })(
                  <AutoComplete
                    dataSource={emailOptions}
                    onChange={this.handleWebsiteChange}
                  >
                    <Input prefix={emailIcon} placeholder="请输入邮箱 *" />
                  </AutoComplete>,
                )}
              </Form.Item>
              {
                !this.props.user &&
                <Form.Item>
                  {getFieldDecorator('Captcha', {
                    rules: [
                      { required: true, message: '请输入验证码' },
                      { min: 2, message: '请输入2个字符', whitespace: false },
                      { max: 2, message: '请输入2个字符', whitespace: false },
                    ],
                  })(<Input
                    prefix={vcodeIcon}
                    placeholder="请输入验证码 *"
                    addonAfter={
                      <Spin spinning={this.state.CaptchaLoading} indicator={<Icon type="loading" style={{ fontSize: 14 }} spin />}>
                        <div className={styles.CaptchaBox} onClick={this.getApiCaptcha}>
                          {this.state.CaptchaData && <img src={this.state.CaptchaData.Image} alt="" />}
                        </div>
                      </Spin>
                    }
                  />)}
                </Form.Item>
              }
            </div>
            <div className={styles.last}>
              <Form.Item style={{height: 100, marginRight: 50}}>
                {/* <Form.Item label={(<img src='/contact-require.png' className={styles.img} />)} colon={false}> */}
                {getFieldDecorator('Content', {
                  rules: [
                    {
                      required: true,
                      message: '请输入您的建议',
                    },
                    {
                      min: 10,
                      message: '建议应至少输入10个字'
                    },
                    {
                      max: 300,
                      message: '建议最多输入300个字'
                    },
                  ],
                })(<TextArea rows={4} placeholder="请输入您的建议 *" maxLength={300} />)}
              </Form.Item>
              <Form.Item label={(<span></span>)} colon={false} style={{width: 260}}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
                <Button style={{ marginLeft: 40 }} onClick={this.handleReset}>
                  重置
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Spin>

      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'opinion' })(RegistrationForm);

export default WrappedRegistrationForm;
