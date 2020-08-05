export default function (time: string) {
  const [hours, minutes] = time.split(':').map(Number)

  return minutes + 60 * hours
}
