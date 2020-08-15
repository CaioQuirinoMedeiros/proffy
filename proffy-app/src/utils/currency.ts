export const formatarMoeda = (valor: number) => {
  return (
    'R$ ' +
    valor
      .toFixed(2)
      .replace('.', ',')
      .replace(/\d(?=(\d{3})+\,)/g, '$&.')
  )
}
