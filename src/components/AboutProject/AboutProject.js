import React from 'react'
import './AboutProject.css';
import SectionHeader from '../SectionHeader/SectionHeader';

export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      
      <SectionHeader title={'О проекте'}></SectionHeader>

      <div className="about-project__description-block">

        <div className="about-project__description-block__column">
          <p className="about-project__main-description" >Дипломный проект включал 5 этапов</p>
          <p className="about-project__description about-project__description-block__second-row" >Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>

        <div className="about-project__description-block__column">
          <p className="about-project__main-description" >На выполнение диплома ушло 5 недель</p>
          <p className="about-project__description" >У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>

      </div>

      <div className="about-project__scheme-block">
          <p className="about-project__scheme-item" >1 неделя</p>
          <p className="about-project__scheme-item about-project__scheme-item__right-column" >4 недели</p>

          <p className="about-project__scheme-item about-project__bottom-row " >Back-end</p>
          <p className="about-project__scheme-item about-project__bottom-row " >Front-end</p>
      </div>

    </section>
  )
}
