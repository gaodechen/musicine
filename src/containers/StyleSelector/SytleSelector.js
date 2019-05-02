import React, { Component } from 'react'
import { Row, Col } from 'antd'

import { addr_config } from '../../config'
import StyleCard from './components'

const srcPrefix = addr_config.STATIC_HOST + '/styleThumbnail/';

const styles = [
    { description: '巴赫', title: 'Bach',  },
    { description: '贝多芬', title: 'Beethoven',  },
    { description: '德彪西', title: 'Debussy',  },
    { description: '久石让', title: 'Hisaishi',  },
    { description: '莫扎特', title: 'Mozart',  },
    { description: '钢琴男孩', title: 'Pianoboy',  },
    { description: '舒伯特', title: 'Schubert',  },
    { description: 'V.K', title: 'V.K',  },
]

/**
 * @title guide users to upload or record audio files
 * @class FileSelector
 * @extends {Component}
 */
class StyleSelector extends Component {
    /**
     * @params sliceSize: number of styles in a single slice
     * @return sliced array
     */
    getSlices = (sliceSize) => {
        // number of all styles
        let stylesNumber = styles.length;
        // sliced array
        let slices = [];
        // number of styles has been added to a slice
        let styleNumberCnt = 0;
        // number of parts has been sliced
        let sliceCnt = 0;

        while (styleNumberCnt < stylesNumber) {
            let lower = sliceCnt * sliceSize;
            let upperTmp = (sliceCnt + 1) * sliceSize;
            let upper = stylesNumber > upperTmp ? upperTmp : stylesNumber;
            slices.push(styles.slice(lower, upper))
            styleNumberCnt += 4;
            sliceCnt += 1;
        }
        return slices;
    }

    render() {
        console.log(srcPrefix)
        let slices = this.getSlices(4)
        return (
            <div style={{ background: '#ECECEC', padding: '24px' }}>
                {slices.map((item) => {
                    return (
                        <Row gutter={16}>
                            {
                                item.map((col) => {
                                    let src = srcPrefix + col.title + '.png';
                                    return (
                                        <Col span={6}>
                                            <StyleCard description={col.description} title={col.title} src={src} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    )
                })}
            </div>
        )
    }
}

export default StyleSelector