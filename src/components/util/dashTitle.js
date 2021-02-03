import React from 'react'

export default function DashTitle(props) {
    return (
        <div className="dash-title">
             <div>{props.title}</div>
        <div className="dash"></div>
        </div>
    )
}
