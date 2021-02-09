import classNames from 'classnames';
import { useState } from 'react';

interface InputGroupProps {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
  password?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  className,
  type,
  placeholder,
  value,
  error,
  setValue,
  password,
}) => {
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const toggleHidden = () => setHiddenPassword(!hiddenPassword);

  return (
    <div className={className}>
      <input
        type={hiddenPassword ? type : 'text'}
        className={classNames('input-postitt', {
          'border-red-500': error,
        })}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {password ? (
        <span className="absolute right-0 py-2 pr-3 text-xl text-gray-400" onClick={toggleHidden}>
          {hiddenPassword ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}
        </span>
      ) : (
        ''
      )}
      <small className="font-medium text-red-600">{error}</small>
    </div>
  );
};

export default InputGroup;
