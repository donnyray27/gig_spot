import React from 'react'

const Audition = (props) => {
  return(
    <div>
      <video width="400" height="300" controls><source src={'https://addpipevideos.s3.amazonaws.com/34bed03404a85b8d3f54f52f089e963e/' + props.data[1] + '.mp4'} type="video/mp4"/>Your browser does not support the video tag.</video>
      <h5>Uploaded by: {props.data[2].first_name} {props.data[2].last_name}</h5>
      <h6>{props.data[2].email}</h6>
      <button className="clear-cancel" onClick={props.handleDelete}>Delete</button>
  </div>
  )
}

export default Audition
