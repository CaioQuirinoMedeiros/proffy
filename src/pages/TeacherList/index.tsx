import React from 'react'

import PageHeader from '../../components/PageHeader'

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
        <div className='input-block'>
          <label htmlFor='subject'>Matéria</label>
          <input type='text' id='subject' />
        </div>
        <div className='input-block'>
          <label htmlFor='week_day'>Dia da semana</label>
          <input type='text' id='week_day' />
        </div>
        <div className='input-block'>
          <label htmlFor='time'>Hora</label>
          <input type='text' id='time' />
        </div>
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
