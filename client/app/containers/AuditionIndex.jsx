import React from 'react'
import Audition from '../components/Audition'
const AuditionIndex = (props) => {



    let videos = props.auditions.map(audition => {
      return(
        <Audition title={audition}/>
      )
    })
    return(
      <div>
        {videos}
      </div>
    )

}

export default AuditionIndex
