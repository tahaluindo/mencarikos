import React from 'react'
import { string } from 'prop-types'
import CampaignItemList from './CampaignItemList'
import { List, AutoSizer } from 'react-virtualized'
class ListComponent extends React.Component {
    render() {
        const { data } = this.props
        return (
            <div style={{ height: "100vh" }}>
                <AutoSizer>
                    {
                        ({ height, width }) =>
                            <List
                                width={width}
                                height={height}
                                rowCount={data.length}
                                rowHeight={112}
                                rowRenderer={({ key, index, style }) => <div key={key} style={style} className={`${data.length !== index + 1 && `border-b`}`}><CampaignItemList item={data[index]} /></div>}
                            />
                    }
                </AutoSizer>
            </div>
        )
    }
}
ListComponent.propTypes = { data: string }
ListComponent.defaultProps = { data: null }
export default ListComponent