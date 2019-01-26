import React from 'react';
import Modal from './Modal';
import '../css/edit.scss';

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            s_name: '',
            s_id: '',
            show: false
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.triggerMessage = this.triggerMessage.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    handleChangeName = (event) => {
        this.setState({ s_name: event.target.value });
    };

    handleChangeId = (event) => {
            const id = parseInt(event.target.value);
            this.setState({s_id: id});
    };

    triggerMessage = () => {
        this.setState({
            show: true
        })

        setTimeout(() => {
            this.setState({
                show: false
            })
        }, 2500)
    }


    render() {
        const postData = () => {
            if (this.state.s_name !== '' && this.state.s_id !== '') {
                fetch('http://127.0.0.1:5000/add_place', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({place: this.state.s_name, switch: this.state.s_id})
                }).then((res) => res.json())
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err));
// eslint-disable-next-line
                    {this.showModal()}
                    // eslint-disable-next-line
                    {this.triggerMessage()}
                } else {
                alert("Error");
            }

        };

        return (
            <React.Fragment>
                <h1 className="title-modal">Add new switch.</h1>
                <div className="inputs">
                    <Modal show={this.state.show} handleClose={this.hideModal} button={false}>
                        <h4 className="added-msg">Successful applied the new place.</h4>
                    </Modal>
                    <h3 className="title-input">Place Name</h3>
                    <input className="input add-input" type="text" name="name" value={null} onChange={this.handleChangeName} placeholder="Switch Name"/>
                    <h3 className="title-input">ID</h3>
                    <input className="input remove-input" type="number" name="id" value={null} onChange={this.handleChangeId} placeholder="Switch ID"/>
                </div>
                <button className="add-btn" onClick={postData}>Add</button>
            </React.Fragment>
    )
    }
}
export default Add;
