import React, { useEffect, useRef } from 'react';
import mojs from '@mojs/core';

const SpinnerMo = () => {
  const spinnerRef = useRef(null);

  useEffect(() => {
    const spinner = new mojs.Shape({
      parent: spinnerRef.current,
      shape: 'circle',
      stroke: '#FC46AD',
      strokeDasharray: '125, 125',
      strokeDashoffset: { '0': '-125' },
      strokeWidth: 4,
      fill: 'none',
      left: '50%',
      top: '50%',
      rotate: { '-90': '270' },
      radius: 20,
      isShowStart: true,
      duration: 5000,
      easing: 'back.in',
    }).then({
      rotate: { '-90': '270' },
      strokeDashoffset: { '-125': '-250' },
      duration: 3000,
      easing: 'cubic.out',
      onComplete: function () {
        this.replay();
      },
    });

    spinner.play();
  }, []);

  return <div id="spinner" ref={spinnerRef} />;
};

export default SpinnerMo;
