import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, Modal, notification, Select } from 'antd';
import { api } from '../../../../config/AxiosConfig'; // Đường dẫn tới file cấu hình Axios
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Thêm các icon
import { UserOutlined, TagsOutlined, AppstoreOutlined } from '@ant-design/icons'; // Icon cho các field
function Category() {
  const [categories, setCategories] = useState([]);
  const [standards, setStandards] = useState([]); // Thêm state để lưu danh sách standards
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();
  
  // Lấy danh sách Koi Category từ API
  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/KoiCategory/Get all KoiCategory');
      setCategories(response.data.map(category => ({
        category_id: category.category_id,
        category_name: category.category_name,
        standard_id: category.standard_id,
      })));
    } catch (error) {
      console.error('Error fetching categories:', error);
      notification.error({
        message: 'Fetch Failed',
        description: 'Could not fetch categories.',
      });
    }
  };

  // Lấy danh sách standard_id từ API
  const fetchStandards = async () => {
    try {
      const response = await api.get('/api/KoiStandard/Get All KoiStandard');
      setStandards(response.data);
    } catch (error) {
      console.error('Error fetching standards:', error);
      notification.error({
        message: 'Fetch Failed',
        description: 'Could not fetch standards.',
      });
    }
  };

  useEffect(() => {
    fetchCategories(); // Lấy danh sách categories khi component được mount
    fetchStandards(); // Lấy danh sách standards khi component được mount
  }, []);

  // Hàm tạo mới Koi Category
  const createCategory = async (values) => {
    try {
      await api.post('/api/KoiCategory/Create KoiCategory', values);
      notification.success({
        message: 'Create Success',
        description: 'Category created successfully.',
      });
      setIsModalVisible(false);
      fetchCategories(); // Cập nhật lại danh sách sau khi tạo mới
    } catch (error) {
      console.error('Error creating category:', error);
      notification.error({
        message: 'Create Failed',
        description: 'Could not create category.',
      });
    }
  };

  // Hàm cập nhật Koi Category
  const updateCategory = async (values) => {
    console.log("Values:",values);
    console.log("EditingCa:",editingCategory);
    try {
      // Đảm bảo gửi đủ payload với category_id, category_name và standard_id
      const payload = {
        category_id: editingCategory.category_id, // lấy từ editingCategory
        category_name: values.category_name,
        standard_id: values.standard_id,
      };
      console.log("Payload:",payload)
      await api.put(`/api/KoiCategory/Update KoiCategory/${payload.category_id}`, payload);
      notification.success({
        message: 'Update Success',
        description: 'Category updated successfully.',
      });
      setIsModalVisible(false);
      setEditingCategory(null);
      fetchCategories(); // Cập nhật lại danh sách sau khi chỉnh sửa
    } catch (error) {
      console.error('Error updating category:', error);
      notification.error({
        message: 'Update Failed',
        description: 'Could not update category.',
      });
    }
  };

  // Hàm xử lý submit form
  const handleSubmit = (values) => {
    if (editingCategory) {
      updateCategory(values);
    } else {
      createCategory(values);
    }
  };

  // Mở modal để thêm hoặc chỉnh sửa Koi Category
  const showModal = (category) => {
    setEditingCategory(category);
    form.setFieldsValue({
      category_name: category ? category.category_name : '',
      standard_id: category ? category.standard_id : undefined,
    });
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    form.resetFields(); // Đặt lại trường biểu mẫu
  };

  // Xóa Koi Category
  const handleDelete = async (id) => {
    console.log("id:",id)
    try {
      await api.delete(`/api/KoiCategory/Delete KoiCategory?KoiCategoryId=${id}`);
      notification.success({
        message: 'Delete Success',
        description: 'Category deleted successfully.',
      });
      fetchCategories(); // Cập nhật lại danh sách sau khi xóa
    } catch (error) {
      console.error('Error deleting category:', error);
      notification.error({
        message: 'Delete Failed',
        description: 'Could not delete category.',
      });
    }
  };

  const columns = [
    {
      title: 'Category ID',
      dataIndex: 'category_id',
      key: 'category_id',
    },
    {
      title: 'Category Name',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'Standard ID',
      dataIndex: 'standard_id',
      key: 'standard_id',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.category_id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  

  return (
    <div>
      <h1>Koi Category Management</h1>
      <Button 
        type="primary" 
        onClick={() => showModal(null)} 
        icon={<PlusOutlined />} 
        style={{ marginBottom: '20px' }}
      >
        Add Koi Category
      </Button>

      <Table dataSource={categories} columns={columns} rowKey="category_id" />

      <Modal
        title={editingCategory ? "Edit Koi Category" : "Add Koi Category"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >

      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="category_name"
          label="Category Name"
          rules={[{ required: true, message: 'Please input the name of the Koi category!' }]}
        >
          <Input prefix={<TagsOutlined />} placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          name="standard_id"
          label="Standard ID"
          rules={[{ required: true, message: 'Please select the standard!' }]}
        >
          <Select
            placeholder="Select a standard"
            suffixIcon={<AppstoreOutlined />} // Icon cho Select
          >
            {standards.map((standard) => (
              <Select.Option key={standard.standard_id} value={standard.standard_id}>
                {standard.standard_id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={editingCategory ? <EditOutlined /> : <PlusOutlined />}>
            {editingCategory ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>

      </Modal>
    </div>
  );
}

export default Category;
