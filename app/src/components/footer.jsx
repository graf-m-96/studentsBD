import React from 'react';

const footerStyle = {
    height: '60px',
    width: '100%',
    background: '#404040',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 15px',
    marginTop: '40px'
};

export default class extends React.Component {
    render() {
        return (
            <div style={footerStyle}>
                <div>© graf-m-96</div>
                <div>2018</div>
            </div>
        );
    }
}
