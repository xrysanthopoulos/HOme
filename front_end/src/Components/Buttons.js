import React, {Component} from 'react';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isChecked: [],
      status: null,
      switch_id: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

    getData(){
      const status = this.props.isChecked;
      const switch_id = this.props.value;
      this.setState({
          status: status,
          switch_id: switch_id
      });
    }

    componentDidMount(){
        this.getData();
    }

    handleChange() {
        this.setState({status: !this.state.status});
        fetch('http://127.0.0.1:5000/open_switch/switch='+this.state.switch_id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        }).then((response) => response.json())
            // .then((data) => console.log(data))
            .catch((err) => console.log(err));

    }
  render() {
    return(
      <label className="switch">
          <input
              type="checkbox"
              onChange={this.handleChange}
          />
          <div style={this.state.status ? {backgroundColor: 'green'}: {backgroundColor: 'red'}}
          className="slider">
          <div style={this.state.status ? {transform: 'translateX(26px)'}: {transform: 'translateX(0px)'}}
          className="round"/>
          </div>
        </label>
    );
  }
}


export default Buttons;