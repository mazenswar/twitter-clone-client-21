import React from 'react';
import { Link } from 'react-router-dom';

export const renderContent = (content, hashtags, mentions) => {
  const findHashtag = ht => hashtags.find(hash => ht === hash.title);
  const findMention = mention =>
    mentions.find(men => men.username === mention.slice(1));

  if (hashtags || mentions) {
    const arr = [];
    content.split(' ').forEach(str => {
      if (str.startsWith('#')) {
        const hash = findHashtag(str);
        arr.push(' ');
        arr.push(
          <Link
            className="hashtags"
            key={`hashtags-${hash.id}`}
            to={`/hashtags/${hash.id}`}
          >
            {' '}
            {hash.title}
          </Link>
        );
      } else if (str.startsWith('@') && mentions.length) {
        const mention = findMention(str);
        arr.push(' ');
        arr.push(
          <Link
            className="mentions"
            key={`mentions-${mention.id}`}
            to={`/users/${mention.user_id}`}
          >
            {' '}
            {str}
          </Link>
        );
      } else {
        arr.push(' ');
        arr.push(str);
      }
    });
    return arr;
  }
  return content;
};

///// Content editable code

// const handleKeypress = e => {
//   const input = e.target.innerText;
//   const arr = input.split(' ').length > 1;
//   const selection = document.getSelection().toString();
//   console.log('selection', selection);

//   console.log(e.key);

//   if (e.keyCode === 8 && selection.length) {
//     // if something is selected and the user presses backspace
//     divRef.current.innerText = divRef.current.innerText
//       .replace(selection, '')
//       .trim();
//   } else if (e.keyCode === 8 && input.length === 1) {
//     //if the user presses backspace and theres only one character in the span
//     // this is done because when you clear an element of its content, browsers insert a <br> tag and that effects the character count feature
//     e.preventDefault();
//     e.target.innerHTML = '';
//   } else if (selection) {
//     // If something is selected
//     console.log('hi');
//     e.target.innerText = divRef.current.innerText.replace(selection, '');
//     // divRef.current.innerHTML = '';
//   } else if (arr) {
//     let str = ``;
//     input.split(' ').map(ele => {
//       return ele.startsWith('#')
//         ? // eslint-disable-next-line no-useless-concat
//           (str = str + ' ' + `<span style='color: blue'>${ele}</span>`)
//         : (str = str + ' ' + ele);
//     });
//     e.target.innerHTML = `<span>${str}</span>`;
//   } else if (input.includes('#')) {
//     e.target.innerHTML = `<span style='color: blue'>${input}</span>`;
//   } else {
//     e.target.innerHTML = `<span>${input}</span>`;
//   }

//   let range = document.createRange();
//   let sel = window.getSelection();
//   // range.setStart(divRef.current, divRef.current.children.length);
//   // if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
//   range.setStart(divRef.current, divRef.current.children.length);
//   range.collapse(true);
//   sel.removeAllRanges();
//   sel.addRange(range);
//   divRef.current.focus();
//   // }

//   setTimeout(() => {
//     setLen(divRef.current.innerText.length);
//   }, 200);
// };

/// JSX
//  <span
//    ref={divRef}
//    onKeyDown={handleKeypress}
//    contentEditable={true}
//    style={{
//      backgroundColor: 'red',
//      height: '50px',
//      width: '250px'
//    }}
//  />;
