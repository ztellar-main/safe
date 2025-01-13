type Props = {
  name: string;
  type: string;
  placeholder: string;
  register: any;
  error: any;
};

const AuthInput = ({ name, type, placeholder, register, error }: Props) => {
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label className="text-sm font-bold tracking-wide">{placeholder}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"
      />
      {error && <p className="text-red-400 ml-4">{error}</p>}
    </div>
  );
};

export default AuthInput;
