import React from 'react';
import './editorStyles.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';


const Wysiwyg = (props) => {
  return(
    <FroalaEditor tag='textarea' model={props.value} onModelChange={(data)=>props.changeArea(data)} />
  )
}

export default Wysiwyg;