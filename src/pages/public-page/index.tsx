import { useState } from 'react'

import { Photo } from '@/entities/photo'
import { TotalUsersCount } from '@/features/user/totalUsersCount/ui/totalUsersCount'
import { NextPageWithLayout } from '@/shared/types'
import { Button } from '@/shared/ui'
import { getAuthLayout } from '@/widgets/layouts'
import Image from 'next/image'

import s from './index.module.scss'

import notPhotoUser from '../../shared/assets/img/not-photo-user.jpg'

const PublicPage: NextPageWithLayout = () => {
  return (
    <div className={'w-full px-[9.5rem]'}>
      <TotalUsersCount usersCount={12345} />
      <PublicMiniPost />
    </div>
  )
}

PublicPage.getLayout = getAuthLayout

export default PublicPage

const PublicMiniPost = () => {
  const [isExpanted, setIsExpanted] = useState(false)

  const onToggleText = () => {
    setIsExpanted(!isExpanted)
  }

  return (
    <div className={s.publicPostWrapper}>
      <Image alt={'Some photo posts'} height={240} src={notPhotoUser} width={234} />
      <div className={'mt-[12px] flex'}>
        <Photo alt={'Friend avatar'} height={36} src={notPhotoUser} width={36} />
        <h2
          className={'ml-[12px] flex items-center justify-center text-[16px] font-bold leading-6'}
        >
          Friend
        </h2>
      </div>
      <p className={'mb-[3px] mt-[12px] text-[12px] leading-4 text-light-900'}>Created post</p>
      <div className={'inline'}>
        <div className={`${s.publicPost} ${isExpanted ? s.textExpanded : ''}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor
          incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.
        </div>
        <Button className={'text-[14px]'} onClick={onToggleText} variant={'link'}>
          {isExpanted ? 'Hide' : 'Show more'}
        </Button>
      </div>
    </div>
  )
}

//'flex max-h-[391px] max-w-[234px] flex-col overflow-hidden text-ellipsis'

//какие стили повесить на тег p для того чтобы при нажатии show more появлялся текст
//ChatGPT сказал:
//ChatGPT
//Чтобы сделать текст в теге <p> сворачиваемым, можно воспользоваться стилями и небольшим скриптом на JavaScript. Вот простой пример реализации функциональности "Показать больше" / "Скрыть":
//
//HTML:
//html
//Копировать код
//<p id="myText">
//  Это краткий текст. <span class="more-text">Это дополнительный текст, который появится при нажатии на "Показать больше".</span>
//</p>
//<button id="toggleButton">Показать больше</button>
//CSS:
//css
//Копировать код
//#myText .more-text {
//  display: none; /* Прячем дополнительный текст */
//}
//
//#myText.show-more .more-text {
//  display: inline; /* Показываем текст при активации класса */
//}
//JavaScript:
//javascript
//Копировать код
//const button = document.getElementById('toggleButton');
//const text = document.getElementById('myText');
//
//button.addEventListener('click', () => {
//  text.classList.toggle('show-more');
//
//  // Изменение текста кнопки в зависимости от состояния
//  if (text.classList.contains('show-more')) {
//    button.textContent = 'Скрыть';
//  } else {
//    button.textContent = 'Показать больше';
//  }
//});
//Как это работает:
//В CSS скрыт дополнительный текст, заключённый в <span class="more-text">.
//При клике на кнопку с помощью JavaScript переключается класс show-more, который изменяет видимость скрытого текста.
//Текст кнопки меняется с "Показать больше" на "Скрыть" и обратно в зависимости от состояния.
//Если есть конкретные пожелания к стилям или более сложная логика, дай знать!
//
//
//
//
//
//
//Вы сказали:
//перепиши это на реакт
//ChatGPT сказал:
//ChatGPT
//Конечно! Вот как можно реализовать функционал "Показать больше" на React:
//
//Компонент на React:
//jsx
//Копировать код
//import { useState } from 'react';
//
//function ShowMoreText() {
//  const [isExpanded, setIsExpanded] = useState(false);
//
//  const toggleText = () => {
//    setIsExpanded(!isExpanded);
//  };
//
//  return (
//    <div>
//      <p>
//        Это краткий текст.
//        {isExpanded && <span> Это дополнительный текст, который появится при нажатии на "Показать больше".</span>}
//      </p>
//      <button onClick={toggleText}>
//        {isExpanded ? 'Скрыть' : 'Показать больше'}
//      </button>
//    </div>
//  );
//}
//
//export default ShowMoreText;
//Объяснение:
//Мы используем хук useState для управления состоянием компонента (isExpanded), который отслеживает, нужно ли показывать дополнительный текст.
//При нажатии на кнопку вызывается функция toggleText, которая изменяет состояние.
//Внутри компонента <p> отображаем дополнительный текст только если isExpanded равен true.
//Текст кнопки меняется динамически: "Скрыть", если текст раскрыт, и "Показать больше", если он скрыт.
//Этот подход удобен, так как в React состояние легко связывается с рендером компонента, что делает логику понятной и гибкой.
//
//
//
//
//
//
//Вы сказали:
//А как сделать обрезку текста по фиксированной высоте элемента div
//ChatGPT сказал:
//ChatGPT
//Для обрезки текста по фиксированной высоте элемента <div> в React можно использовать комбинацию CSS-свойств, таких как overflow: hidden, text-overflow: ellipsis и display: -webkit-box для многострочного текста. Вот пример того, как это можно реализовать:
//
//CSS для обрезки текста по высоте:
//css
//Копировать код
//.text-container {
//  width: 300px;        /* Ширина контейнера */
//  height: 100px;       /* Фиксированная высота */
//  overflow: hidden;    /* Обрезка содержимого, выходящего за пределы блока */
//  display: -webkit-box;
//  -webkit-line-clamp: 3; /* Ограничение количества строк, например, 3 */
//  -webkit-box-orient: vertical;
//  text-overflow: ellipsis;
//}
//Компонент на React:
//jsx
//Копировать код
//import React, { useState } from 'react';
//import './App.css'; // Включаем стили
//
//function ShowMoreText() {
//  const [isExpanded, setIsExpanded] = useState(false);
//
//  const toggleText = () => {
//    setIsExpanded(!isExpanded);
//  };
//
//  return (
//    <div>
//      <div className={`text-container ${isExpanded ? 'expanded' : ''}`}>
//        Это пример длинного текста, который будет обрезан по высоте. Это пример длинного текста, который будет обрезан по высоте. Это пример длинного текста, который будет обрезан по высоте. Это пример длинного текста, который будет обрезан по высоте. Это пример длинного текста, который будет обрезан по высоте.
//      </div>
//      <button onClick={toggleText}>
//        {isExpanded ? 'Скрыть' : 'Показать больше'}
//      </button>
//    </div>
//  );
//}
//
//export default ShowMoreText;
//CSS для полного раскрытия текста:
//css
//Копировать код
//.expanded {
//  height: auto; /* Снимаем ограничение по высоте при раскрытии */
//  -webkit-line-clamp: unset; /* Сбрасываем ограничение по строкам */
//}
//Как это работает:
//CSS:
//-webkit-line-clamp ограничивает количество отображаемых строк (в данном примере — 3).
//overflow: hidden и text-overflow: ellipsis обрезают текст и добавляют многоточие, если текст не помещается.
//display: -webkit-box и -webkit-box-orient: vertical делают блок многострочным.
//React:
//Используем состояние isExpanded для управления классом контейнера.
//При нажатии на кнопку текст либо раскрывается (через класс expanded), либо снова обрезается до фиксированной высоты.
//Это решение поддерживает как обрезку текста по высоте, так и возможность раскрытия текста по клику.
