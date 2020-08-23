interface Options {
  mask: string
  prefix?: string
}

interface PercentageOptions {
  suffix?: string
  precision?: 0 | 1 | 2
}

export const formatar = (value: number | string, options: Options) => {
  const { mask, prefix } = options
  const stringValue = value.toString()

  let valueIndex = 0
  let masked = prefix || ''

  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask.charAt(i)

    if (stringValue.length - 1 < valueIndex) continue

    if (maskChar === '#') {
      masked = masked + stringValue[valueIndex]
      valueIndex++
    } else {
      masked = masked + maskChar
    }
  }

  return masked
}

export const formatarHorario = (value: number | string) => {
  const stringValue = value.toString().replace(/\D+/g, '')

  const mask = '##:##'

  let valueIndex = 0
  let masked = ''

  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask.charAt(i)

    if (stringValue.length - 1 < valueIndex) continue

    if (maskChar === '#') {
      if (valueIndex === 0 && Number(stringValue[valueIndex]) > 2) {
      } else if (valueIndex === 2 && Number(stringValue[valueIndex]) >= 6) {
      } else if (valueIndex === 1 && Number(stringValue[0]) > 1 && Number(stringValue[valueIndex]) >= 4) {
      } else {
        masked = masked + stringValue[valueIndex]
      }
      valueIndex++
    } else {
      masked = masked + maskChar
    }
  }

  return masked
}

export const formatarTelefone = (text: string | number) => {
  if (!text) return ""

  let rawValue = `${text}`.replace(/\D+/g, "")

  const mask = rawValue.length === 10 ? "(##) ####-####" : "(##) #####-####"

  return formatar(rawValue, { mask })
}