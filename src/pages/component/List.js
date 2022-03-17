import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Time from './Time';

function List(props) {
  const { information, setInformation } = props;
  const [key, setKey] = useState('待完成');

  let array = information.filter((v) => v.valid === 1);
  let completeArray = information.filter((v) => v.valid === 0);

  useEffect(() => {}, [information]);

  console.log('infoList:', information);
  //刪除
  function deleteItem(id) {
    Swal.fire({
      title: '確認刪除?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '確定 !',
    }).then((result) => {
      if (result.isConfirmed) {
        const newItem = information.filter((value) => value.id !== id);
        setInformation(newItem);
        localStorage.removeItem('list');
        localStorage.setItem('list', JSON.stringify(newItem));
      }
    });
  }
  //完成
  function completeItem(id) {
    Swal.fire({
      title: '確定完成?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '確定 !',
    }).then((result) => {
      if (result.isConfirmed) {
        //改valid
        const newItem = information.find((value) => value.id === id);
        let newItem2 = newItem;
        newItem2.valid = 0;
        //加時間
        newItem2.finishedtime = new Date().toLocaleString().substring(0, 10);
        console.log('123', newItem);

        //刪除localstorage舊資料
        const list = JSON.parse(localStorage.getItem('list'));
        list.splice(
          list.findIndex((v) => v.id === id),
          1
        );

        list.push(newItem);
        setInformation(list);
        localStorage.setItem('list', JSON.stringify(list));
        console.log('list', list);
      }
    });
  }

  return (
    <div className="wrap m-auto">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 nav-justified"
      >
        <Tab eventKey="待完成" title="待完成">
          {array.map((v, i) => {
            return (
              <div key={i} className=" mb-1 row">
                <div className="col-5">{v.thing}</div>
                <div className="col-4">{v.time}</div>
                <div className="col-3">
                  <button
                    className="me-1"
                    onClick={() => deleteItem(`${v.id}`)}
                  >
                    移除
                  </button>
                  <button onClick={() => completeItem(`${v.id}`)}>完成</button>
                </div>
              </div>
            );
          })}
        </Tab>
        <Tab eventKey="已完成" title="已完成">
          {completeArray.map((v, i) => {
            return (
              <div
                key={i}
                className="d-flex justify-content-between mb-1 text-secondary"
              >
                <span>{v.thing}</span>
                <span>{v.finishedtime}</span>
              </div>
            );
          })}
        </Tab>
      </Tabs>
    </div>
  );
}

export default List;
