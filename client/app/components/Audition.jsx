import React from 'react'

const Audition = (props) => {
  return(
    <div>
      <video width="400" height="300" controls><source src={'https://addpipevideos.s3.amazonaws.com/34bed03404a85b8d3f54f52f089e963e/' + props.data[1] + '.mp4'} type="video/mp4"/>Your browser does not support the video tag.</video>
      <button onClick={props.handleDelete}>Delete</button>
  </div>
  )
}

export default Audition
