import React, { useState } from 'react'

export default function Message({children,type}) {
    // const[text,setText] = useState("");
    // const[type,setType] = useState("default");

    return (
        <div className={`message message-${type}`}>
            {children}
        </div>
    )

}

Message.defaultProps = {
    type: "default",
}



