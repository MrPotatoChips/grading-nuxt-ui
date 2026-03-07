import * as yup from 'yup'

yup.addMethod(yup.number, 'toNumber', function () {
  return this.transform((value, originalValue) =>
    originalValue === '' ? undefined : value
  )
})
