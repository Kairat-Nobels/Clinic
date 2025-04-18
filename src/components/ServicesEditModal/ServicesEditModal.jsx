import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Input } from 'rsuite';

const ServiceEditModal = ({ open, onClose, context, onSubmit }) => {
  const { service, type, mode, index } = context;

  const isEdit = type === 'edit';
  const isDoctor = mode === 'doctors';

  const [formData, setFormData] = useState(
    isEdit ? service[mode][index] : isDoctor ? { name: '', post: '' } : { name: '', price: '' }
  );

  useEffect(() => {
    if (isEdit && service[mode][index]) {
      setFormData(service[mode][index]);
    }
  }, [isEdit, service, mode, index]);

  const handleChange = (value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedList = [...service[mode]];
    if (isEdit) {
      updatedList[index] = formData;
    } else {
      updatedList.push(formData);
    }
    onSubmit(updatedList, service.id, mode);
  };

  const title = isEdit
    ? isDoctor ? 'Редактировать врача' : 'Редактировать категорию'
    : isDoctor ? 'Добавить врача' : 'Добавить категорию';

  return (
    <Modal open={open} onClose={onClose} size={500}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid className='service-form'>
          <Form.Group className='serviceModalName'>
            <Form.ControlLabel>{isDoctor ? 'ФИО' : 'Название'}</Form.ControlLabel>
            <Input
              value={formData.name}
              onChange={(val) => handleChange(val, 'name')}
            />
          </Form.Group>
          {isDoctor ? (
            <Form.Group className='serviceModalName'>
              <Form.ControlLabel>Должность</Form.ControlLabel>
              <Input
                value={formData.post}
                onChange={(val) => handleChange(val, 'post')}
              />
            </Form.Group>
          ) : (
            <Form.Group className='serviceModalPrice'>
              <Form.ControlLabel>Цена (сом)</Form.ControlLabel>
              <Input
                value={formData.price}
                onChange={(val) => handleChange(val, 'price')}
                type="number"
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSave}
          appearance="primary"
          disabled={!formData.name || (!isDoctor && !formData.price)}
        >
          Сохранить
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceEditModal;
