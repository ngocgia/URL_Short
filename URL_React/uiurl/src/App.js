import './App.css';
import Modal from './Modal';
import React, { useState, useReducer} from 'react';

const reducer = (state, action) =>{
  if (action.type === 'ADD_LINK'){ 
    const newUrl = [...state.links, action.payload]; 
    const newSate = {
      ...state,
      links: newUrl,
      showModal: true,
      contentModal: 'item added',
    };
    return newSate;
  }
  if (action.type ==='NO_VALUE'){
    const newState = {
      ...state,
      showModal: true,
      contentModal: 'Please enter a link',
    };
    return newState;
  }
  
  if (action.type === 'CLOSE_MODAL'){
    const newState ={
      ...state,
      showModal: false,
    };
    return newState;
  }

  if(action.type === 'REMOVE_URL'){
    const newUrl = state.links.filter((link) => link.id !== action.payload);
    const newState = {
      ...state,
      links: newUrl,
      contentModal: 'Link removed',
    };
    return newState;
  }

};
const initState ={
  links: [],
  showModal: false,
  contentModal: '',
}

const App = () =>{
  const [url, setUrl] = useState("");
  const [state, dispatch] = useReducer(reducer, initState);

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(state);
    if (url) {
      const shortLink ={ id: new Date().getTime().toString(), url: url};
      dispatch({type:'ADD_LINK', payload: shortLink});
      setUrl('');
    } else{
      dispatch({type: 'NO_VALUE'});
    }
  };
  
  const closeModal = () =>{
    dispatch({type: 'CLOSE_MODAL'});
  }
  return(
    <>
    {state.showModal && (
      <Modal closeModal={closeModal} contentModal={state.contentModal} />
    )}
    
    <form className='form' onSubmit={handleSubmit}>
    <h1>Private URL shortener</h1>
      <div className='form-control'>
        <input
          type='text'
          name='url'
          id='url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='Paste here the long URL here'
        />
      </div>
      <button type='submit'>Shorten</button>
    </form>

    {state.links.map((link) =>{
      return(
        <>
          <div key={link.id} className='item'>
            <h5>{link.url}</h5>
            <button 
              onClick={() =>
                dispatch({type: 'REMOVE_URL', payload:link.id }) 
              }>Remove</button>
          </div>
        </>
      );
    })}
    </>
  );
};

export default App;
