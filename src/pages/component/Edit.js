import React, { useState } from 'react';
import { nanoid } from 'nanoid';

function Edit(props) {
  const { information, setInformation } = props;
  const [input, setInput] = useState({
    id: '',
    thing: '',
    time: '',
    valid: 1,
    finishedtime: null,
  });

  function inputChange(e) {
    setInput({ ...input, id: nanoid(), [e.target.name]: e.target.value });
  }
  // console.log(information);
  function addList(data) {
    const list = JSON.parse(localStorage.getItem('list')) || [];
    list.push(data);
    localStorage.setItem('list', JSON.stringify(list));
    setInformation(list);
    setInput({ ...input, id: '', thing: '', time: '' });
  }
  //資料庫
  // async function addList(e) {
  //   e.preventDefault();
  //   try {
  //     let result = await axios.post(
  //       'http://localhost:3002/api/server',
  //       information
  //     );
  //     console.log(result);
  //   } catch (e) {
  //     console.error('error', e.result.data.msg);
  //   }
  // }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addList(input);
      }}
    >
      <div className="my-5">
        <h1 className="text-center fw-bold">待辦清單</h1>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            placeholder="新增事項"
            name="thing"
            value={input.thing}
            onChange={inputChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center mt-2">
          <input
            type="date"
            name="time"
            value={input.time}
            onChange={inputChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center mt-2">
          <button
            className="btn btn-secondary add"
            // onClick={(e) => {
            //   e.preventDefault();
            //   addList(information);
            // }}
          >
            新增
          </button>
        </div>
      </div>
    </form>
  );
}

export default Edit;
