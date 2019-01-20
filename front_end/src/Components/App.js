import React from 'react';
import Buttons from './Buttons';
import Edit from './Edit';
import Modal from './Modal';
import '../css/App.scss';
import '../css/switch.css';
import '../css/buttons.scss';

const API = 'http://127.0.0.1:5000/place';

class App extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            places: [],
            show: false
        };
        this.onClicked = this.onClicked.bind(this);
    };

  showModal = () => {
    this.setState({ show: true });
  };
  
  hideModal = () => {
    this.setState({ show: false });
  };

  componentWillMount() {
        fetch(API)
          .then(response => response.json())
          .then(text => text.result.map(place => (
              {
                  place: `${place.place}`,
                  switch_id:  `${place.switch}`,
                  status: `${place.status}`
              }
          )))
        .then(places => this.setState({places: places
      }));
  }

    onClicked = () => {
        this.hideModal();
        this.componentWillMount();
    }

    render() {
        const places=this.state.places;
        const switches= places.map(place1 => {
            const {place, switch_id, status}=place1;
            const Switch = parseInt(switch_id);
            const Status = JSON.parse(status);
                return(
                    <React.Fragment>
                            <div className="switch-bean">
                                <h3 className="switch-title">{place}</h3>
                                <Buttons isChecked={Status} value={Switch}/>
                            </div>
                    </React.Fragment>
                )
                });

        return(
            <div>
                <h1 className="title">HΟm<span>e</span></h1>
                <div className="switch-panel">
                    {switches}
                </div>
                <Modal show={this.state.show} handleClose={() => {this.onClicked()}} button={true}>
                    <Edit/>
                </Modal>
                <button className="modal-btn" type='button' onClick={this.showModal}>Add/Remove</button>
            </div>
        
        )
    } 
}

export default App;