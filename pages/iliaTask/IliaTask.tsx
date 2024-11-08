import React, { ChangeEvent, Children, useState } from 'react'
import ReusableInput from './ReusableInput'
import { style } from 'wavesurfer.js/src/util'

interface FormStateType {
  firstName: string
  lastName: string
  location: {
    [key: string]: string | any
  }
}

const IliaTask = ({ initialValue }: any) => {
  const [formState, setFormState] = useState<any>(initialValue)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        inputValue: value,
      },
    }))

    // objHandler(initialValue)
  }

  // const renderInputs = (obj): any => {
  //   return Object.keys(obj).map(key => {
  //     // while (typeof obj[key] === 'object' && 'children' in obj[key]) {
  //       if (typeof obj[key]  && 'children' in obj[key]) {
  //         return renderInputs(obj[key].children)
  //       } else {
  //         return (
  //           // {objHandler(initialvalue)}
  //           <div key={key}>
  //             <input
  //               type={obj}
  //               name={key}
  //               defaultValue={obj[key].inputValue}
  //               placeholder={obj[key].placeholder}
  //               // onChange={handleChange}
  //             />
  //           </div>
  //         )
  //       }
  //     // }
  //   })
  // }

  // con 

  const objHandler = (obj: any) => {
    return Object.keys(obj).map(key => {
      console.log(obj,"object") 
      const childObj = obj[key]
      console.log(childObj,"childObj")

      if (typeof childObj === 'object' && childObj != "children" && childObj != "") {
        return (
          <div key={key}>
           <input
              type={childObj.type}
              placeholder={childObj.placeholder}
              defaultValue={childObj.value}
              onChange={handleChange}
            />
            {childObj.children &&  objHandler(childObj.children)}
          </div>
        )
      }else{

      }
      return null
    })
  }

  // console.log(formState)

  // objHandler(initialValue)

  // const inputFields = [
  //   { type:"text", name: 'firstName', placeholder: 'FirstName', value: formState.firstName },
  //   { type:"text", name: 'lastName', placeholder: 'LastName', value: formState.lastName },
  //   { type:"text", name: 'location.city', placeholder: 'City', value: formState.location.city },
  //   { type:"text", name: 'location.country.address', placeholder: 'CountryAddress', value: formState.location?.country?.address },
  //   { type:"text", name: 'location.country.number', placeholder: 'CountryNumber', value: formState.location?.country?.number }
  // ];

  return (
    <div>
      <h1>IliaTask</h1>

      {objHandler(initialValue)}
      {/* {renderedValues?.map((key: any, index: number) => {
        const obj = initialValue[key]
        return (
          <div key={index}>
            <ReusableInput
              name={obj.name}
              placeholder={obj.placeholder}
              value={obj.inputValue}
              onchange={handleChange}
            />
          </div>
        )
      })} */}
    </div>
  )
}

export default IliaTask
