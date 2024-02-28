import React from 'react'
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function ButtonBack() {
  const navigate = useNavigate();

  /* in this below button's onClick function is auto submitting the form because it is a part of a form
    so we had to recieve event and preventDefault it then navigate started working */

  return (
        <Button onClick={(e) => {e.preventDefault(); navigate(-1);}}
          type="back"
        >
          &larr; Back
        </Button>
  )
}
