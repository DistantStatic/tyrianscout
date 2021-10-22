import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';
import ModularDaily from './containers/achievements/modular-daily/modular-daily';

import bg1 from './backgrounds/1.jpg';
import bg2 from './backgrounds/2.jpg';
import bg3 from './backgrounds/3.jpg';
import bg4 from './backgrounds/4.jpg';
import bg5 from './backgrounds/5.jpg';

const backarr = [bg1, bg2, bg3, bg4, bg5];
function App() {
    const [backgroundImg, setBackgroundImg] = useState(0);
    useEffect(() => {
        setBackgroundImg(backarr[Math.floor(Math.random() * 5)]);
    }, [])
    return (
        <div id="background" className={styles.background} style={{background: `url(${backgroundImg})`}} >
            <ModularDaily />
        </div>
    );
}

export default App;
