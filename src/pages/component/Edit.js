import React, { useState } from 'react';
import { nanoid } from 'nanoid';

function Edit(props) {
  const { information, setInformation } = props;
  const [inputContent, setInputContent] = useState({
    id: '',
    thing: '',
    time: '',
    valid: 1,
    finishedtime: null,
  });

  function inputChange(e) {
    setInputContent({
      ...inputContent,
      id: nanoid(),
      [e.target.name]: e.target.value,
    });
  }
  // console.log(information);
  function addList(data) {
    const list = JSON.parse(localStorage.getItem('list')) || [];
    list.push(data);
    localStorage.setItem('list', JSON.stringify(list));
    setInformation(list);
    setInputContent({ ...inputContent, id: '', thing: '', time: '' });
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addList(inputContent);
      }}
    >
      <div className="my-5">
        <h1 className="text-center fw-bold">待辦清單</h1>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            placeholder="新增事項"
            name="thing"
            value={inputContent.thing}
            onChange={inputChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center mt-2">
          <input
            type="date"
            name="time"
            value={inputContent.time}
            onChange={inputChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center mt-2">
          <button className="btn btn-secondary add">新增</button>
          {/* {inputContent.thing === '' || inputContent.time === '' ? (
            <button className="btn btn-secondary add" disabled="disabled">
              新增
            </button>
          ) : (
            <button className="btn btn-secondary add">新增</button>
          )} */}
        </div>
      </div>
    </form>
  );
}

export default Edit;
