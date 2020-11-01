import React, { Component } from 'react';

export default class HomePage extends Component {
    render() {
        return (
            <div className="text-center pt-50" style={{ height: 'calc(100vh - 180px)'}}>
                <div className="center-hor-ver h-50 row">
                    <div className="px-4">
                        <h2 className="font-3x mb-3">
                            Bienvenue sur microcap
                        </h2>
                    </div>
                </div>
            </div>
        )
    }
}
