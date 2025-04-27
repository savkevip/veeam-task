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
        const fieldId = `field-${index}`;

        switch (field.type) {
          case 'string':
            return (
              <div key={index}>
                <label htmlFor={fieldId} className="block mb-1">
                  {field.label}
                </label>
                <input
                  id={fieldId}
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            );
          case 'number':
            return (
              <div key={index}>
                <label htmlFor={fieldId} className="block mb-1">
                  {field.label}
                </label>
                <input
                  id={fieldId}
                  type="number"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            );
          case 'multi-line':
            return (
              <div key={index}>
                <label htmlFor={fieldId} className="block mb-1">
                  {field.label}
                </label>
                <textarea
                  id={fieldId}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            );
          case 'boolean':
            return (
              <div key={index} className="flex items-center space-x-2">
                <input
                  id={fieldId}
                  type="checkbox"
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <label htmlFor={fieldId}>{field.label}</label>
              </div>
            );
          case 'date':
            return (
              <div key={index}>
                <label htmlFor={fieldId} className="block mb-1">
                  {field.label}
                </label>
                <input
                  id={fieldId}
                  type="date"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            );
          case 'enum':
            return (
              <div key={index}>
                <label htmlFor={fieldId} className="block mb-1">
                  {field.label}
                </label>
                <select
                  id={fieldId}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
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
