import React, { useState } from 'react';
import { Form, Input, Button, TimePicker, Select, Row, Col, Card, Checkbox } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const initialState = {
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
      meals: [],
    },
    tuesday: {
      hours: {
        open: '',
        close: '',
      },
      meals: [],
    },
    wednesday: {
      hours: {
        open: '',
        close: '',
      },
      meals: [],
    },
    thursday: {
      hours: {
        open: '',
        close: '',
      },
      meals: [],
    },
    friday: {
      hours: {
        open: '',
        close: '',
      },
      meals: [],
    },
    saturday: {
      hours: {
        open: '',
        close: '',
      },
      meals: [],
    },
    sunday: {
      hours: {
        open: '',
        close: '',
      },
      meals: [],
    },
  },
};

const AddMealForm = ({ city }) => {
  const [form] = Form.useForm();
  const [schedule, setSchedule] = useState(initialState);

  const addMeal = (day) => {
    setSchedule({
      ...schedule,
      schedule: {
        ...schedule.schedule,
        [day]: {
          ...schedule.schedule[day],
          meals: [
            ...schedule.schedule[day].meals,
            { type: '', start: null, end: null },
          ],
        },
      },
    });
  };

  const deleteMeal = (day, index) => {
    const newMeals = [...schedule.schedule[day].meals];
    newMeals.splice(index, 1);
    setSchedule({
      ...schedule,
      schedule: {
        ...schedule.schedule,
        [day]: { ...schedule.schedule[day], meals: newMeals },
      },
    });
  };

  const handleMealChange = (day, index, field, value) => {
    const newMeals = [...schedule.schedule[day].meals];
    newMeals[index][field] = value;
    setSchedule({
      ...schedule,
      schedule: {
        ...schedule.schedule,
        [day]: { ...schedule.schedule[day], meals: newMeals },
      },
    });
  };

  const handleSubmit = async (values) => {
    const mealData = { ...values, schedule };
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/toronto/meals`, mealData);
      console.log('Meal created:', response.data);
    } catch (error) {
      console.error('Error creating meal:', error);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout='vertical'
      initialValues={schedule}
    >
    <Card></Card>
    <Card></Card>
      <Card title='General Information'>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name='name'
              label='Name'
              rules={[{ required: true, message: 'Please enter the name' }]}
            >
              <Input
                onChange={(e) =>
                  setSchedule({ ...schedule, name: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name={['address', 'street']}
              label='Street'
              rules={[{ required: true, message: 'Please enter the street' }]}
            >
              <Input
                onChange={(e) =>
                  setSchedule({
                    ...schedule,
                    address: { ...schedule.address, street: e.target.value },
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['address', 'city']}
              label='City'
              rules={[{ required: true, message: 'Please enter the city' }]}
            >
              <Select onChange={(e) =>
                  setSchedule({
                    ...schedule,
                    address: { ...schedule.address, city: e.target },
                  })
                }
              >
              <Option value='toronto'>Toronto</Option>
            </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['address', 'province']}
              label='Province'
              rules={[{ required: true, message: 'Please enter the province' }]}
            >
              <Select onChange={(e) =>
                  setSchedule({
                    ...schedule,
                    address: { ...schedule.address, province: e.target },
                  })
                }
              >
              <Option value='ON'>ON</Option>
            </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['address', 'postal_code']}
              label='Postal Code'
              rules={[
                { required: true, message: 'Please enter the postal code' },
              ]}
            >
              <Input
                onChange={(e) =>
                  setSchedule({
                    ...schedule,
                    address: {
                      ...schedule.address,
                      postal_code: e.target.value,
                    },
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name={['contact', 'primary']}
              label='Primary Phone'
              rules={[
                { required: true, message: 'Please enter the primary phone' },
              ]}
            >
              <Input
                onChange={(e) =>
                  setSchedule({
                    ...schedule,
                    contact: { ...schedule.contact, primary: e.target.value },
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['contact', 'ext']} label='Extension'>
              <Input
                onChange={(e) =>
                  setSchedule({
                    ...schedule,
                    contact: { ...schedule.contact, ext: e.target.value },
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['contact', 'website']} label='Website'>
              <Input
                onChange={(e) =>
                  setSchedule({
                    ...schedule,
                    contact: { ...schedule.contact, website: e.target.value },
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card title='Demographic Information'>
        <Form.Item
          name={['demographic', 'population']}
          label='Population'
          rules={[{ required: true, message: 'Please select a population' }]}
        >
          <Select
            onChange={(value) =>
              setSchedule({ ...schedule, demographic: { population: value } })
            }
          >
            <Option value='Anyone'>Anyone</Option>
            <Option value='Adults Only'>Adults Only</Option>
            <Option value='Men'>Men</Option>
            <Option value='Women'>Women</Option>
            <Option value='Youth'>Youth</Option>
          </Select>
        </Form.Item>
      </Card>

      <Card title='Notes'>
        <Form.Item name='notes' label='Notes'>
          <Input.TextArea
            onChange={(e) =>
              setSchedule({ ...schedule, notes: e.target.value })
            }
          />
        </Form.Item>
      </Card>

      <Card title='Accessibility Information'>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name={['accessibility', 'service_dog_allowed']}
              valuePropName='checked'
            >
              <Checkbox
                onChange={(e) =>
                  setSchedule({
                    ...schedule,
                    accessibility: {
                      ...schedule.accessibility,
                      service_dog_allowed: e.target.checked,
                    },
                  })
                }
              >
                Service Dog Allowed
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['accessibility', 'wheelchair_accessible']}
              valuePropName='checked'
            >
              <Checkbox
                onChange={(e) =>
                  setSchedule({
                    ...schedule,
                    accessibility: {
                      ...schedule.accessibility,
                      wheelchair_accessible: e.target.checked,
                    },
                  })
                }
              >
                Wheelchair Accessible
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {Object.keys(schedule.schedule).map((day) => (
        <Card key={day} title={day.charAt(0).toUpperCase() + day.slice(1)}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label='Opening Time'>
                <TimePicker
                  use12Hours
                  format='h:mm a'
                  onChange={(time) =>
                    setSchedule({
                      ...schedule,
                      schedule: {
                        ...schedule.schedule,
                        [day]: {
                          ...schedule.schedule[day],
                          hours: {
                            ...schedule.schedule[day].hours,
                            open: time,
                          },
                        },
                      },
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='Closing Time'>
                <TimePicker
                  use12Hours
                  format='h:mm a'
                  onChange={(time) =>
                    setSchedule({
                      ...schedule,
                      schedule: {
                        ...schedule.schedule,
                        [day]: {
                          ...schedule.schedule[day],
                          hours: {
                            ...schedule.schedule[day].hours,
                            close: time,
                          },
                        },
                      },
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          {schedule.schedule[day].meals.map((meal, index) => (
            <Row gutter={[16, 16]} key={index}>
              <Col span={6}>
                <Form.Item label='Meal Type'>
                  <Select
                    value={meal.type}
                    onChange={(value) =>
                      handleMealChange(day, index, 'type', value)
                    }
                  >
                    <Option value='breakfast'>Breakfast</Option>
                    <Option value='lunch'>Lunch</Option>
                    <Option value='dinner'>Dinner</Option>
                    <Option value='snack'>Snack</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label='Start Time'>
                  <TimePicker
                    use12Hours
                    format='h:mm a'
                    value={meal.start ? moment(meal.start, 'h:mm a') : null}
                    onChange={(time) =>
                      handleMealChange(
                        day,
                        index,
                        'start',
                        time ? time.format('h:mm a') : null
                      )
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label='End Time'>
                  <TimePicker
                    use12Hours
                    format='h:mm a'
                    value={meal.end ? moment(meal.end, 'h:mm a') : null}
                    onChange={(time) =>
                      handleMealChange(
                        day,
                        index,
                        'end',
                        time ? time.format('h:mm a') : null
                      )
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Button
                  type='dashed'
                  danger
                  onClick={() => deleteMeal(day, index)}
                >
                  Delete Meal
                </Button>
              </Col>
            </Row>
          ))}
          <Button type='dashed' onClick={() => addMeal(day)}>
            Add Meal
          </Button>
        </Card>
      ))}
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddMealForm;
