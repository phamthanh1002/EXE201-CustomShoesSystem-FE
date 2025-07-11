import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Upload, Button, Select, Row, Col, Card } from 'antd';
import { UploadOutlined, PlusOutlined, ShoppingOutlined } from '@ant-design/icons';
import useAllProduct from '../../../hooks/useAllProduct';
import { toast } from 'react-toastify';

const { Option } = Select;
const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

export default function EditProductModal({ open, onClose, onCreate, editingProduct }) {
  const [form] = Form.useForm();
  const { createAccessoryProduct, createCustomProduct, updateProduct, loading } = useAllProduct();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingProduct && open) {
      form.setFieldsValue({
        ProductName: editingProduct.productName,
        Description: editingProduct.description,
        Size: editingProduct.size,
        Color: editingProduct.color,
        Price: editingProduct.price,
        Discount: editingProduct.discount,
        SoldQuantity: editingProduct.soldQuantity,
        StockQuantity: editingProduct.stockQuantity,
        ProductType: editingProduct.productType,
        ImageFile: editingProduct.imageUrl
          ? [
              {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: editingProduct.imageUrl,
              },
            ]
          : [],
      });
    } else {
      form.resetFields();
    }
  }, [editingProduct, open]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const values = await form.validateFields();

      const formData = new FormData();
      formData.append('ProductName', values.ProductName);
      formData.append('Description', values.Description || '');
      formData.append('ImageFile', values.ImageFile?.[0]?.originFileObj);
      formData.append('Size', values.Size || '');
      formData.append('Color', values.Color || '');
      formData.append('Price', values.Price);
      formData.append('Discount', values.Discount ?? 0);
      formData.append('SoldQuantity', values.SoldQuantity ?? 0);
      formData.append('StockQuantity', values.StockQuantity ?? 0);

      const productType = values.ProductType;

      if (!editingProduct?.productID) {
        throw new Error('Không tìm thấy sản phẩm cần sửa');
      }
      await updateProduct(editingProduct.productID, formData);

      toast.success('Tạo sản phẩm thành công!');
      form.resetFields();
      onClose();
      onCreate?.();
    } catch (err) {
      if (err?.errorFields) return;
      message.error(err?.message || 'Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setSubmitting(false); // ✅ tắt loading sau khi xong
    }
  };

  return (
    <Modal
      title={
        <span>
          <ShoppingOutlined style={{ marginRight: 8, color: '#1677ff' }} />
          Chỉnh sửa sản phẩm
        </span>
      }
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Cập nhật"
      cancelText="Hủy"
      confirmLoading={submitting}
      width={850}
    >
      <Card bordered={false} bodyStyle={{ padding: 0 }}>
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 12 }}
          initialValues={{ Discount: 0, SoldQuantity: 0, StockQuantity: 1 }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Tên sản phẩm"
                name="ProductName"
                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>

              <Form.Item
                label="Hình ảnh"
                name="ImageFile"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
              >
                <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Kích thước"
                name="Size"
                rules={[{ required: true, message: 'Vui lòng nhập kích thước' }]}
              >
                <Input placeholder="Nhập size" />
              </Form.Item>

              <Form.Item
                label="Màu sắc"
                name="Color"
                rules={[{ required: true, message: 'Vui lòng nhập màu sắc' }]}
              >
                <Input placeholder="Nhập màu sản phẩm" />
              </Form.Item>

              <Form.Item
                label="Giá sản phẩm (₫)"
                name="Price"
                rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Nhập giá sản phẩm"
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫'}
                  parser={(value) => value.replace(/[₫,\s]/g, '')}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Mô tả"
                name="Description"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
              >
                <Input.TextArea rows={4} placeholder="Mô tả sản phẩm" />
              </Form.Item>

              <Form.Item
                label="Giảm giá (%)"
                name="Discount"
                rules={[{ required: true, message: 'Vui lòng nhập giảm giá' }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  style={{ width: '100%' }}
                  placeholder="Phần trăm giảm"
                />
              </Form.Item>

              <Form.Item
                label="Số lượng đã bán"
                name="SoldQuantity"
                rules={[{ required: true, message: 'Vui lòng nhập số lượng đã bán' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="Số lượng trong kho"
                name="StockQuantity"
                rules={[
                  { required: true, message: 'Vui lòng nhập số lượng trong kho' },
                  {
                    validator: (_, value) =>
                      value > 0
                        ? Promise.resolve()
                        : Promise.reject(new Error('Số lượng trong kho phải lớn hơn 0')),
                  },
                ]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Modal>
  );
}
