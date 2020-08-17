export const phoneMask = (value: string) => {
  const raw = value ? value.replace(/\D+/g, '') : value

  const mask = [
    '(',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ]

  if (raw.length === 10) {
    mask.splice(8, 1)
  }

  return mask
}
