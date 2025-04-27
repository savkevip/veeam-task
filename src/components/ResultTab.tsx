import { FormikErrors, useFormik } from 'formik';

import { FormConfig } from '../utils/schemas';
import { Button } from './Button';
import { getInitialValues, validateRequiredFields } from '../utils/validation';

type Props = {
  config: FormConfig;
};

export const ResultTab = ({ config }: Props) => {
  const formik = useFormik({
    initialValues: getInitialValues(config.fields),
    validate: (values) => {
      let errors: FormikErrors<Record<string, string>> = {};
      errors = { ...errors, ...validateRequiredFields(config.fields, values) };

      return errors;
    },
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">{config.title}</h2>

      {config.fields.map((field, index) => {
        const fieldKey = `${field.type}-${field.label}`;

        return (
          <div key={index}>
            <label htmlFor={fieldKey} className="block mb-1">
              {field.label}
            </label>
            {field.type === 'string' || field.type === 'number' || field.type === 'date' ? (
              <input
                id={fieldKey}
                type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                {...formik.getFieldProps(fieldKey)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            ) : field.type === 'multi-line' ? (
              <textarea
                id={fieldKey}
                {...formik.getFieldProps(fieldKey)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            ) : field.type === 'boolean' ? (
              <input
                id={fieldKey}
                type="checkbox"
                {...formik.getFieldProps(fieldKey)}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            ) : field.type === 'enum' ? (
              <select
                id={fieldKey}
                {...formik.getFieldProps(fieldKey)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {field.options?.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : null}

            {formik.errors[fieldKey] && formik.touched[fieldKey] && (
              <div className="text-red-500 text-xs mt-0.5">
                {typeof formik.errors[fieldKey] === 'string'
                  ? formik.errors[fieldKey]
                  : Array.isArray(formik.errors[fieldKey])
                    ? formik.errors[fieldKey].join(', ')
                    : formik.errors[fieldKey]}
              </div>
            )}
          </div>
        );
      })}

      <div className="flex space-x-2">
        {config.buttons.map((button, index) => (
          <Button
            key={index}
            type={button.type}
            variant={button.type === 'submit' ? 'primary' : 'secondary'}
            onClick={() => {
              if (button.type !== 'submit') {
                console.log(`${button.text} button clicked`);
              }
            }}
          >
            {button.text}
          </Button>
        ))}
      </div>
    </form>
  );
};
