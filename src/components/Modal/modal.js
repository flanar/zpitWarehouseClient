import React from 'react'

import BootstrapModal from 'react-bootstrap/Modal'

const modal = (props) => {

    return (
        <BootstrapModal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title id="contained-modal-title-vcenter">
                    { props.modaltitle }
                </BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                { props.children }
            </BootstrapModal.Body>
        </BootstrapModal>
    )
}

export default modal