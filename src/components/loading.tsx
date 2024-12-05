import React from 'react'
import Spinner from './spinner'

function Loading() {
    return (
        <div className="flex items-center justify-center h-screen text-secondary">
            <Spinner size={10} />
        </div>
    )
}

export default Loading