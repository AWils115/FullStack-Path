import React from "react";
import './Track.css';

export class Track extends React.Component {
    renderAction() {
        if(this.props.isRemoval){
            return <div className='Track-action'>-</div>
        } else {
            return <div className='Track-action'>+</div>
        }
    }
    render() {
        return (
            <div className="Track">
            <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
            </div>
                <button className="Track-action">{this.renderAction()}</button>
            </div>
        )
    }
}