import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import {
    oneOfType, object, array, string
} from 'prop-types';

class DragScroll extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isScrolling: false,
            startX: 0,
            scrollLeft: 0
        };

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.attachScroller = this.attachScroller.bind(this);
        this.longPressed = this.longPressed.bind(this);
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseleave', this.onMouseLeave);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseleave', this.onMouseLeave);
        window.removeEventListener('mouseup', this.onMouseUp);
    }

    onMouseMove(e) {
        const { isScrolling, startX, scrollLeft } = this.state;
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - this.scroller.offsetLeft;
        const walk = (x - startX) * 3;
        this.scroller.scrollLeft = scrollLeft - walk;
    }

    onMouseUp() {
        clearTimeout(this.clickTimer);
        this.setState({
            isScrolling: false
        });
    }

    onMouseDown(e) {
        this.clickTimer = setTimeout(this.longPressed, 300);
        this.setState({
            isScrolling: true,
            startX: e.pageX - this.scroller.offsetLeft,
            scrollLeft: this.scroller.scrollLeft
        });
    }

    onMouseLeave() {
        this.setState({
            isScrolling: false
        });
    }

    onTouchStart() {
        this.touchTimer = setTimeout(this.longPressed, 300);
    }

    onTouchEnd() {
        clearTimeout(this.touchTimer);
    }

    longPressed() {
        return null;
    }

    attachScroller(scroller) {
        // eslint-disable-next-line react/no-find-dom-node
        this.scroller = findDOMNode(scroller);
    }

    render() {
        const { children, className } = this.props;
        return (
            <div
                className={`flex-container ${className}`}
                ref={this.attachScroller}
                onMouseDown={this.onMouseDown}
                onMouseLeave={this.onMouseLeave}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
            >
                {children}
            </div>
        );
    }
}

DragScroll.propTypes = {
    children: oneOfType([object, array]).isRequired,
    className: string
};

DragScroll.defaultProps = {
    className: ''
}

export default DragScroll;
