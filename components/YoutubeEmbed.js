import React from "react"
import PropTypes from "prop-types"
const YoutubeEmbed = ({ title, embedId }) => (
    <div className="overflow-hiden relative" style={{ paddingBottom: '56.25%' }}>
        <iframe
            className="h-full w-full absolute"
            src={`https://www.youtube.com/embed/${embedId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
        />
    </div>
)
YoutubeEmbed.propTypes = {
    title: PropTypes.string.isRequired,
    embedId: PropTypes.string.isRequired
}
export default YoutubeEmbed