import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import petrovPhoto from "./assets/petrov.jpg";
import sokolovPhoto from "./assets/sokolov.jpg";
import nikolaevPhoto from "./assets/nikolaev.jpg";
import fedorovPhoto from "./assets/fedorov.jpg";
import lebedevPhoto from "./assets/lebedev.jpg";
import smirnovaPhoto from "./assets/smirnova.jpg";
import vasilievaPhoto from "./assets/vasilieva.jpg";
import morozovaPhoto from "./assets/morozova.jpg";
import kozlovaPhoto from "./assets/kozlova.jpg";
import tikhonovaPhoto from "./assets/tikhonova.jpg";

const lecturers = [
  ["Петров Дмитрий Сергеевич","Дмитрий Петров","Мужчины","МФТИ, прикладная математика и информатика","2012","12 лет","Кандидат технических наук","Алгоритмы и структуры данных","Python для анализа данных","Основы Computer Science","2500 ₽","18 000 ₽","11 000 ₽","blue",petrovPhoto],
  ["Соколов Андрей Владимирович","Андрей Соколов","Мужчины","МГУ, биохимия","2010","14 лет","Доктор биологических наук","Биохимия","Молекулярная биология","Физиология человека","3000 ₽","22 000 ₽","36 000 ₽","green",sokolovPhoto],
  ["Николаев Игорь Петрович","Игорь Николаев","Мужчины","ВШЭ, экономика","2015","9 лет","Кандидат экономических наук","Микроэкономика","Макроэкономика","Финансовая грамотность","2200 ₽","16 000 ₽","15 000 ₽","orange",nikolaevPhoto],
  ["Фёдоров Алексей Михайлович","Алексей Фёдоров","Мужчины","СПбГАСУ, архитектура","2008","16 лет","Учёная степень отсутствует","Архитектурное проектирование","История архитектуры","AutoCAD и Revit","2800 ₽","20 000 ₽","от 45 000 ₽","purple",fedorovPhoto],
  ["Лебедев Константин Андреевич","Константин Лебедев","Мужчины","МФТИ, физика","2013","11 лет","Кандидат физико-математических наук","Общая физика","Теоретическая механика","Подготовка к ЕГЭ по физике","2400 ₽","17 000 ₽","13 000 ₽","red",lebedevPhoto],
  ["Смирнова Елена Викторовна","Елена Смирнова","Женщины","МГУ, филология","2011","13 лет","Кандидат филологических наук","Русский язык и стилистика","Литература XIX–XX веков","Подготовка к ЕГЭ по русскому","2300 ₽","16 500 ₽","10 000 ₽","pink",smirnovaPhoto],
  ["Васильева Ольга Дмитриевна","Ольга Васильева","Женщины","ВШЭ, дизайн","2016","8 лет","Учёная степень отсутствует","Графический дизайн","Adobe Photoshop и Illustrator","UX/UI-дизайн","2600 ₽","19 000 ₽","35 000 ₽","violet",vasilievaPhoto],
  ["Морозова Анна Павловна","Анна Морозова","Женщины","МГУ, психология","2014","10 лет","Кандидат психологических наук","Общая психология","Социальная психология","Психология развития","2700 ₽","20 000 ₽","25 000 ₽","cyan",morozovaPhoto],
  ["Козлова Ирина Николаевна","Ирина Козлова","Женщины","МФТИ, прикладная математика","2017","7 лет","Учёная степень отсутствует","Линейная алгебра","Теория вероятностей","Машинное обучение","2900 ₽","21 000 ₽","от 40 000 ₽","teal",kozlovaPhoto],
  ["Тихонова Мария Сергеевна","Мария Тихонова","Женщины","МГИМО, международные отношения","2012","12 лет","Кандидат политических наук","Международные отношения","Политология","Английский для международных отношений","2500 ₽","18 000 ₽","9000 ₽","gold",tikhonovaPhoto]
].map(([name,shortName,gender,education,year,experience,degree,d1,d2,d3,p1,p2,p3,color,photo]) => ({name,shortName,gender,education,year,experience,degree,disciplines:[d1,d2,d3],prices:[["Индивидуальное занятие",p1],["Пакет занятий",p2],["Интенсив / проект",p3]],color,photo}));

