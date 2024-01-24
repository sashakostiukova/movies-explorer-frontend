import React from 'react'
import './Techs.css';
import SectionHeader from '../SectionHeader/SectionHeader';

export default function Techs() {
  return (
    <section className="techs"  id="techs">
      <SectionHeader title={'Технологии'}></SectionHeader>
      <h3 className="techs__subheader">7 технологий</h3>
      <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__tech-item">HTML</li>
        <li className="techs__tech-item">CSS</li>
        <li className="techs__tech-item">JS</li>
        <li className="techs__tech-item">React</li>
        <li className="techs__tech-item">Git</li>
        <li className="techs__tech-item">Express.js</li>
        <li className="techs__tech-item">MongoDB</li>
      </ul>
    </section>
  )
}
