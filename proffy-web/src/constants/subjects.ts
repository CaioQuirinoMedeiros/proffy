export const subjects = [
  { value: 'artes', label: 'Artes' },
  { value: 'biologia', label: 'Biologia' },
  { value: 'fisica', label: 'Física' },
  { value: 'historia', label: 'Historia' },
  { value: 'geografia', label: 'Geografia' },
  { value: 'matematica', label: 'Matemática' },
  { value: 'quimica', label: 'Química' },
  { value: 'portugues', label: 'Português' }
]

export const subjectsMapping = subjects.reduce((acc, subject) => {
  return { ...acc, [subject.value]: subject.label }
}, {} as { [key: string]: string })
