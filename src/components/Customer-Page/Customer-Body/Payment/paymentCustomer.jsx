import  { useEffect, useState } from 'react';
import { Form, Input, Button, message as antdMessage, List } from 'antd';
import { UserOutlined, DollarOutlined, CalendarOutlined, TransactionOutlined, CommentOutlined } from '@ant-design/icons';
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';
import moment from 'moment';
import './paymentCustomer.css';

const PaymentCustomer = () => {
    const [form] = Form.useForm();
    const { user } = useUser();
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [hasDisplayedError, setHasDisplayedError] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [hasProcessed, setHasProcessed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Define URL parameters once at the top level
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('vnp_ResponseCode');

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                user_id: user.user_id,
                username: user.username,
                balance: user.balance,
            });
        }
    }, [user, form]);

    useEffect(() => {
        if (status && !hasProcessed && status === '00') {
            console.log('Thanh toán status:', status);
            processVnPay(); // Gọi hàm xử lý thanh toán
            setHasProcessed(true); // Đánh dấu đã xử lý
        } else if (status && status !== '00' && !hasDisplayedError) {
            antdMessage.error('Thanh toán thất bại. Vui lòng thử lại.');
            setHasDisplayedError(true); // Đánh dấu đã hiển thị lỗi
        }
    }, [status, hasProcessed, hasDisplayedError]);

    const processVnPay = async () => {
        if (isProcessing) return; // Ngăn không cho gọi lại nếu đang xử lý
        setIsProcessing(true);

        try {
            const processVnPayDTO = {
                UserName: urlParams.get('vnp_OrderInfo'),
                Amount: parseFloat(urlParams.get('vnp_Amount')) / 100,
            };

            console.log('Processing VnPay với dữ liệu:', processVnPayDTO);
            const response = await api.post('/api/VNPay/Process-Payment', processVnPayDTO, {
                headers: { 
                    'Authorization': `Bearer ${user.accessToken}`,
                    'Content-Type': 'application/json',

                },
            });

            if (response.data) {
                console.log('Kết quả thanh toán:', response.data);
                antdMessage.success(response.data);
            }
        } catch (error) {
            console.error('Lỗi khi xử lý VnPay:', error);
            antdMessage.error('Thanh toán thất bại. Vui lòng thử lại.');
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        const fetchTransactionHistory = async () => {
            try {
                const response = await api.post('/api/VNPay/Get-Transactions', {}, {
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data) {
                    // Sắp xếp theo thời gian (mới nhất trước), sau đó sắp xếp theo số tiền (lớn nhất trước)
                    const sortedData = response.data.sort((a, b) => {
                        const timeComparison = new Date(b.transactions_time) - new Date(a.transactions_time);
                        if (timeComparison !== 0) return timeComparison;
                        return b.amount - a.amount;
                    });

                    setTransactionHistory(sortedData);
                    console.log('Transaction data:', sortedData);
                }
            } catch (error) {
                console.error('Lỗi khi lấy lịch sử giao dịch:', error);
                if (!hasDisplayedError) {
                    antdMessage.error('Không thể lấy lịch sử giao dịch. Vui lòng thử lại.');
                    setHasDisplayedError(true);
                }
            }
        };

        // Đảm bảo chỉ fetch khi có user và transactionHistory chưa có dữ liệu
        if (user && transactionHistory.length === 0) {
            console.log('Fetching transaction history for user:', user);
            fetchTransactionHistory();
        }
    }, [user, transactionHistory.length, hasDisplayedError]);

    const handleSubmit = async (values) => {
        if (isSubmitting) return; // Ngăn không cho gửi lại nếu đã đang gửi
    
        setIsSubmitting(true);  // Đánh dấu đang gửi
    
        try {
            const response = await api.post('/api/VNPay/Get-Payment-Url', values, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.data && response.data.url) {
                window.location.href = response.data.url;
            } else {
                antdMessage.error('Không tìm thấy URL thanh toán. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi nạp tiền:', error);
            antdMessage.error('Không thể nạp tiền. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false); // Cho phép submit lại sau khi hoàn thành
        }
    };

    return (
        <div className="payment-container">
            <div className="form-section payment-form">
                <h2>Payment Form</h2>
                <Form form={form} onFinish={handleSubmit} layout="vertical" style={{ display: 'flex', flexDirection: 'column' }}>
                    <Form.Item label="Tên người dùng" name="username">
                        <Input prefix={<UserOutlined />} disabled />
                    </Form.Item>

                    <Form.Item label="Số dư tài khoản" name="balance">
                        <Input prefix={<DollarOutlined />} disabled />
                    </Form.Item>

                    <Form.Item label="Số tiền nạp" name="amount" rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}>
                        <Input prefix={<DollarOutlined />} type="number" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Nạp Tiền
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className="form-section transaction-history">
                <h2>Lịch sử giao dịch</h2>
                <List
                    itemLayout="horizontal"
                    dataSource={transactionHistory}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={
                                    <span>
                                        <CalendarOutlined style={{ marginRight: '8px' }} />
                                        {moment(item.transactions_time).format('DD/MM/YYYY')}
                                    </span>
                                }
                                description={
                                    <div>
                                        <p><TransactionOutlined style={{ marginRight: '8px' }} /> Mã giao dịch: {item.transactions_id}</p>
                                        <p><DollarOutlined style={{ marginRight: '8px' }} /> Số tiền: {item.amount} VND</p>
                                        <p><CommentOutlined style={{ marginRight: '8px' }} /> Messenger: {item.messages}</p>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default PaymentCustomer;
