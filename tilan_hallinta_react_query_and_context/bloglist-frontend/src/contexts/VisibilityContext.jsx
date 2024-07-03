import { createContext, useReducer, useContext } from 'react'

const initialState = {
  visible: false
}

const visibilityReducer = (state, action) => {
  switch (action.type) {
    case 'BLOG_FORM_VISIBILITY':
      return { ...state, visible: !state.visible };
    default:
      return state;
  }
}

const VisibilityContext = createContext();

export const useVisibility = () => useContext(VisibilityContext);

export const useVisibilityValue = () => {
  const visibilityAndDispatch = useContext(VisibilityContext);
  if (visibilityAndDispatch !== undefined) {
    //console.log('useVisibilityValue', visibilityAndDispatch[0])
    return visibilityAndDispatch[0];
  }
  return null
}

export const useVisibilityDispatch = () => {
  const visibilityAndDispatch = useContext(VisibilityContext);
  if (visibilityAndDispatch !== undefined) {
    //console.log('useVisibilityDispatch', visibilityAndDispatch[1])
    return visibilityAndDispatch[1];
  }
  return null
}

export const VisibilityContextProvider = ({ children }) => {
  const [visibility, visibilityDispatch] = useReducer(visibilityReducer, initialState);

  return (
    <VisibilityContext.Provider value={[ visibility, visibilityDispatch ]}>
      {children}
    </VisibilityContext.Provider>
  );
};

export default VisibilityContext;