import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import ExampleImgOne from '../../images/movies-images-example/1.png';
import ExampleImgTwo from '../../images/movies-images-example/2.png';
import ExampleImgThree from '../../images/movies-images-example/3.png';
import ExampleImgFour from '../../images/movies-images-example/4.png';
import ExampleImgFive from '../../images/movies-images-example/5.png';
import ExampleImgSix from '../../images/movies-images-example/6.png';
import ExampleImgSeven from '../../images/movies-images-example/7.png';
import ExampleImgEight from '../../images/movies-images-example/8.png';
import ExampleImgNine from '../../images/movies-images-example/9.png';


export default function MoviesCardList() {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__grid">
        <MoviesCard 
          src={ExampleImgOne}
          title={'33 слова о дизайне'}
          duration={'1ч 17м'}
        />
        <MoviesCard 
          src={ExampleImgTwo}
          title={'Киноальманах «100 лет дизайна»'}
          duration={'1ч 17м'}
        />
        <MoviesCard 
          src={ExampleImgThree}
          title={'В погоне за Бенкси'}
          duration={'1ч 17м'}
        />
        <MoviesCard 
          src={ExampleImgFour}
          title={'Баския: Взрыв реальности'}
          duration={'1ч 17м'}
        />
        <MoviesCard 
          src={ExampleImgFive}
          title={'Бег это свобода'}
          duration={'1ч 17м'}
        />
        <MoviesCard 
          src={ExampleImgSix}
          title={'Книготорговцы'}
          duration={'1ч 17м'}
        />
        <MoviesCard 
          src={ExampleImgSeven}
          title={'Когда я думаю о Германии ночью'}
          duration={'1ч 17м'}
        />
        <MoviesCard 
          src={ExampleImgEight}
          title={'Gimme Danger: История Игги и The Stooges'}
          duration={'1ч 17м'}
        />
        <MoviesCard 
          src={ExampleImgNine}
          title={'Дженис: Маленькая девочка грустит'}
          duration={'1ч 17м'}
        />

        <MoviesCard 
          src={ExampleImgOne}
          title={'33 слова о дизайне'}
          duration={'1ч 17м'}
        />
        <MoviesCard 
          src={ExampleImgTwo}
          title={'Киноальманах «100 лет дизайна»'}
          duration={'1ч 17м'}
        />
        <MoviesCard 
          src={ExampleImgThree}
          title={'В погоне за Бенкси'}
          duration={'1ч 17м'}
        />
      </ul>
    </section>
  )
}
