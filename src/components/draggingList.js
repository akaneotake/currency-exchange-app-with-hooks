  // Drag and Drop function
  export const handleDragStart= (event)=> {
    event.dataTransfer.setData('text', event.currentTarget.id);
    event.currentTarget.classList.add('dragging');
    event.currentTarget.classList.remove('slideIn');
  };

  export const handleDragEnter= (event)=> {
    event.currentTarget.classList.add('drop-zone');
    event.currentTarget.classList.add('pointer-event');
  };

  export const handleDragOver= (event)=> {
    event.preventDefault();
  };

  export const handleDragLeave= (event)=> {
    event.currentTarget.classList.remove('drop-zone');
  };

  export const handleDragEnd= (event)=> {
    event.currentTarget.classList.add('slide-in');

    const li = [...document.querySelectorAll(".currency-home")];
    li.forEach((i)=> {
      i.classList.remove('drop-zone');
      i.classList.remove('dragging');
      i.classList.remove('pointer-event');
    });
  }

  export const handleDrop= (event)=> {
    event.preventDefault();
    const li = [...document.querySelectorAll('.currency-home')];

    if (li.indexOf(event.currentTarget) === 0) {
        event.currentTarget.before(document.getElementById(event.dataTransfer.getData('text')));
    } else {
        event.currentTarget.after(document.getElementById(event.dataTransfer.getData('text')));
    };
  };