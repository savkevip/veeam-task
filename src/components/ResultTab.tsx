import { FormConfig } from '../utils/schemas';
import { Button } from './Button';

type Props = {
  config: FormConfig;
};

export const ResultTab = ({ config }: Props) => {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-semibold">{config.title}</h2>

      {config.fields.map((field, index) => {
        switch (field.type) {
          case 'string':
            return (
              <div key={index}>
                <label className="block mb-1">{field.label}</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
            );
          case 'number':
            return (
              <div key={index}>
                <label className="block mb-1">{field.label}</label>
                <input type="number" className="w-full p-2 border rounded" />
              </div>
            );
          case 'multi-line':
            return (
              <div key={index}>
                <label className="block mb-1">{field.label}</label>
                <textarea className="w-full p-2 border rounded" />
              </div>
            );
          case 'boolean':
            return (
              <div key={index} className="flex items-center space-x-2">
                <input type="checkbox" id={`field-${index}`} />
                <label htmlFor={`field-${index}`}>{field.label}</label>
              </div>
            );
          case 'date':
            return (
              <div key={index}>
                <label className="block mb-1">{field.label}</label>
                <input type="date" className="w-full p-2 border rounded" />
              </div>
            );
          case 'enum':
            return (
              <div key={index}>
                <label className="block mb-1">{field.label}</label>
                <select className="w-full p-2 border rounded">
                  {field.options?.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          default:
            return (
              <div key={index} className="text-red-500">
                Unknown field type: {field.type}
              </div>
            );
        }
      })}

      <div className="flex space-x-2">
        {config.buttons.map((button, index) => (
          <Button key={index}>{button.text}</Button>
        ))}
      </div>
    </form>
  );
};
