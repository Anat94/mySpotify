import React, { useState, useEffect } from 'react';
import styles from './Input.module.css';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';

const Input = ({
  title,
  placeholder,
  onChange,
  width = 100,
  marginLeft = 0,
  eyes = false,
}: {
  title: string;
  placeholder?: string;
  onChange: Function;
  width?: number;
  marginLeft?: number;
  eyes?: boolean;
}) => {
  const [visible, setVisible] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { width: windowWidth } = windowDimensions;
  const dynamicWidth = windowWidth < 768 ? '100%' : `${width}%`;
  const dynamicMarginLeft = windowWidth < 768 ? '2.5%' : `${marginLeft}%`;

  return (
    <div style={{ width: dynamicWidth, marginLeft: dynamicMarginLeft }}>
      <p className={styles.inputTitle}>{title}</p>
      <input
        type={eyes && visible ? 'password' : 'text'}
        className={styles.input}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {eyes && (
        <div
          className={styles.inputEyesIcon}
          onClick={() => setVisible(!visible)}
        >
          {visible ? <BsFillEyeSlashFill size={30} /> : <BsFillEyeFill size={30} />}
        </div>
      )}
    </div>
  );
};

export default Input;
