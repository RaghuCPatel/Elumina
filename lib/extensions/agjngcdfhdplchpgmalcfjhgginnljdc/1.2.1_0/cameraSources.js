(()=>{var e=null;chrome.runtime.onMessage.addListener((function(a,s,r){if(!chrome.runtime.lastError){if(a.access&&"CAMERA"==a.access){var i={...a};navigator.mediaDevices.getUserMedia({video:!0}).then((a=>{navigator.allMediastreams&&navigator.allMediastreams.push(a),e=a,i.permission="OK",r(i)})).catch((e=>{console.log(e),i.permission="DENIED",r(i)}))}else"STOP_MONITORING"==a.type&&(e&&e.getTracks().forEach((function(e){e.enabled=!1,e.stop()})),r(i));return!0}}))})();