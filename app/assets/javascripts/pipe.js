


// function onRecorderInit(recorderId){
//   let args = Array.prototype.slice.call(arguments);
//   console.log("onRecorderInit("+args.join(', ')+")");
//   console.log(window.location.href);
//   function onVideoUploadSuccess(filename,filetype,videoId){
//   	var args = Array.prototype.slice.call(arguments);
//   	alert("onVideoUploadSuccess("+args.join(', ')+")");
//   }
//
// }
//
// let size = {width:400,height:330};
// let flashvars = {qualityurl: "avq/300p.xml",accountHash:"34bed03404a85b8d3f54f52f089e963e", eid:1, showMenu:"true", mrt:120,sis:0,asv:1,mv:0};
// (function() {var pipe = document.createElement('script'); pipe.type = 'text/javascript';
// pipe.async = true;
// pipe.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 's1.addpipe.com/1.3/pipe.js';
// let s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pipe, s);})();
//
//
//
// function onUploadDone(streamName, streamDuration, userId, recorderId, audioCodec, videoCodec, fileType){
//       let theUrl = window.location.href
//       let urlSplit = theUrl.split('/')
//       let idString = urlSplit.pop()
//       let id = parseInt(idString)
//       let streamName = arguments[0]
//       console.log(theUrl)
//       console.log(urlSplit);
//       console.log(idString);
//       console.log(id);
//       console.log(streamName);
//     //   let newAudtion = {
//     //     gig_request_id: id,
//     //     name: streamName
//     //   }
//     //   fetch(`/api/v1/gig_requests/${idString}/gig_request_auditions`, {
//     //   credentials: 'same-origin',
//     //   method: 'POST',
//     //   headers: { 'Content-Type': 'application/json' },
//     //   body: JSON.stringify(newAudtion)
//     // })
//     // .then(response => {
//     //   if (response.ok) {
//     //     return response;
//     //   } else {
//     //     let errorMessage = `${response.status} (${response.statusText})`,
//     //         error = new Error(errorMessage);
//     //     throw(error);
//     //   }
//     // })
// }
