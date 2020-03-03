import React from 'react';

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="column column-1 text-center">
                        <span className="copyright">{new Date().getFullYear()}. Created With Love. Designed by <a href="https://nordicsoft.net/" target="_blank" rel="noopener noreferrer nofollow" title="NordicSoft">NordicSoft</a>.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

