import moment from 'moment';

const dateNow = moment(new Date()).format("DD-MM-YYYY");

const defaultTitle = "Default Field";
const defaultAuthor = "Unknown Author";
const defaultDate = dateNow;
const defaultBody = "Lorem ipsum dolor sit amet consectetur adipisicing elit";
const defaultCategory = "Other";


export const addModel= (obj) => {
  return({
    title: obj.title || defaultTitle,
    author: obj.author || defaultAuthor,
    date: obj.date || defaultDate,
    body: obj.body || defaultBody,
    category: obj.category || defaultCategory
  })
};

export const updateModel = (obj) => {
  return({
    title: obj.title || defaultTitle,
    author: obj.author || defaultAuthor,
    date: obj.date || defaultDate,
    body: obj.body || defaultBody,
    category: obj.category || defaultCategory,
    id: obj.id
  })
};