function Logo() {
  return <a className="logo" href="#top"><span className="logo-mark"><i></i><i></i><i></i></span><b>Academia</b></a>;
}
function Header() {
  return <header className="header" id="top"><div className="container header-inner"><Logo /><nav><a href="#lecturers">Преподаватели</a><a href="#formats">Форматы</a><a href="#about">О платформе</a></nav><a className="button small" href="#booking">Записаться</a></div></header>;
}
function Avatar({lecturer}) {
  return <div className={`avatar avatar-${lecturer.color}`}><img src={lecturer.photo} alt={lecturer.name}/></div>;
}
function Card({lecturer,onOpen}) {
  return <article className="lecturer-card"><div className="card-avatar"><Avatar lecturer={lecturer}/></div><div className="card-body"><span className="gender">{lecturer.gender}</span><h3>{lecturer.shortName}</h3><p>{lecturer.education}, {lecturer.year}</p><div className="stats"><span><b>{lecturer.experience}</b><small>опыта</small></span><span><b>{lecturer.degree.includes("отсутствует")?"—":lecturer.degree.split(" ")[0]}</b><small>степень</small></span></div><div className="chips">{lecturer.disciplines.map(x => <span key={x}>{x}</span>)}</div><button onClick={() => onOpen(lecturer)}>Подробнее <b>→</b></button></div></article>;
}
function Modal({lecturer,onClose}) {
  if(!lecturer)return null;
  return <div className="modal-bg" onMouseDown={e => e.target===e.currentTarget&&onClose()}><section className="modal"><button className="close" onClick={onClose}>×</button><div className="modal-head"><Avatar lecturer={lecturer}/><div><span className="gender">{lecturer.gender}</span><h2>{lecturer.name}</h2><p>{lecturer.education}, {lecturer.year}</p></div></div><div className="modal-grid"><div><h3>О преподавателе</h3><dl><div><dt>Стаж</dt><dd>{lecturer.experience}</dd></div><div><dt>Степень</dt><dd>{lecturer.degree}</dd></div></dl><h3>Дисциплины</h3><ul>{lecturer.disciplines.map(x => <li key={x}>{x}</li>)}</ul></div><aside><h3>Стоимость</h3><div className="prices">{lecturer.prices.map(([l,p]) => <div key={l}><span>{l}</span><b>{p}</b></div>)}</div><a className="button modal-button" href="#booking" onClick={onClose}>Записаться</a></aside></div></section></div>;
}
function App(){
  const [filter,setFilter]=useState("Все");
  const [selected,setSelected]=useState(null);
  const [sent,setSent]=useState(false);
  const list=filter==="Все"?lecturers:lecturers.filter(x=>x.gender===filter);
  const submit=e=>{e.preventDefault();setSent(true);e.currentTarget.reset()};
  return <>
    <Header/>
    <main>
      <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow"><i></i> Образование нового уровня</span><h1>Учитесь с теми,<br/>кто знает своё дело</h1><p>Онлайн и офлайн-занятия с опытными преподавателями. Индивидуальная программа, понятная обратная связь и реальный результат.</p><div className="hero-actions"><a className="button" href="#lecturers">Выбрать преподавателя</a><a className="text-link" href="#formats">Посмотреть форматы <b>→</b></a></div></div><div className="hero-visual"><div className="orb one"></div><div className="orb two"></div><div className="float-card main-float"><div className="mini-avatar">DP</div><div><b>Дмитрий Петров</b><small>Алгоритмы и Python</small></div><em>4.9</em></div><div className="float-card stat-float"><b>10</b><span>экспертов по направлениям</span></div><div className="float-card lesson-float"><i>▶</i><div><small>Следующее занятие</small><b>Сегодня, 18:00</b></div></div></div></div></section>
      <section className="numbers"><div className="container numbers-grid"><div><b>10</b><span>преподавателей</span></div><div><b>30</b><span>дисциплин</span></div><div><b>2</b><span>формата обучения</span></div><div><b>8 лет</b><span>минимальный опыт</span></div></div></section>
      <section className="lecturers" id="lecturers"><div className="container"><div className="section-head"><div><span className="kicker">Наши эксперты</span><h2>Преподаватели</h2></div><div className="filters">{["Все","Мужчины","Женщины"].map(x=> <button className={filter===x?"active":""} key={x} onClick={()=>setFilter(x)}>{x}</button>)}</div></div><div className="lecturer-grid">{list.map(x=><Card lecturer={x} onOpen={setSelected} key={x.name}/>)}</div></div></section>
      <section className="formats" id="formats"><div className="container"><div className="section-head"><div><span className="kicker">Как проходит обучение</span><h2>Выберите свой формат</h2></div></div><div className="format-grid"><article><span>01</span><i>◉</i><h3>Индивидуально онлайн</h3><p>Занятия в удобное время из любой точки мира. Полное внимание преподавателя и персональная программа.</p></article><article><span>02</span><i>⌂</i><h3>Очно в классе</h3><p>Живое общение, практические задания и работа в команде с обратной связью после каждого занятия.</p></article><article><span>03</span><i>▦</i><h3>Интенсивы и пакеты</h3><p>Подготовка к экзамену, собеседованию или целевому проекту за короткий срок.</p></article></div></div></section>
      <section className="about" id="about"><div className="container about-grid"><div className="about-visual"><div className="shape one"></div><div className="shape two"></div><div className="about-note"><b>98%</b><span>учеников достигают цели</span></div></div><div className="about-copy"><span className="kicker">О платформе</span><h2>Обучение, которое работает на результат</h2><p>Мы объединяем сильных специалистов с людьми, которые хотят развиваться. Каждый курс строится вокруг конкретной цели ученика.</p><ul><li><b>✓</b> Персональная программа занятий</li><li><b>✓</b> Практические задания и обратная связь</li><li><b>✓</b> Понятный график и фиксированная стоимость</li></ul></div></div></section>
      <section className="booking" id="booking"><div className="container booking-inner"><div><span className="kicker">Запись на занятие</span><h2>Начните учиться уже сегодня</h2></div>{sent?<div className="success">Заявка отправлена. Мы свяжемся с вами в ближайшее время!</div>:<form onSubmit={submit}><input name="name" placeholder="Ваше имя" required/><input name="phone" placeholder="Телефон" required/><button className="button">Оставить заявку</button></form>}</div></section>
    </main>
    <footer className="footer"><div className="container footer-inner"><Logo/><p>Образование без границ</p><span>© 2026 Academia</span></div></footer>
    <Modal lecturer={selected} onClose={()=>setSelected(null)}/>
  </>;
}
createRoot(document.getElementById("root")).render(<App />);
