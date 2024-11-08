import React,{ChangeEvent,} from 'react'


type InputPropsType ={
    type?:string;
    name:string;
    value:string | number;
    placeholder:string;
    onchange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}

const ReusableInput = ({type,name,value,placeholder,onchange}:InputPropsType) => {
  return (
    <div>
        <input
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={value}
        onChange={onchange}
      />
    </div>
  )
}

export default ReusableInput