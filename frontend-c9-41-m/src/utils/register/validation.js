import * as yup from 'yup'

const validationSchemaRegister = yup.object().shape({
  fullName: yup
    .string()
    .max(25, 'Máximo 25 carácteres'),
  email: yup
    .string()
    .email('Ingresa un correo válido')
    .required('Campo obligatorio'),
  //   birthday: yup
  //     .date()
  //     .transform((value, originalValue) => {
  //       if (originalValue) {
  //         return new Date(originalValue)
  //       }
  //       return value
  //     })
  //     .min(new Date('1900-01-01'), 'La fecha es demasiado antigua')
  //     .max(new Date(), 'La fecha no puede ser en el futuro')
  //     .typeError('Fecha inválida')
  //     .test('is-formatted', 'Use el formato AAAA-MM-DD', (value) => {
  //       const regex = /^\d{4}-\d{2}-\d{2}$/
  //       return regex.test(value)
  //     }),
  phoneNumber: yup
    .number()
    .max(1000000000000, 'Máximo 12 digitos')
    .typeError('Debe ingresar un número'),
  password: yup
    .string()
    .required('Campo obligatorio'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Campo obligatorio')
})

export default validationSchemaRegister
