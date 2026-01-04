import { useFormik } from 'formik';
import toast from 'react-hot-toast';

const useCustomForm = (initialValues, onSubmit, validationSchema) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const response = await onSubmit(values, { setErrors });
        toast.success(response.data.message);
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          setErrors({ server: 'An error accured. please try again' });
        }
        console.log(error, 'from the data');
      }
    },
    enableReinitialize: true,
  });
  return { formik };
};

export default useCustomForm;