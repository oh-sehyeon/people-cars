import { Card } from 'antd';
import RemovePerson from '../buttons/RemovePerson';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import UpdatePerson from '../forms/UpdatePerson';
import CarList from '../lists/CarList';
import { Link } from 'react-router-dom';

const Person = props => {
  const { id, firstName, lastName } = props;
  const styles = getStyles();
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemovePerson id={id} firstName={firstName} lastName={lastName} />
          ]}
        >
          {firstName} {lastName}
          <CarList personID={id} />
          <Link to={`/people/${id}`}>Learn More</Link>
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: '1300px',
    border: '2px solid #BCBCBC',
    fontSize: '18px'
  }
});

export default Person;