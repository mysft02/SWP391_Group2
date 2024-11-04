import { Input, Button, Tooltip, message } from 'antd';
import { MailOutlined, UserOutlined, CopyOutlined, GithubOutlined, ContactsOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import './contactform.css'; 

const Contact = () => {
  const handleCopy = (text) => {
    copy(text);
    message.success(`${text} đã được sao chép!`);
  };

  return (
      <div className='contact-background'>
        <div className="contact-container">
          <h2><ContactsOutlined style={{ marginRight: '10px' }} />Contact Information</h2>
          <div className="contact-info">
            <div className="contact-field">
              <Input prefix={<UserOutlined />} readOnly value="st-louder" />
              <Tooltip title="Sao chép tên">
                <Button icon={<CopyOutlined />} onClick={() => handleCopy('st-louder')} />
              </Tooltip>
            </div>
            <div className="contact-field">
              <Input prefix={<MailOutlined />} readOnly value="lyvanmy357@gmail.com" />
              <Tooltip title="Sao chép email">
                <Button icon={<CopyOutlined />} onClick={() => handleCopy('lyvanmy357@gmail.com')} />
              </Tooltip>
            </div>
            <div className="contact-field">
              <Input prefix={<GithubOutlined />} readOnly value="https://github.com/St-Louder" />
              <Tooltip title="Sao chép GitHub Profile">
                <Button icon={<CopyOutlined />} onClick={() => handleCopy('https://github.com/St-Louder')} />
              </Tooltip>
            </div>
            <div className="contact-field">
              <Input prefix={<GithubOutlined />} readOnly value="https://github.com/mysft02/SWP391_Group2.git" />
              <Tooltip title="Sao chép GitHub Profile">
                <Button icon={<CopyOutlined />} onClick={() => handleCopy('https://github.com/mysft02/SWP391_Group2.git')} />
              </Tooltip>
            </div>
          </div>
    </div>

      </div>
  );
};

export default Contact;
