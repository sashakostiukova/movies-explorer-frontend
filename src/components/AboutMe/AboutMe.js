import React from 'react';
import './AboutMe.css';
import SectionHeader from '../SectionHeader/SectionHeader';
import studentPhoto from '../../images/portfolio-img.jpg';

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">

      <SectionHeader title={'Студент'}></SectionHeader>

      <div className="about-me__container">

        <div className="about-me__information">
          <h3 className="about-me__name">Александра</h3>
          <p className="about-me__description">Фронтенд-разработчица, 30 лет</p>
          <p className="about-me__text">Люблю воплощать идеи в реальные проекты.
            Благодаря нестандартному опыту работы в НКО, не боюсь и умею устанавливать коммуникацию с разными людьми. Ценю возможность быть частью команды и вкладывать силы в общий проект.
            {"\n"}Веб-разработка привлекла меня своим простором для творчества и понятными инструментами. Мне нравится осваивать новое и расширять свою компетенцию.
            Хочу развиваться в этом направлении.</p>
          <a className="about-me__link link-transition" target="_blank" rel="noopener noreferrer" href="https://github.com/sashakostiukova">Github</a>
        </div>

        <img className="about-me__photo" alt="фотография студента" src={studentPhoto} />

      </div>

    </section>
  )
}
