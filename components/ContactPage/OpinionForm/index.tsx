import { Form, Input, Button, AutoComplete, Spin } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import api from '../../../services';
import { showSuccess } from '../../../utils/model';
import { IOpinionSubmitType } from '../../../utils/types4TS';

const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

interface IProps extends FormComponentProps {
  // 添加组件props类型
}

class RegistrationForm extends React.Component<IProps> {
  state = {
    autoCompleteResult: [],
    loading: false,
  };

  submit = async (data: IOpinionSubmitType) => {
    this.setState({ ...this.state, loading: true });
    let key = true;
    const res = await api.getOpinionSubmit(data).catch(() => { key = false });
    this.setState({ ...this.state, loading: false });
    if (key && res && res.data.Status === 1000) {
      showSuccess({
        title: '提交成功',
        onOk: () => {
          this.props.form.resetFields();
        },
        okText: '确定',
        onCancel: () => {
          this.props.form.resetFields();
        },
      });
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 1 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 23 },
      },
    };

    const emailOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Spin spinning={this.state.loading}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} hideRequiredMark className='opinion-form-wrap'>
          <Form.Item label={(<img src='/contact-require.png' />)} colon={false}>
            {getFieldDecorator('NickName', {
              rules: [
                { required: true, message: '请输入姓名', whitespace: false },
                { min: 2, message: '请输入2 - 8个字符', whitespace: false },
                { max: 8, message: '请输入2 - 8个字符', whitespace: false },
              ],
            })(<Input placeholder="请输入姓名" />)}
          </Form.Item>
          <Form.Item label={(<img src='/contact-require.png' />)} colon={false}>
            {getFieldDecorator('Phone', {
              rules: [{ required: true, message: '请输入电话' }, { pattern: /(^\d{8}$)|(^\d{7}$)|(^1[3456789]\d{9}$)/, message: '电话格式不正确' }],
            })(<Input placeholder="请输入电话" />)}
          </Form.Item>
          <Form.Item label={(<img src='/contact-require.png' />)} colon={false}>
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
                <Input placeholder="请输入邮箱" />
              </AutoComplete>,
            )}
          </Form.Item>
          <Form.Item label={(<img src='/contact-require.png' />)} colon={false}>
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
            })(<TextArea rows={4} placeholder="请输入您的建议" />)}
          </Form.Item>
          <Form.Item label={(<span></span>)} colon={false}>
            <Button type="primary" htmlType="submit">
              提交
          </Button>
            <Button style={{ marginLeft: 35 }} onClick={this.handleReset}>
              重置
          </Button>
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'opinion' })(RegistrationForm);

export default WrappedRegistrationForm;
