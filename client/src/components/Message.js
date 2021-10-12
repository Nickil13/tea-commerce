import React, { useState } from 'react'

export default function Message({children,type}) {

    return (
        <div className={`message message-${type}`}>
            {children}
        </div>
    )

}

Message.defaultProps = {
    type: "default",
}



