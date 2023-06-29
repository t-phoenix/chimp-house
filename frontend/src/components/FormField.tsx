
const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange }: {labelName: string, placeholder: string, inputType: React.HTMLInputTypeAttribute | undefined, isTextArea: boolean, value: string | number | readonly string[], handleChange: () => void  }) => {
  return (
    <label >
      {labelName && (
        <span >{labelName}: </span>
      )}
      {isTextArea ? (
        <textarea 
          required
          value={value}
          onChange={handleChange}
          rows={5}
          placeholder={placeholder}
        //   className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input 
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          style={{margin: '5px'}}
          //className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[24px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  )
}

export default FormField