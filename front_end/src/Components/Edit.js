import React from 'react';
import Remove from './Remove';
import Add from './Add';
import '../css/edit.scss';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addRemoveComp: true
        };
        this.addRemoveComp = this.addRemoveComp.bind(this);
    }

    addRemoveComp = (event) => {
        this.setState({addRemoveComp: !this.state.addRemoveComp});
    };

    render() {
        const Display = () => {
            const addRemoveComp = this.state.addRemoveComp;
            if (addRemoveComp) {
                return <Add />
            }
            return <Remove />
        };

        return (
            <React.Fragment>
                <div className="add-remove_btn">
                    <button className='add-switch' onClick={this.addRemoveComp}>+</button>
                    <button className="remove-switch" onClick={this.addRemoveComp}>-</button>
                </div>
                <Display/>
            </React.Fragment>
        )
    };
}

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            s_name: '',
            s_id: ''

        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
    }

    handleChangeName = (event) => {
        this.setState({ s_name: event.target.value });
    };

    handleChangeId = (event) => {
        const id = parseInt(event.target.value)
        this.setState({ s_id: id });
    };



    render() {

    return(

        <div>
            <div>
                <Menu />
            </div>
        </div>
    )
}
}
export default Edit;