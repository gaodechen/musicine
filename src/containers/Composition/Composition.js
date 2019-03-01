import React, { Component } from 'react'
import { Row } from 'antd'

import Recorder from '../Recorder'

class Composition extends Component {
    render() {
        return (
            <Row className="flex-row">
                <Recorder />
            </Row>
        )
    }
}

export default Composition;