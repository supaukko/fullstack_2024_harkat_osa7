import { useState, useEffect } from 'react'

export const useField = (name, type, initValue = '') => {
  const [value, setValue] = useState(initValue)

  const onChange = (event) => {
    // console.log(`useFiled - onChange: ${name} ${value}`)
    setValue(event.target.value)
  }

  const set = (val = '') => {
    setValue(val)
  }

  return {
    name,
    type,
    value,
    onChange,
    set
  }
}

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  
  return width;
}