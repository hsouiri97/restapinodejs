import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../modals/modal";

class DataTable extends Component {
  deleteItem = id => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      fetch("http://localhost:1234/books/" + id, {
        method: "delete",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(item => {
          this.props.deleteItemFromState(item._id);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const items = this.props.items.map(item => {
      return (
        <tr key={item._id}>
          <th scope="row">{item._id}</th>
          <td>{item.title}</td>
          <td>{item.author}</td>
          <td>{item.publishingDate}</td>
          <td>{item.quantity}</td>
          <td>{item.price}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm
                buttonLabel="Edit"
                item={item}
                updateState={this.props.updateState}
              />{" "}
              <Button color="danger" onClick={() => this.deleteItem(item._id)}>
                Del
              </Button>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publishing Date</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default DataTable;
