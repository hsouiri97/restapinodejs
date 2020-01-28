import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddEditForm extends React.Component {
  state = {
    _id: null,
    title: "",
    author: "",
    publishingDate: new Date(),
    available: true,
    quantity: 0,
    price: 0
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormAdd = e => {
    e.preventDefault();
    fetch("http://localhost:1234/books", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        author: this.state.author,
        publishingDate: this.state.publishingDate,
        available: this.state.available,
        quantity: this.state.quantity,
        price: this.state.price
      })
    })
      .then(response => response.json())
      .then(item => {
        if (item) {
          this.props.addItemToState(item);
          this.props.toggle();
          console.log(item);
        } else {
          console.log("failure");
        }
      })
      .catch(err => console.log(err));
  };

  submitFormEdit = e => {
    e.preventDefault();
    fetch("http://localhost:1234/books/" + this.state._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        author: this.state.author,
        publishingDate: this.state.publishingDate,
        available: this.state.available,
        quantity: this.state.quantity,
        price: this.state.price
      })
    })
      .then(response => response.json())
      .then(item => {
        if (item) {
          this.props.updateState(item);
          this.props.toggle();
          //console.log(item);
        } else {
          console.log("failure");
        }
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const {
        _id,
        title,
        author,
        publishingDate,
        available,
        quantity,
        price
      } = this.props.item;
      this.setState({
        _id,
        title,
        author,
        publishingDate,
        available,
        quantity,
        price
      });
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            onChange={this.onChange}
            value={this.state.title === null ? "" : this.state.title}
          />
        </FormGroup>
        <FormGroup>
          <Label for="author">Author</Label>
          <Input
            type="text"
            name="author"
            id="author"
            onChange={this.onChange}
            value={this.state.author === null ? "" : this.state.author}
          />
        </FormGroup>
        <FormGroup>
          <Label for="publishingDate">Publishing Date</Label>
          <Input
            type="text"
            readOnly
            name="publishingDate"
            id="publishingDate"
            onChange={this.onChange}
            value={
              this.state.publishingDate === null
                ? ""
                : this.state.publishingDate
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="quantity">Quantity</Label>
          <Input
            type="number"
            name="quantity"
            id="quantity"
            onChange={this.onChange}
            value={this.state.quantity === null ? "" : this.state.quantity}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input
            type="number"
            name="price"
            id="price"
            onChange={this.onChange}
            value={this.state.price}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm;
