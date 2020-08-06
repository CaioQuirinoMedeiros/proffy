import React from 'react'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'

import './styles.css'
import TeacherItem from '../../components/TeacherItem'

const professores = [
  {
    id: '1',
    nome: 'Diego Fernandes',
    avatar:
      'https://avatars0.githubusercontent.com/u/48543208?s=400&u=f056bca652dc7e1619b6e275ac220a4b91a0cf88&v=4',
    materia: 'Química',
    descricao:
      'Entusiasta das melhorias tecnologias de química avançada.\n\nApaixonado por explodir coisas em laboratório e por mudar a vida daspessoas através de experiências. Mais de 200.000 pessoas já passarampor uma das minhas experiências',
    preco: 85
  },
  {
    id: '2',
    nome: 'Caio Medeiros',
    avatar:
      'https://avatars0.githubusercontent.com/u/48543208?s=400&u=f056bca652dc7e1619b6e275ac220a4b91a0cf88&v=4',
    materia: 'Matemática',
    descricao:
      'Entusiasta das melhorias tecnologias de química avançada.\n\nApaixonado por explodir coisas em laboratório e por mudar a vida daspessoas através de experiências. Mais de 200.000 pessoas já passarampor uma das minhas experiências',
    preco: 106
  },
  {
    id: '3',
    nome: 'Diego Fernandes',
    avatar:
      'https://avatars0.githubusercontent.com/u/48543208?s=400&u=f056bca652dc7e1619b6e275ac220a4b91a0cf88&v=4',
    materia: 'Português',
    descricao:
      'Entusiasta das melhorias tecnologias de química avançada.\n\nApaixonado por explodir coisas em laboratório e por mudar a vida daspessoas através de experiências. Mais de 200.000 pessoas já passarampor uma das minhas experiências',
    preco: 34.5
  }
]

const TeacherList: React.FC = () => {
  return (
    <div id='page-teacher-list' className='container'>
      <PageHeader title='Estes são os proffys disponíveis.' />

      <form id='search-teachers'>
        <Input name="subject" label="Matéria" />
        <Input name="week_day" label="Dia da semana" />
        <Input name="time" label="Hora" type="time" />
      </form>

      <main>
        {professores.map((professor) => (
          <TeacherItem key={professor.id} teacher={professor} />
        ))}
      </main>
    </div>
  )
}

export default TeacherList
