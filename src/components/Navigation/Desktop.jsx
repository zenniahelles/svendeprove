import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss'
import BrandsList from './BrandsList.jsx';

class Desktop extends React.Component {

    state = { showing: false };

    render() {
        const { showGuitar } = this.state;
        const { showBrands } = this.state;
        const { showBass } = this.state;
        const { showOther } = this.state;
        const { showKeyboard } = this.state;

        return (
            <div className="SideMenu">
                <ul className="mainlink" onClick={() => this.setState({ showGuitar: !showGuitar })}>Guitarer</ul>
                <Link to="/"><li className="sublink" style={{ display: (showGuitar ? 'block' : 'none') }}>Elguitarer</li></Link>
                <Link to="/"><li className="sublink" style={{ display: (showGuitar ? 'block' : 'none') }}>Westernguitarer</li></Link>
                
                <ul className="mainlink" onClick={() => this.setState({ showBass: !showBass })}>Basser</ul>
                <Link to="/"><li className="sublink" style={{ display: (showBass ? 'block' : 'none') }}>Elbasser</li></Link>
                <Link to="/"><li className="sublink" style={{ display: (showBass ? 'block' : 'none') }}>Akustiske basser</li></Link>
                
                <ul className="mainlink" onClick={() => this.setState({ showOther: !showOther })}>Andre Strengeinstrumenter</ul>
                <Link to="/"><li className="sublink" style={{ display: (showOther ? 'block' : 'none') }}>Banjo</li></Link>
                <Link to="/"><li className="sublink" style={{ display: (showOther ? 'block' : 'none') }}>Mandolin</li></Link>
                <Link to="/"><li className="sublink" style={{ display: (showOther ? 'block' : 'none') }}>Ukulele</li></Link>
                
                <ul className="mainlink" onClick={() => this.setState({ showKeyboard: !showKeyboard })}>Keyboards</ul>
                <Link to="/"><li className="sublink" style={{ display: (showKeyboard ? 'block' : 'none') }}>Digitalklaverer</li></Link>
                <Link to="/"><li className="sublink" style={{ display: (showKeyboard ? 'block' : 'none') }}>USB & MIDI-keyboards</li></Link>
                <Link to="/"><li className="sublink" style={{ display: (showKeyboard ? 'block' : 'none') }}>Synthesizere</li></Link>
                <Link to="/"><li className="sublink" style={{ display: (showKeyboard ? 'block' : 'none') }}>Groovebokse og samplere</li></Link>

                <ul className="mainlink" onClick={() => this.setState({ showBrands: !showBrands })}>Brands</ul>
                <div className="sublink" style={{ display: (showBrands ? 'block' : 'none') }}><BrandsList setBrandID={this.props.setBrandID}/></div>
            </div>  
        )
    }
}


// function Desktop() {

// return(
//     <nav className="Navigation">
        
//         <ul>
//             <Link className="link" to="/">FORSIDE</Link>
//             <span>|</span>
//             <Link className="link" to="/multifetch">MULTIFETCH</Link>
//             <span>|</span>
//             <Link className="link" to="/fetch">FETCH</Link>
//             <span>|</span>
//             <Link className="link" to="/ratings">RATINGS</Link>
//             <span>|</span>
//             <Link className="link" to="/postform">POSTFORM</Link>
//             <span>|</span>
//             <Link className="link" to="/search">SEARCH</Link>
//             <span>|</span>
//             <Link className="link" to="/login">LOGIN</Link>
//         </ul>
//     </nav>
// )
// }

export default Desktop
