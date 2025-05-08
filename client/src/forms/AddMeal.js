import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  TimePicker,
  Select,
  Row,
  Col,
  Card,
  Checkbox,
} from 'antd';
import moment from 'moment';

const { Option } = Select;

export default function AddMeal() {
  // build new meal object to hold data, to be submitted to server
  const [formData, setFormData] = useState({
    name: '',
    address: {
      street: '',
      city: '',
      province: '',
      postal_code: '',
    },
    contact: {
      phone: {
        primary: {
          number: '',
          ext: '',
        },
        secondary: {
          number: '',
          ext: '',
        },
      },
      email: '',
      website: '',
    },
    demographic: {
      population: '',
    },
    notes: '',
    accessibility: {
      service_dog_allowed: false,
      wheelchair_accessible: false,
    },
    schedule: {
      monday: {
        hours: {
          open: '',
          close: '',
        },
        meals: {
          breakfast: {
            served: false,
            start: '',
            end: '',
          },
          lunch: {
            served: false,
            start: '',
            end: '',
          },
          dinner: {
            served: false,
            start: '',
            end: '',
          },
          snack: {
            served: false,
            start: '',
            end: '',
          },
        },
      },
      tuesday: {
        hours: {
          open: '',
          close: '',
        },
        meals: {
          breakfast: {
            served: false,
            start: '',
            end: '',
          },
          lunch: {
            served: false,
            start: '',
            end: '',
          },
          dinner: {
            served: false,
            start: '',
            end: '',
          },
          snack: {
            served: false,
            start: '',
            end: '',
          },
        },
      },
      wednesday: {
        hours: {
          open: '',
          close: '',
        },
        meals: {
          breakfast: {
            served: false,
            start: '',
            end: '',
          },
          lunch: {
            served: false,
            start: '',
            end: '',
          },
          dinner: {
            served: false,
            start: '',
            end: '',
          },
          snack: {
            served: false,
            start: '',
            end: '',
          },
        },
      },
      thursday: {
        hours: {
          open: '',
          close: '',
        },
        meals: {
          breakfast: {
            served: false,
            start: '',
            end: '',
          },
          lunch: {
            served: false,
            start: '',
            end: '',
          },
          dinner: {
            served: false,
            start: '',
            end: '',
          },
          snack: {
            served: false,
            start: '',
            end: '',
          },
        },
      },
      friday: {
        hours: {
          open: '',
          close: '',
        },
        meals: {
          breakfast: {
            served: false,
            start: '',
            end: '',
          },
          lunch: {
            served: false,
            start: '',
            end: '',
          },
          dinner: {
            served: false,
            start: '',
            end: '',
          },
          snack: {
            served: false,
            start: '',
            end: '',
          },
        },
      },
      saturday: {
        hours: {
          open: '',
          close: '',
        },
        meals: {
          breakfast: {
            served: false,
            start: '',
            end: '',
          },
          lunch: {
            served: false,
            start: '',
            end: '',
          },
          dinner: {
            served: false,
            start: '',
            end: '',
          },
          snack: {
            served: false,
            start: '',
            end: '',
          },
        },
      },
      sunday: {
        hours: {
          open: '',
          close: '',
        },
        meals: {
          breakfast: {
            served: false,
            start: '',
            end: '',
          },
          lunch: {
            served: false,
            start: '',
            end: '',
          },
          dinner: {
            served: false,
            start: '',
            end: '',
          },
          snack: {
            served: false,
            start: '',
            end: '',
          },
        },
      },
      claimed_by: '',
      last_updated: '',
    },
  });

  const { form } = Form.useForm();

  // event handler that updates state, handles multiple form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // form input validator

  // form submit handler
  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log('FORM DATA:', formData);
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout='vertical'
      >
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please enter the name' }]}
        >
          <Input
            name='name'
            placeholder='Enter name'
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Item>

        <h2>Address</h2>
        <Form.Item
          name={['address', 'street']}
          label='Street'
          rules={[{ required: true, message: 'Please enter the street' }]}
        >
          <Input
            name='address.street'
            placeholder='Street'
            value={formData.address.street}
            onChange={handleChange}
          />
        </Form.Item>
        <br />
        <Form.Item
          name={['address', 'city']}
          label='City'
          rules={[{ required: true, message: 'Please enter the city' }]}
        >
          <Input
            name='address.city'
            placeholder='City'
            value={formData.address.city}
            onChange={handleChange}
          />
        </Form.Item>
        <br />
        <Form.Item
          name={['address', 'province']}
          label='Province'
          rules={[{ required: true, message: 'Please enter the province' }]}
        >
          <Input
            name='address.province'
            placeholder='Province'
            value={formData.address.province}
            onChange={handleChange}
          />
        </Form.Item>
        <br />
        <Form.Item
          name={['address', 'postal_code']}
          label='Postal Code'
          rules={[{ required: true, message: 'Please enter the postal code' }]}
        >
          <Input
            name='address.postal_code'
            placeholder='Postal Code'
            value={formData.address.postal_code}
            onChange={handleChange}
          />
        </Form.Item>

        <br />
        <br />
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
