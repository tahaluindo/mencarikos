import React from 'react'
import { arrayOf, shape } from 'prop-types'
import CampaignItem from './CampaignItem'
class FeedsGrid extends React.Component {
    render() {
        const { data } = this.props
        return (
            <div className="xs:divide-y-8 divide-gray-500">
                {
                    data.map((item, index) =>
                        <div key={index}>
                            <CampaignItem key={index} item={item} />
                        </div>
                    )
                }
            </div>
        )
    }
}
FeedsGrid.propTypes = {
    data: arrayOf(shape({})),
}
FeedsGrid.defaultProps = {
    data: null
}
export default FeedsGrid