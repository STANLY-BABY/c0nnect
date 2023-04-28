import * as Yup from 'yup';

export const signupvalidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('first name is required')
    .min(3, 'first name must be at least 6 characters')
    .max(20, 'first name must not exceed 20 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
    phonenumber:Yup.number()
    .required('Phone number is required')
    .min(10,'Phone number must be atleast 10 numbers')
    ,
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters')
    .max(40, 'Password must not exceed 40 characters'),
    dateOfBirth:Yup.date()
    .required('Date of birth is required'),
});
export const loginvalidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(3, 'Password must be at least 3 characters')
    .max(40, 'Password must not exceed 40 characters'),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(3, 'Password must be at least 3 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmpass: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
})



