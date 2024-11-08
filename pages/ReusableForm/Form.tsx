import React, { ChangeEvent, useState } from 'react'
import Input from './Input'
import IliaTask from '@pages/iliaTask/IliaTask'

type FormType = {
  [name: string]: {
    type: string
    name: string
    placeholder: string
    inputValue: string
    children: {
      street: {
        type: string
        name: string
        placeholder: string
        inputValue: string
      }
    }
  }
}

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }
  const obj = {
    street: {
      type: 'text',
      name: 'street',
      placeholder: 'Street',
      inputValue: '',
    },
  }
  const initialValue: any = {
    firstName: {
      type: 'text',
      name: 'firstName',
      placeholder: 'FirstName',
      inputValue: '',
      children: {
        street: {
          type: 'text',
          name: 'street',
          placeholder: 'Street',
          inputValue: '',
        },
      },
    },
    lastName: {
      type: 'text',
      name: 'lastName',
      placeholder: 'LastName',
      inputValue: '',
      children: {
        apartment: {
          type: 'text',
          name: 'apartment',
          placeholder: 'apartment',
          inputValue: '',
          children: {
            number: {
              type: 'text',
              name: 'number',
              placeholder: 'number',
              inputValue: '',
              children: {
                houseIndex: {
                  type: 'text',
                  name: 'houseIndex',
                  placeholder: 'houseIndex',
                  inputValue: '',
                }
              }
            },
          },
          
        },
      },
    },
  }

  return (
    <div>
      <h1>form</h1>
      {/* <Input name={for} /> */}

      {}
      {/* <Input formObj={formObj} /> */}
      <IliaTask initialValue={initialValue} />
      {/* <input
        name="firstName"
        type="text"
        placeholder="firstName"
        value={formData.firstName}
        onchange={handleChange}
      /> */}

      {/* <input type="text" name='firstName' placeholder='name' value={formData.firstName} onChange={handleChange} /> */}
    </div>
  )
}

export default Form
