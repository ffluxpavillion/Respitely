import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Table, Button, Modal, Input, Tag, Space, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';
import './AdminPanel.scss';

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [internalNotes, setInternalNotes] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const [meals, setMeals] = useState({}); // Map mealId -> mealName

  const fetchMeals = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/toronto/meals`);
      const mealsData = response.data;
      const mealMap = {};
      mealsData.forEach(meal => {
        const id = meal._id || meal.id;
        mealMap[id] = meal.name;
      });
      setMeals(mealMap);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };


  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/toronto/provider-requests`);
      const rawData = response.data;
      console.log('Fetched raw data:', rawData);


      const transformed = Array.isArray(rawData)
        ? rawData.map(r => ({
            ...r,
            name: `${r.firstName} ${r.lastName}`.trim(),
            message: r.additionalMessage
          }))
        : [];

      setRequests(transformed);
    } catch (error) {
      toast.error('Failed to fetch access requests');
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchRequests();
    fetchMeals();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    setProcessingId(id);
    try {
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/toronto/provider-requests/${id}/status`, {
        status,
        internalNotes: internalNotes.trim() || undefined
      });

      toast.success(`Request ${status} successfully`);
      setRequests(requests.map(request =>
        request._id === id ? { ...request, status } : request
      ));
      setIsModalVisible(false);
      setInternalNotes('');
    } catch (error) {
      toast.error(`Failed to ${status} request`);
      console.error('Error updating request:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const showModal = (request) => {
    setSelectedRequest(request);
    setInternalNotes(request.internalNotes || '');
    setIsModalVisible(true);
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      pending: { color: 'warning', text: 'Pending' },
      approved: { color: 'success', text: 'Approved' },
      rejected: { color: 'error', text: 'Rejected' }
    };
    const config = statusConfig[status];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Organization',
      dataIndex: 'orgName',
      key: 'orgName',
      sorter: (a, b) => a.orgName.localeCompare(b.orgName)
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Meal Service',
      dataIndex: 'mealId',
      key: 'mealId',
      render: (mealId) => meals[mealId] || 'Other'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Submitted',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              onClick={() => showModal(record)}
            />
          </Tooltip>
          {record.status === 'pending' && (
            <>
              <Tooltip title="Approve">
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={() => showModal(record)}
                  loading={processingId === record._id}
                />
              </Tooltip>
              <Tooltip title="Reject">
                <Button
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={() => showModal(record)}
                  loading={processingId === record._id}
                />
              </Tooltip>
            </>
          )}
        </Space>
      )
    }
  ];

  return (
    <div className="requests-table">
      <h2>Access Requests</h2>
      <Table
        columns={columns}
        dataSource={Array.isArray(requests) ? requests : []}
        rowKey="_id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} requests`
        }}
      />

      <Modal
        title="Review Access Request"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setInternalNotes('');
        }}
        footer={null}
        width={800}
      >
        {selectedRequest && (
          <div className="request-details">
            <div className="details-grid">
              <div className="detail-item">
                <label>Name: </label>
                <span>{selectedRequest.name}</span>
              </div>
              <div className="detail-item">
                <label>Organization: </label>
                <span>{selectedRequest.orgName}</span>
              </div>
              <div className="detail-item">
                <label>Email: </label>
                <span>{selectedRequest.email}</span>
              </div>
              <div className="detail-item">
                <label>Phone: </label>
                <span>{selectedRequest.phone}</span>
              </div>
              <div className="detail-item">
                <label>Website: </label>
                <span>{selectedRequest.website || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <label>Meal Service: </label>
                <span>{meals[selectedRequest.mealId] || 'Other'}</span>
              </div>
              <div className="detail-item">
                <label>Message: </label>
                <span>{selectedRequest.additionalMessage || 'No message provided'}</span>
              </div>
              <div className="detail-item">
                <label>Proof of Affiliation: </label>
                <a href={selectedRequest.proofOfAffiliation} target="_blank" rel="noopener noreferrer">
                  View Document
                </a>
              </div>
              <br />
            </div>

            <div className="action-section">
              <Input.TextArea
                placeholder="Add internal notes about this decision..."
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={4}
              />
              <br />
              <br />

              <div className="action-buttons">
                {selectedRequest.status === 'pending' && (
                  <>
                    <Button
                      type="primary"
                      icon={<CheckCircleOutlined />}
                      onClick={() => handleStatusUpdate(selectedRequest._id, 'approved')}
                      loading={processingId === selectedRequest._id}
                    >
                      Approve
                    </Button>
                    <Button
                      danger
                      icon={<CloseCircleOutlined />}
                      onClick={() => handleStatusUpdate(selectedRequest._id, 'rejected')}
                      loading={processingId === selectedRequest._id}
                    >
                      Reject
                    </Button>
                  </>
                )}
                <Button onClick={() => setIsModalVisible(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminPanel;