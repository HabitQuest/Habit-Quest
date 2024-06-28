const FormInput = ({ label, id, ...props }) => {
  return (
    <div className="relative my-1">
      <input
        id={id}
        className="bg-green block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm appearance-none peer outline-yellow"
        placeholder=""
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
