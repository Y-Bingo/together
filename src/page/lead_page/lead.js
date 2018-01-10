import React, { Component } from 'react';
import {Carousel} from 'antd-mobile';

class Leading extends Component {
    state = {
        data: [
            '1', '2', '3'
        ],
        slideIndex: 0
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            // this.setState({
            //     data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI']
            // });
            // this.props.history.push('/login');
        }, 2000);
    }
    render() {
        return (
            <div id="leading-page">
                 <Carousel
                    // autoplay={false}
                    infinite
                    // vertical={"pagination"}
                    selectedIndex={1}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                >
                    {this.state.data.map(val => (
                        <a
                        key={val}
                        href="http://www.alipay.com"
                        style={{ display: 'inline-block', width: '100%' }}
                        >
                        <img
                            src={require(`./${val}.jpg`)}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            // fire window resize event to change height
                            // console.log(`./${val}.jpg`)
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                    </Carousel>
            </div>
        )
    }
}

export default Leading;