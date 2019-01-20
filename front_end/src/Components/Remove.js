import React from 'react';

const API='http://127.0.0.1:5000/place';

class Remove extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
        places: []
    };
    this.removeItem = this.removeItem.bind(this);
    this.delete_data = this.delete_data.bind(this);
    this.onClicked = this.onClicked.bind(this);
}

    componentWillMount() {
        fetch(API)
        .then(response => response.json())
        .then(json => json.result.map(place => (
            {
                place: `${place.place}`,
                Switch:  `${place.switch}`
            }
        )))
        .then(places => this.setState({
            places
        }))
    }

    removeItem = (index) => {
        const items = this.state.places;
        console.log(items);
        this.setState({
            places: items.filter((place, i) => {
                return i !== index;
            })
        });
    };


    delete_data = (event) => {
        const sw = event.target.value;
        console.log(sw);
        fetch('http://127.0.0.1:5000/delete_place/'+sw, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({switch: this.state.s_id})
        }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err));
    };

    onClicked = (index, event) => {
        this.removeItem(index);
        this.delete_data(event);
    }

    render() {
        const {places} = this.state;
        const delete_switch = places.map((switch_name, index)  => {
            const {place, Switch} = switch_name;
            return (
                <React.Fragment>
                    <tr key={index}>
                        <td className="elements-table">{place}</td><td className="elements-table">{Switch}</td><td className="elements-table"><button className="delete-btn" type="button" value={Switch} onClick={(event) => {this.onClicked(index, event)}} >X</button></td>
                    </tr>
                </React.Fragment>
            )
        });

        return(
            <div>
                <h3 className="title-modal">Press X to delete any switch.</h3>
                <table className="table">
                    <tr>
                        <th className="title-table">Place</th>
                        <th className="title-table">Switch ID</th>
                        <th className="title-table">Remove</th>
                    </tr>
                    {delete_switch}
                </table>
                </div>
        )
    }
}
export default Remove;