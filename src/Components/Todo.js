import React, { Component } from "react";
import "./Todo.css";

class Todo extends Component {
  state = {
    todoList: JSON.parse(localStorage.getItem("todo")),
    list: "",
    isActiveBtn: false,
    isSuccess: false,
    complated: false,
  };

  addTodo = () => {
    let box = this.state.todoList;
    box.push({
      list: this.state.list,
      complated: false,
    });
    this.setState({
      todoList: box,
      list: "",
    });
    localStorage.setItem("todo", JSON.stringify(this.state.todoList));
  };

  handleChangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  delete = (index) => {
    let box = this.state.todoList;
    box.splice(index, 1);
    this.setState({
      todoList: box,
    });
    localStorage.setItem("todo", JSON.stringify(this.state.todoList));
  };
  edit = (item, index) => {
    this.setState({
      list: item.list,
      isActiveBtn: true,
    });
    this.a = index;
  };
  updateList = () => {
    let box = this.state.todoList;
    box[this.a].list = this.state.list;
    this.setState({
      todoList: box,
      isActiveBtn: false,
      list: "",
    });
    localStorage.setItem("todo", JSON.stringify(this.state.todoList));
  };
  success = (item, index) => {
    console.log(index);
    let box = this.state.todoList;
    if (box[index].complated) {
      box[index].complated = false;
    } else {
      box[index].complated = true;
    }
    this.setState({
      todoList: box,
    });
  };
  render() {
    const { list, isActiveBtn, todoList, isSuccess } = this.state;
    return (
      <div className="todo-container">
        <div className="todo-box">
          <div className="box-header">
            <h1>Todo Lists</h1>
          </div>
          <div className="box-body">
            <div className="input-box">
              <input
                className="input"
                type="text"
                placeholder="Todo Lists..."
                value={list}
                name="list"
                onChange={this.handleChangeInput}
              />
              {!isActiveBtn ? (
                <button className="btn" onClick={this.addTodo}>
                  Add
                </button>
              ) : (
                <button className="btn" onClick={this.updateList}>
                  Ok
                </button>
              )}
            </div>
            <ul className="lists">
              {todoList.map((item, index) => {
                return (
                  <li key={index} className="list-item">
                    <span className="number">{index + 1}.</span>
                    <span
                      className={
                        "todo-item " + (item.complated ? "t-undr" : "")
                      }
                    >
                      {item.list}
                    </span>
                    <div className="icon-wrapper">
                      <span onClick={() => this.success(item, index)}>
                        <i class="fa-solid fa-circle-check"></i>
                      </span>
                      <span onClick={() => this.edit(item, index)}>
                        <i class="fa-solid fa-pen-to-square"></i>
                      </span>
                      <span onClick={() => this.delete(index)}>
                        <i class="fa-solid fa-trash-can"></i>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
