import React, { useEffect, useState } from "react";
import { Form, Input, Button, message as antdMessage, List } from "antd";
import {
  UserOutlined,
  DollarOutlined,
  CalendarOutlined,
  TransactionOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { api } from "../../../../config/AxiosConfig";
import { useUser } from "../../../../data/UserContext";
import moment from "moment";
import "./paymentCustomer.css";

const PaymentCustomer = () => {
  const [form] = Form.useForm();
  const { user } = useUser();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [hasDisplayedError, setHasDisplayedError] = useState(false);

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
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("vnp_ResponseCode");
    if (status && !hasDisplayedError) {
      setHasDisplayedError(false);
      if (status === "00") {
        processVnPay();
        antdMessage.success("Thanh toán thành công!");
      } else {
        antdMessage.error("Thanh toán thất bại. Vui lòng thử lại.");
      }
    }
  }, [hasDisplayedError]);

  let tempProcessVNPay = false;
  const processVnPay = async () => {
    if (tempProcessVNPay) return; // Nếu đang xử lý, không thực hiện thêm
    tempProcessVNPay = true; // Đặt flag xử lý
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const processVnPayDTO = {
        UserName: urlParams.get("vnp_OrderInfo"),
        Amount: parseFloat(urlParams.get("vnp_Amount")) / 100,
      };
      await api.post("/api/VNPay/Process-Payment", processVnPayDTO, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error process VnPay:", error);
      antdMessage.error("Thanh toán thất bại. Vui lòng thử lại.");
    } finally {
      tempProcessVNPay = false;
    }
  };

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await api.post(
          "/api/VNPay/Get-Transactions",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          setTransactionHistory(response.data);
        }
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        if (!hasDisplayedError) {
          antdMessage.error(
            "Không thể lấy lịch sử giao dịch. Vui lòng thử lại."
          );
          setHasDisplayedError(true);
        }
      }
    };

    if (user) {
      fetchTransactionHistory();
    }
  }, [user, hasDisplayedError]);

  const handleSubmit = async (values) => {
    try {
      const response = await api.post("/api/VNPay/Get-Payment-Url", values, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        antdMessage.error("Không tìm thấy URL thanh toán. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi nạp tiền:", error);
      antdMessage.error("Không thể nạp tiền. Vui lòng thử lại.");
    }
  };

  return (
    <div className="payment-container">
      <div className="form-section payment-form">
        <h2>Payment Form</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Form.Item label="Tên người dùng" name="username">
            <Input prefix={<UserOutlined />} disabled />
          </Form.Item>

          <Form.Item label="Số dư tài khoản" name="balance">
            <Input prefix={<DollarOutlined />} disabled />
          </Form.Item>

          <Form.Item
            label="Số tiền nạp"
            name="amount"
            rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
          >
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
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <span>
                    <CalendarOutlined style={{ marginRight: "8px" }} />
                    {moment(item.transactions_time).format("DD/MM/YYYY")}
                  </span>
                }
                description={
                  <div>
                    <p>
                      <TransactionOutlined style={{ marginRight: "8px" }} /> Mã
                      giao dịch: {item.transactions_id}
                    </p>
                    <p>
                      <DollarOutlined style={{ marginRight: "8px" }} /> Số tiền:{" "}
                      {item.amount} VND
                    </p>
                    <p>
                      <CommentOutlined style={{ marginRight: "8px" }} />{" "}
                      Messenger: {item.messages}
                    </p>
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
