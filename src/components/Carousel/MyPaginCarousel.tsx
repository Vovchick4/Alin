import React, { Component } from 'react'
import { View, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { MySlide } from './MySlide';
import { myColors } from '../../constants/constantColor';

export default class MyPaginCarousel extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            entries: this.props.entries,
            activeSlide: this.props.activeSlide
        };
    }

    _renderItem({ item, index }: any) {
        return <MySlide data={item} />
    }

    get pagination() {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: myColors.gray }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                animatedDuration={10}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    render() {
        return (
            <View>
                {/* <StatusBar barStyle="dark-content" backgroundColor="#ffff" /> */}
                <Carousel
                    layout="default"
                    layoutCardOffset={50}
                    pagingEnabled={true}
                    activeAnimationType='timing'
                    // snapToAlignment='center'
                    // activeSlideAlignment="center"
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                />
                {this.pagination}
            </View>
        );
    }
}