import { useEffect, useRef } from "react";
import "./Section.css";

/* eslint-disable react/prop-types */
export default function Section({ children, showForm, setHiddenShowForm, className }) {
  const section = useRef(null);

  const childArray = Array.isArray(children) ? children : [children];
  const hasForm = childArray.some(child => child.type.name === "Form");
  const hasOrgTitle = childArray.some(child => child.type.name === "OrgTitle");

  useEffect(() => {
    document.querySelector('.section_teams').classList.remove('animateToBottom');

    window.onload = () => {
      const height = document.querySelector('.section_teams').offsetTop;
      document.documentElement.style.setProperty('--heightAnimation-Top', `${-height}px`);
      document.documentElement.style.setProperty('--heightAnimation-Bottom', `${height}px`);
    }

    return () => {
      document.querySelector('.section_teams').classList.remove('animateToTop');
    }
  }, []);

  useEffect(() => {
    if (!hasOrgTitle) return;

    if (showForm) {
      if (section.current && !section.current.classList.contains('init')) {
        section.current.classList.add('animateToBottom');
      }
    } else {
      section.current.classList.remove('init');
      if (section.current && !section.current.classList.contains('animateToTop')) {
        section.current.classList.add('animateToTop');
      }
    }
  }, [showForm, hasOrgTitle]);

  return (
    <section ref={section} className={className} onAnimationEnd={(e) => {
      if (hasForm) return;
      if (e.animationName === 'animateToTop') {
        setHiddenShowForm(true);
      } else {
        setHiddenShowForm(false);
      }
    }}>
      {childArray}
    </section>
  );
}
