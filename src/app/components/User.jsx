import React from 'react';
import { Quality } from './Quality.jsx'
import { BookMark } from './bookmark'

export const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookMark,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <BookMark
          status={bookmark}
          onClick={() => onToggleBookMark(_id)}
        />
      </td>
      <td>
        <button
          onClick={() => onDelete(_id)}
          className="btn btn-danger"
        >
          delete
        </button>
      </td>
    </tr>
  );
};
