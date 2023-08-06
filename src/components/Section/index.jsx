import { useEffect, useRef } from "react";
import "./Section.css";

/* eslint-disable react/prop-types */
export default function Section({ children, showForm, setHiddenShowForm }) {

  const section = useRef(null);

  // console.log("cambio showForm", showForm)

  useEffect(() => {

    if(children.type.name === 'Form'){
      document.querySelector('section:nth-child(2)').classList.remove('animateToBottom');
    }

    window.onload = () => {
      const height = document.querySelector('section:nth-child(2)').offsetTop;
      document.documentElement.style.setProperty('--heightAnimation-Top', `${-height}px`);
      document.documentElement.style.setProperty('--heightAnimation-Bottom', `${height}px`);
    }

    return () => {
      document.querySelector('.section').classList.remove('animateToTop');
    }
  }, [children.type.name])

  useEffect(() => {

    if(children.type.name === 'Form') return

    if (showForm) {
      // If showForm is true, add the animateToTop class
      if (section.current && !section.current.classList.contains('init')) {
        section.current.classList.add('animateToBottom');
      }
    } else {
      section.current.classList.remove('init');
      // If showForm is false, remove the animateToTop class
      if (section.current && !section.current.classList.contains('animateToTop')) {
        section.current.classList.add('animateToTop');
      }
    }
  }, [children.type.name, showForm]);


  return (
    <section ref={section} className="section init" onAnimationEnd={(e) => {
      if(children.type.name === 'Form') return;
      if (e.animationName === 'animateToTop') {
        setHiddenShowForm(true);
      } else {
        setHiddenShowForm(false);
      }
    }}>
      {children}
    </section>
  );
  
}
