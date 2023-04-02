import React, { useEffect, useRef } from 'react';
import mojs from "@mojs/core";

const MoText = ({ text = 'Hello World' }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const words = textRef.current.querySelectorAll('span');
    const tweens = [];

    words.forEach((word) => {
      const tween = new mojs.Tween({
        repeat: -1,
        delay: 500,
        duration: 1000,
        easing: mojs.easing.elastic.out,
        onUpdate: (progress) => {
          const translateY = mojs.easing.bounce.out(progress) * 20;
          const color = `rgb(${255 - 255 * progress}, 0, ${255 * progress})`;
          word.style.transform = `translateY(${translateY}px)`;
          word.style.color = color;
        }
      });

      tweens.push(tween);
    });

    return () => {
      tweens.forEach((tween) => tween.stop());
    };
  }, [text]);

  return (
     <div ref={textRef}>
      {text.split(' ').map((word, index) => (
        <span key={index}>{word} </span>
      ))}
    </div>
  );
}

export default MoText;
